import { env } from "../../env";
import { Express } from "express";
import jwt from "jsonwebtoken";
import { pipe } from "fp-ts/lib/pipeable";
import { chain, right, either } from "fp-ts/lib/Either";
import { sequenceS } from "fp-ts/lib/Apply";

export const create = (app: Express) =>
  pipe(
    sequenceS(either)({
      jwtSecret: env("JWT_SECRET"),
      password: env("PASSWORD"),
    }),
    chain(({ password, jwtSecret }) => {
      app.post("/api/identity", (req, res) => {
        if (req.body.password !== password) {
          return res.json({
            type: "identity.login:failed",
          });
        }

        const token = jwt.sign({}, jwtSecret);

        res.json({ type: "identity.login:succeeded", token });
      });

      return right(null);
    })
  );
