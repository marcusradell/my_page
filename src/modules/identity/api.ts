import { IdentityApi, Login, Verify } from "./types";

type Create = () => IdentityApi;

export const create: Create = () => {
  const login: Login = async ({ email, password }) => ({
    status: "failed",
    error: {
      reason: "invalid_request",
      validations: { password: "required", nickname: "required" },
    },
  });

  const verify: Verify = async () => ({ status: "succeeded", data: null });

  return {
    login,
    verify,
  };
};
