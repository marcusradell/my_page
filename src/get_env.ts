type GetEnv = (key: string) => string;

export const getEnv: GetEnv = (key) => {
  const env = process.env[key];

  if (!env) {
    throw new Error(`Missing env ${key}.`);
  }

  return env;
};
