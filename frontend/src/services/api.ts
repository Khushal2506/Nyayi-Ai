export interface HealthStatus {
  status: string;
  app_name: string;
  version: string;
  environment: string;
  timestamp: string;
  details?: {
    llm_provider?: string;
    embedding_provider?: string;
    debug?: boolean;
  };
}

export interface IntakeRequest {
  complaint: string;
}

export interface IntakeResponse {
  complaint_type: string;
  product_or_service: string | null;
  seller_or_platform: string | null;
  order_date: string | null;
  delivery_date: string | null;
  issue_date: string | null;
  amount_paid: string | null;
  payment_method: string | null;
  resolution_requested: string | null;
  facts: string[];
  missing_information: string[];
  summary: string;
  processing_mode: string;
  disclaimer: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function fetchHealthStatus(): Promise<HealthStatus> {
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Health check failed with status code ${response.status}`);
  }

  return response.json();
}

export async function extractComplaint(
  complaint: string
): Promise<IntakeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/intake/extract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ complaint }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.detail || `Complaint extraction failed (${response.status})`
    );
  }

  return response.json();
}