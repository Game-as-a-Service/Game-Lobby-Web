import { IRequestWrapper, requestWrapper } from "../request";

export type UserInfo = {
  id: string;
  nickname: string;
  email: string;
  avatar?: string;
};

export const putNicknameEndpoint = (
  data: UserInfo
): IRequestWrapper<UserInfo> => {
  return requestWrapper({
    url: "/api/internal/users/me",
    method: "PUT",
    data,
  });
};

export const createNicknameEndpoint = (
  data: UserInfo
): IRequestWrapper<UserInfo> => {
  return requestWrapper({
    url: "/api/internal/users/me",
    method: "POST",
    data,
  });
};
