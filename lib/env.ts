export enum Env {
  DEV = "development",
  PROD = "production",
}

interface IEnv {
  env: Env;
  internalEndpoint: string;
  isMock: boolean;
}

export const getEnv = (): IEnv => {
  return {
    env: (process.env.NODE_ENV as Env) || Env.DEV,
    internalEndpoint: process.env.NEXT_PUBLIC_INTERNAL_ENDPOINT || "",
    isMock: process.env.NEXT_PUBLIC_MOCK === "true",
  };
};
