import { right, left, Either } from "fp-ts/lib/Either";

export type EnvError = {
  type: string;
  key: string;
};

type Env = (key: string) => Either<EnvError, string>;

export const env: Env = (key) => {
  const val = process.env[key];

  return val ? right(val) : left({ type: "env:failed", key });
};
