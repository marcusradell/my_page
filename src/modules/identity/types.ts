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

export type VerifyOk = void;

export type VerifyErr = {
  reason: "invalid_token";
};

export type Verify = (args: { token: string }) => Result<VerifyOk, VerifyErr>;

export type IdentityApi = {
  login: Login;
  verify: Verify;
};
