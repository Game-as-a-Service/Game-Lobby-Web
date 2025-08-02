import { FC, ReactNode, useMemo } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

import swrConfig from "@/services/api/swrConfig";
import useAuthActions from "@/hooks/useAuthActions";
import { ApiError } from "@/services/api/fetcher";

type Props = {
  children: ReactNode;
};

const SWRConfigProvider: FC<Props> = ({ children }) => {
  const { logout } = useAuthActions();

  const customSwrConfig: SWRConfiguration = useMemo(() => {
    const handleGlobalError = (error: Error) => {
      if (error instanceof ApiError) {
        // 處理 API 錯誤
        console.error("API Error:", {
          message: error.message,
          status: error.status,
          data: error.data,
        });

        // 根據狀態碼處理不同情況
        switch (error.status) {
          case 401:
            // 未授權 - 清除認證資料並轉導到登入頁
            console.warn(
              "User unauthorized, logging out and redirecting to login"
            );
            logout();
            break;
          case 403:
            // 禁止訪問
            console.warn("Access forbidden");
            break;
          case 404:
            // 資源不存在
            console.warn("Resource not found");
            break;
          case 500:
            // 服務器錯誤
            console.error("Server error occurred");
            break;
          default:
            console.error("Unknown API error");
        }
      } else {
        // 處理網絡錯誤或其他錯誤
        console.error("Network or unknown error:", error);
      }
    };

    return {
      ...swrConfig,
      onError: handleGlobalError,
    };
  }, [logout]);

  return <SWRConfig value={customSwrConfig}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
