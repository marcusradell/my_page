import axios from "axios";
import jwt from "jsonwebtoken";
import { main } from "./main";
import { env } from "./env";

type Url = (relativeUrl: string) => string;

const url: Url = (relativeUrl) =>
  `http://localhost:${env("PORT")}${relativeUrl}`;

test("status", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${env("PORT")}/status`)
    .then((res) => res.data)
    .catch((error) => error);

  await close();

  expect(result).toEqual({ status: "alive_ready" });
});

test("identity.login:succeeded", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${env("PORT")}/api/identity`, {
      password: "solradell",
    })
    .then((res) => res.data);

  await close();

  expect(result.type).toEqual("identity.login:succeeded");
  expect(() => jwt.verify(result.token, env("JWT_SECRET"))).not.toThrow();
});

test("identity.login:failed", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${env("PORT")}/api/identity`)
    .then((res) => res.data);

  await close();

  expect(result).toEqual({
    type: "identity.login:failed",
  });
});
