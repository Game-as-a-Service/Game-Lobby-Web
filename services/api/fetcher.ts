/**
 * Unified API Fetcher utility
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/internal";
const DEFAULT_TIMEOUT = 10000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
  timestamp?: string;
  errorCode?: string;
}

export interface PaginatedResponse<T = any> {
  data?: T[];
  total?: number;
  page?: number;
  perPage?: number;
  rooms?: T[]; // Pagination structure in Swagger
}

interface FetcherOptions extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

export const fetcher = async <T = any>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  const {
    timeout = DEFAULT_TIMEOUT,
    baseURL = BASE_URL,
    ...fetchOptions
  } = options;

  // Create timeout control
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    const response = await fetch(fullUrl, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({
        message: "Request failed",
      }))) as any;

      throw new ApiError(
        errorData?.message || `HTTP ${response.status}`,
        response.status,
        errorData?.code,
        errorData
      );
    }

    // Check if there's content
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return null as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "TIMEOUT");
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Request failed"
    );
  }
};

export const createAuthenticatedFetcher = (token?: string | null) => {
  return <T = any>(url: string, options: FetcherOptions = {}): Promise<T> => {
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetcher<T>(url, {
      ...options,
      headers,
    });
  };
};

export const isAuthError = (error: any): boolean => {
  return error instanceof ApiError && error.status === 401;
};

export const isNetworkError = (error: any): boolean => {
  return error instanceof ApiError && !error.status;
};

export const formatQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

/**
 * Legacy alias for createAuthenticatedFetcher for backward compatibility
 */
export const createApiFetcher = createAuthenticatedFetcher;
