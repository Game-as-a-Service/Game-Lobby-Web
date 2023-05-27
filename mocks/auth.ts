import { User } from "@/requests/auth/user";

export const mock_loginEndpoint = "/auth/login";

export const mock_loginToken = "login-token";

export const mock_refreshToken = () =>
  `refresh-token-${Math.floor(Math.random() * (100 - 1) + 1)}`;

export const mock_user: User = {
  uid: "mock_uid",
  name: "mock user",
  email: "mock@google.com",
};
