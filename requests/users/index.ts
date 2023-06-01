import { IRequestWrapper, requestWrapper } from "../request";

export type UserInfo = {
  id: string;
  nickname: string;
  email: string;
  avatar?: string;
};

const currentUserEndpoint = `/api/internal/users/me`;

export const getCurrentUser = (): IRequestWrapper<UserInfo> => {
  return requestWrapper({
    url: currentUserEndpoint,
    method: "GET",
  });
};

export const putUserinfoEndpoint = (
  data: UserInfo
): IRequestWrapper<UserInfo> => {
  return requestWrapper({
    url: currentUserEndpoint,
    method: "PUT",
    data,
  });
};

export const createNicknameEndpoint = (
  data: UserInfo
): IRequestWrapper<UserInfo> => {
  return requestWrapper({
    url: currentUserEndpoint,
    method: "POST",
    data,
  });
};
