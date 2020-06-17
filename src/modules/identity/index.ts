import { env } from "../../env";
import { Express } from "express";
import jwt from "jsonwebtoken";
import { pipe } from "fp-ts/lib/pipeable";
import { chain } from "fp-ts/lib/Either";

export const create = (app: Express) => {
  const jwtSecret = env("JWT_SECRET");
  const password = env("PASSWORD");

  app.post("/api/identity", (req, res) => {
    if (req.body.password !== password) {
      return res.json({
        type: "identity.login:failed",
      });
    }

    const token = jwt.sign({}, jwtSecret);

    res.json({ type: "identity.login:succeeded", token });
  });

  return pipe(
    env("JWT_SECRET"),
    chain((jwtSecret) => env("PASSWORD"))
  );
};
