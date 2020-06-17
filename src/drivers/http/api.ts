import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Task } from "fp-ts/lib/Task";
import { Close } from "./types";

type CreateApi = (args: { port: string }) => Task<Close>;

export const createApi: CreateApi = ({ port }) => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.post("/status", (req, res) => {
    res.json({
      status: "alive_ready",
    });
  });

  return () =>
    new Promise<Close>((resolve) => {
      const server = app.listen(port, () => {
        console.log(`Server started on port ${port}.`);
        resolve(close);
      });

      const close: Close = () => () =>
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
