type Env = (key: string) => string;

export const env: Env = (key) => {
  const env = process.env[key];

  if (!env) {
    throw new Error(`Missing env ${key}.`);
  }

  return env;
};
