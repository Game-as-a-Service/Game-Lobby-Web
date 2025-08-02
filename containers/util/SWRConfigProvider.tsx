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
        switch (error.status) {
          case 401:
            logout();
            break;
        }
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
