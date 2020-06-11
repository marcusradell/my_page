import axios from "axios";
import jwt from "jsonwebtoken";
import { main } from "./main";
import { getEnv } from "./get_env";

test("/status", async () => {
  const close = await main();

  const result = await axios
    .post("http://localhost:5000/status")
    .then((res) => res.data)
    .catch((error) => error);

  await close();

  expect(result).toEqual({ status: "alive_ready" });
});

test("/api/identity", async () => {
  const close = await main();

  const { token } = await axios
    .post("http://localhost:5000/api/identity", {
      password: "solradell",
    })
    .then((res) => res.data)
    .catch((error) => ({ error, blasted: "noes!" }));

  await close();

  expect(() => jwt.verify(token, getEnv("JWT_SECRET"))).not.toThrow();
});
