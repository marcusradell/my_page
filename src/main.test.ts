import axios from "axios";
import jwt from "jsonwebtoken";
import { main } from "./main";
import { getEnv } from "./get_env";

test("status", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${getEnv("PORT")}/status`)
    .then((res) => res.data)
    .catch((error) => error);

  await close();

  expect(result).toEqual({ status: "alive_ready" });
});

test("identity.login:succeeded", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${getEnv("PORT")}/api/identity`, {
      password: "solradell",
    })
    .then((res) => res.data);

  await close();

  expect(result.type).toEqual("identity.login:succeeded");
  expect(() => jwt.verify(result.token, getEnv("JWT_SECRET"))).not.toThrow();
});

test("identity.login:failed", async () => {
  const close = await main();

  const result = await axios
    .post(`http://localhost:${getEnv("PORT")}/api/identity`)
    .then((res) => res.data);

  await close();

  expect(result).toEqual({
    type: "identity.login:failed",
  });
});
