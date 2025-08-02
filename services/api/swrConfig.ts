import { SWRConfiguration } from "swr";
import { ApiError } from "./fetcher";

// SWR 基礎配置（不包含錯誤處理，錯誤處理在 _app.tsx 中統一處理）
export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: false,
  errorRetryCount: 0,
  errorRetryInterval: 0,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  ...(process.env.NODE_ENV === "development" && {
    refreshInterval: 0,
    revalidateIfStale: true,
  }),
  ...(process.env.NODE_ENV === "production" && {
    refreshInterval: 300000,
    revalidateIfStale: false,
  }),
};

export const swrConfigs = {
  static: {
    ...swrConfig,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
  } as SWRConfiguration,

  // 一次性數據（如表單提交後的結果）
  once: {
    ...swrConfig,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
  } as SWRConfiguration,

  // 緩存優先（離線友好）
  cacheFirst: {
    ...swrConfig,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  } as SWRConfiguration,
};

/**
 * SWR 錯誤類型檢查
 */
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

/**
 * 獲取錯誤訊息
 */
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "未知錯誤";
};

// 導出默認配置
export default swrConfig;
