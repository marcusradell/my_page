import { Result } from "frea-core";

type LoginErr = {
  reason: "invalid_request";
  validations: {
    username: "required";
    password: "required";
  };
};

type LoginOk = unknown;

type Login = (args: {
  nickname: string;
  password: string;
}) => Result<LoginOk, LoginErr>;

const login: Login = async ({ nickname, password }) => ({
  status: "failed",
  error: {
    reason: "invalid_request",
    validations: { password: "required", username: "required" },
  },
});

test.skip("Empty nickname and password", async () => {
  const result = await login({ nickname: "", password: "" });

  expect(result).toEqual({
    status: "failed",
    error: {
      reason: "invalid_request",
      validations: { username: "required", password: "required" },
    },
  });
});
