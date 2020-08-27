import { Result } from "frea-core";
import { IdentityApi } from "./types";
import * as Api from "./api";

type Create = () => IdentityApi;

export const create: Create = () => {
  const api = Api.create();

  return api;
};
