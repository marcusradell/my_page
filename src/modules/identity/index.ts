import { env } from "../../env";
import { Express } from "express";
import jwt from "jsonwebtoken";
import { pipe } from "fp-ts/lib/pipeable";
import { chain, right, either } from "fp-ts/lib/Either";
import { sequenceT } from "fp-ts/lib/Apply";

export const create = (app: Express) =>
  pipe(
    sequenceT(either)(env("JWT_SECRET"), env("PASSWORD")),
    chain(([jwtSecret, password]) => {
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
