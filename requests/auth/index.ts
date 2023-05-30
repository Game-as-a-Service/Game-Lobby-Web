import { IRequestWrapper, requestWrapper } from "@/requests/request";

export enum LoginType {
  GOOGLE = "google-oauth2",
  GITHUB = "github",
  LINKEDIN = "linkedin",
  DISCORD = "discord",
}

export const getLoginEndpoint = (
  type: LoginType
): IRequestWrapper<{ url: string }> => {
  return requestWrapper(
    {
      url: "/api/internal/login",
      method: "GET",
      params: { type },
    },
    {
      isPublic: true,
    }
  );
};

export const getMockToken = (): IRequestWrapper<{ token: string }> => {
  return requestWrapper(
    {
      url: `/api/internal/token`,
      method: "POST",
    },
    {
      isPublic: true,
    }
  );
};

export const authentication = (
  token: string
): IRequestWrapper<{ token: string }> => {
  return requestWrapper({
    url: `/api/internal/authenticate`,
    method: "POST",
    data: { token },
  });
};
