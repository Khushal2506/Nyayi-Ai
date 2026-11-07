from fastapi import APIRouter, Depends
from app.core.config import Settings, get_settings
from app.models.schemas import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse, summary="Service Health Check")
async def health_check(settings: Settings = Depends(get_settings)) -> HealthResponse:
    """
    Returns current health status, version, and operational environment.
    Used by uptime checkers, load balancers, and frontend health monitors.
    """
    return HealthResponse(
        status="healthy",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
        details={
            "llm_provider": settings.LLM_PROVIDER,
            "embedding_provider": settings.EMBEDDING_PROVIDER,
            "debug": settings.DEBUG,
        }
    )
