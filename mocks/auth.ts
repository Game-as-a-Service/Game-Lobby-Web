import { UserInfo } from "@/requests/users";

export const mock_loginEndpoint = "/auth/login";

export const mock_loginToken = "login-token";

export const mock_refreshToken = () =>
  `refresh-token-${Math.floor(Math.random() * (100 - 1) + 1)}`;

export const mock_currentUser: UserInfo = {
  id: "mock-currentUser-uid",
  nickname: "mock currentUser",
  email: "mock@google.com",
};
