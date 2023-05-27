import { IRequestWrapper, requestWrapper } from "../request";

export interface User {
  uid: string;
  name: string;
  email: string;
}

export const getCurrentUser = (): IRequestWrapper<User> => {
  return requestWrapper({
    url: `/api/internal/user/me`,
    method: "GET",
  });
};
