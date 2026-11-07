from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Schema for health check responses."""
    status: str = Field(default="healthy", description="Current service health status")
    app_name: str = Field(description="Name of the service")
    version: str = Field(description="Service release version")
    environment: str = Field(description="Current running environment")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="UTC timestamp of the health check"
    )
    details: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Detailed diagnostic metrics"
    )


class IntakeRequest(BaseModel):
    complaint: str = Field(min_length=20, max_length=5000)


class IntakeResponse(BaseModel):
    complaint_type: str
    product_or_service: Optional[str] = None
    seller_or_platform: Optional[str] = None
    order_date: Optional[str] = None
    delivery_date: Optional[str] = None
    issue_date: Optional[str] = None
    amount_paid: Optional[str] = None
    payment_method: Optional[str] = None
    resolution_requested: Optional[str] = None
    facts: list[str] = Field(default_factory=list)
    missing_information: list[str] = Field(default_factory=list)
    summary: str
    processing_mode: str = "gemini"
    disclaimer: str = "This is an AI-generated summary, not legal advice."