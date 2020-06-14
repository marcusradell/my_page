import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { getEnv } from "./get_env";

export const main = () => {
  dotenv.config();

  const port = getEnv("PORT");
  const jwtSecret = getEnv("JWT_SECRET");
  const password = getEnv("PASSWORD");

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.post("/status", (req, res) => {
    res.json({
      status: "alive_ready",
    });
  });

  app.post("/api/identity", (req, res) => {
    if (req.body.password !== password) {
      return res.json({
        type: "identity.login:failed",
      });
    }

    const token = jwt.sign({}, jwtSecret);

    res.json({ type: "identity.login:succeeded", token });
  });

  return new Promise<() => Promise<void>>((res) => {
    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}.`);
      res(close);
    });

    const close = () =>
      new Promise<void>((res, rej) => {
        server.close((error) => {
          if (error) {
            rej(error);
            return;
          }

          res();
        });
      });
  });
};
