import { Result, Err } from "frea-core";

type LoginErr = {
  reason: "invalid_request";
  validations: {
    nickname: "required";
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
    validations: { password: "required", nickname: "required" },
  },
});

test("Empty nickname and password", async () => {
  const result = await login({ nickname: "", password: "" });

  const expectation: Err<LoginErr> = {
    status: "failed",
    error: {
      reason: "invalid_request",
      validations: { nickname: "required", password: "required" },
    },
  };

  expect(result).toEqual(expectation);
});
