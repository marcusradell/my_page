import { Result } from "frea-core";

export type LoginErr = {
  reason: "invalid_request";
  validations: {
    nickname: "required";
    password: "required";
  };
};

export type LoginOk = {
  token: string;
};

export type Login = (args: {
  email: string;
  password: string;
}) => Result<LoginOk, LoginErr>;

export type VerifyOk = null;

export type VerifyErr = {
  reason: "unknown";
};

export type Verify = (args: { token: string }) => Result<VerifyOk, VerifyErr>;

export type IdentityApi = {
  login: Login;
  verify: Verify;
};
