import cookie from "js-cookie";

/**
 * Orval 專用的簡化 fetcher
 * 自動處理 JWT 認證和基本錯誤處理
 */

// API 基礎配置
const API_BASE_URL = "/api/internal";

// API 錯誤回應格式接口
export interface ApiErrorResponse {
  timestamp: string;
  errorCode: string;
  message: string;
}

// 自定義錯誤類
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errorCode?: string,
    public timestamp?: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  // 靜態方法：從 API 錯誤回應創建 ApiError 實例
  static fromApiResponse(
    response: ApiErrorResponse,
    status?: number
  ): ApiError {
    return new ApiError(
      response.message,
      status,
      response.errorCode,
      response.timestamp,
      response
    );
  }
}

// 從認證 context 或 storage 獲取 JWT token
const getJwtToken = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(cookie.get("_token") || "{}") as string;
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Orval 請求配置接口
interface OrvalRequestConfig {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

// Orval 自定義 fetcher 函數
export const orvalFetcher = async <T>(
  config: OrvalRequestConfig,
  options?: RequestInit
): Promise<T> => {
  // 構建完整 URL
  let fullUrl = config.url.startsWith("http")
    ? config.url
    : `${API_BASE_URL}${config.url}`;

  // 處理查詢參數
  if (config.params) {
    const searchParams = new URLSearchParams();
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    if (searchParams.toString()) {
      fullUrl += `?${searchParams.toString()}`;
    }
  }

  // 獲取 JWT token
  const token = getJwtToken();

  // 設置請求頭
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...config.headers,
    ...(options?.headers as Record<string, string>),
  };

  // 如果有 token，添加 Authorization header
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 發送請求
  try {
    const response = await fetch(fullUrl, {
      method: config.method || "GET",
      headers,
      body: config.data ? JSON.stringify(config.data) : undefined,
      ...options,
    });

    // 處理非 2xx 狀態碼
    if (!response.ok) {
      let errorData: any = {};

      // 嘗試解析錯誤響應
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}` };
      }

      // 檢查是否為標準 API 錯誤格式
      if (
        errorData &&
        typeof errorData.timestamp === "string" &&
        typeof errorData.errorCode === "string" &&
        typeof errorData.message === "string"
      ) {
        // 使用標準 API 錯誤格式創建 ApiError
        throw ApiError.fromApiResponse(errorData, response.status);
      }

      // 處理非標準錯誤格式
      throw new ApiError(
        errorData?.message || `Request failed with status ${response.status}`,
        response.status,
        undefined,
        undefined,
        errorData
      );
    }

    // 處理無內容響應（如 204 No Content）
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    // 重新拋出 ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // 處理網絡錯誤
    throw new ApiError(
      error instanceof Error ? error.message : "Network error occurred",
      undefined,
      undefined,
      undefined,
      error
    );
  }
};

export default orvalFetcher;
