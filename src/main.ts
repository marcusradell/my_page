import dotenv from "dotenv";
import * as identity from "./modules/identity";
import express from "express";
import { fold } from "fp-ts/lib/Either";

export const main = () => {
  dotenv.config();
  const app = express();

  const identityApi = identity.create(app);
  fold(
    (errors) => {
      console.error(errors);
    },
    () => {
      console.log("Identity module initialized.");
    }
  )(identityApi);
};
