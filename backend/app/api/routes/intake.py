import json
import re

from fastapi import APIRouter, HTTPException
from pydantic import ValidationError

from app.ai.llm.base import LLMProviderError
from app.ai.llm.factory import get_llm_provider
from app.core.config import get_settings
from app.models.schemas import IntakeRequest, IntakeResponse

router = APIRouter(prefix="/intake", tags=["Intake"])

SYSTEM_PROMPT = """
You are Nyaya AI, an Indian consumer-dispute intake assistant.
Extract only facts explicitly stated by the user.
Never invent dates, amounts, laws, legal sections or case outcomes.
Use null for unknown fields and empty arrays when appropriate.
Return valid JSON only.
"""


def local_extract(complaint: str) -> IntakeResponse:
    """Rule-based fallback when the AI provider is unavailable."""

    text = complaint.strip()
    lower = text.lower()

    # Identify seller/platform (not the product brand).
    platforms = [
        "Amazon", "Flipkart", "Myntra", "Meesho",
        "Ajio", "Snapdeal", "Snapdeal"
    ]

    seller = next(
        (name for name in platforms if name.lower() in lower),
        None
    )

    # Extract product/service.
    product = None
    product_match = re.search(
        r"(?:purchased|bought|ordered)\s+(.+?)\s+"
        r"(?:from|on)\b",
        text,
        re.IGNORECASE
    )
    if product_match:
        product = product_match.group(1).strip(" ,.")

    # Extract amount, including ₹, Rs, INR or a bare amount
    # when accompanied by a currency marker.
    amount_match = re.search(
        r"(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d{1,2})?)"
        r"|([\d,]+(?:\.\d{1,2})?)\s*(?:rupees|rs\.?|inr)",
        text,
        re.IGNORECASE
    )
    amount = None
    if amount_match:
        amount = "₹" + (amount_match.group(1) or amount_match.group(2))

    # Extract dates and classify them using nearby wording.
    date_pattern = (
        r"\b\d{1,2}\s+"
        r"(?:January|February|March|April|May|June|July|August|"
        r"September|October|November|December)"
        r"\s+\d{4}\b"
    )

    order_date = None
    delivery_date = None
    issue_date = None

    for match in re.finditer(date_pattern, text, re.IGNORECASE):
        date = match.group(0)
        context = text[max(0, match.start() - 65):match.start()].lower()

        if any(word in context for word in ["arrived", "delivered", "received"]):
            delivery_date = delivery_date or date
        elif any(word in context for word in [
            "refund", "complaint", "reported", "requested", "issue"
        ]):
            issue_date = issue_date or date
        elif any(word in context for word in [
            "purchased", "bought", "ordered", "order"
        ]):
            order_date = order_date or date

    payment = next(
        (
            method for method in [
                "UPI", "credit card", "debit card",
                "net banking", "cash"
            ]
            if method.lower() in lower
        ),
        None
    )

    if any(word in lower for word in [
        "damaged", "broken", "not working", "defective"
    ]):
        complaint_type = "Defective or damaged product"
    elif "refund" in lower:
        complaint_type = "Refund dispute"
    elif "cancelled" in lower or "canceled" in lower:
        complaint_type = "Cancelled order dispute"
    else:
        complaint_type = "Consumer dispute"

    resolution = (
        "Full refund"
        if "full refund" in lower
        else "Refund" if "refund" in lower
        else "Replacement" if "replacement" in lower
        else None
    )

    facts = [
        sentence.strip()
        for sentence in re.split(r"(?<=[.!?])\s+", text)
        if sentence.strip()
    ]

    missing = []
    if not seller:
        missing.append("Seller or platform name")
    if not product:
        missing.append("Product or service name")
    if not amount:
        missing.append("Amount paid")
    if not order_date:
        missing.append("Order date")
    if not delivery_date:
        missing.append("Delivery date")
    if not payment:
        missing.append("Payment method")
    if not any(word in lower for word in [
        "invoice", "receipt", "screenshot"
    ]):
        missing.append("Proof of purchase or payment")

    return IntakeResponse(
        complaint_type=complaint_type,
        product_or_service=product,
        seller_or_platform=seller,
        order_date=order_date,
        delivery_date=delivery_date,
        issue_date=issue_date,
        amount_paid=amount,
        payment_method=payment,
        resolution_requested=resolution,
        facts=facts,
        missing_information=missing,
        summary=text[:1000],
        processing_mode="local_fallback",
        disclaimer=(
            "Extracted using local rule-based processing because the AI "
            "provider was unavailable. This is not legal advice."
        ),
    )


@router.post("/extract", response_model=IntakeResponse)
async def extract_complaint(request: IntakeRequest):
    complaint = request.complaint.strip()

    if len(complaint) < 20:
        raise HTTPException(
            status_code=422,
            detail="Please describe your complaint in more detail."
        )

    prompt = f"""
Extract this complaint into JSON with these fields:
complaint_type, product_or_service, seller_or_platform,
order_date, delivery_date, issue_date, amount_paid,
payment_method, resolution_requested, facts,
missing_information, summary.

Use null for unknown scalar values and [] for unknown lists.

Complaint:
{complaint}
"""

    try:
        provider = get_llm_provider(get_settings())
        raw = await provider.generate(
            prompt=prompt,
            system_prompt=SYSTEM_PROMPT,
            temperature=0.1,
            max_tokens=1500,
            json_mode=True,
        )

        data = json.loads(raw)
        data["processing_mode"] = "gemini"
        return IntakeResponse(**data)

    except (
        LLMProviderError,
        json.JSONDecodeError,
        ValidationError,
        ValueError,
        TypeError,
    ):
        return local_extract(complaint)