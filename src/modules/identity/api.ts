import jwt from "jsonwebtoken";
import { IdentityApi, Login, Verify } from "./types";

type Create = (args: { jwtSecret: string }) => IdentityApi;

export const create: Create = ({ jwtSecret }) => {
  const login: Login = async ({ email, password }) => {
    const token = jwt.sign({ email }, jwtSecret);

    return {
      status: "succeeded",
      data: {
        token,
      },
    };
  };

  const verify: Verify = async ({ token }) => {
    if (token !== "##token##") {
      return {
        status: "failed",
        error: {
          reason: "invalid_token",
        },
      };
    }

    return { status: "succeeded" };
  };

  return {
    login,
    verify,
  };
};
