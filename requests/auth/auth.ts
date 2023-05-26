import { IRequestWrapper, requestWrapper } from "@/requests/request";

export enum LoginType {
  GOOGLE = "google-oauth2",
  GITHUB = "github",
  LINKEDIN = "linkedin",
  DISCORD = "discord",
}

export const getLoginEndpoint = (
  data: LoginType
): IRequestWrapper<{ url: string }> => {
  return requestWrapper({
    url: `/api/internal/auth/login?type=${data}`,
    method: "GET",
  });
};

export const getMockToken = (): IRequestWrapper<{ token: string }> => {
  return requestWrapper({
    url: `/api/internal/auth/token`,
    method: "POST",
  });
};

export const authentication = (): IRequestWrapper<{ token: string }> => {
  return requestWrapper({
    url: `/api/internal/auth/authentication`,
    method: "POST",
  });
};
