import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parents[1] / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.api.routes.intake import local_extract


SAMSUNG_COMPLAINT = (
    "I purchased Samsung wireless headphones from Amazon on 20 October 2026 "
    "for ₹2,499. They were delivered on 23 October 2026, but one side was "
    "not working. I requested a full refund on 24 October 2026, but I have "
    "not received it. I paid through UPI and have the invoice, payment "
    "screenshot and order details. I want a full refund of ₹2,499."
)


def test_local_fallback_extracts_samsung_complaint_without_cross_sentence_date_leakage():
    result = local_extract(SAMSUNG_COMPLAINT)

    assert result.product_or_service == "Samsung wireless headphones"
    assert result.seller_or_platform == "Amazon"
    assert result.amount_paid == "₹2,499"
    assert result.order_date == "20 October 2026"
    assert result.delivery_date == "23 October 2026"
    assert result.issue_date == "24 October 2026"
    assert result.payment_method == "UPI"
    assert result.resolution_requested == "Full refund"
    assert result.missing_information == []
    assert result.processing_mode == "local_fallback"


def test_local_fallback_flags_only_missing_information():
    result = local_extract(
        "I bought a defective phone from a local store for ₹500. "
        "It does not turn on and I want a refund."
    )

    assert result.product_or_service == "a defective phone"
    assert result.amount_paid == "₹500"
    assert "Seller or platform name" in result.missing_information
    assert "Order date" in result.missing_information
    assert "Delivery date" in result.missing_information
    assert "Payment method" in result.missing_information
