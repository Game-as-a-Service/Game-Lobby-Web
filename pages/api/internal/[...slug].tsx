import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

import { getEnv } from "@/lib/env";

const env = getEnv();

const customRouter: Options["router"] = (req) => {
  if (req.cookies._domain && req.url.includes("socket")) {
    return req.cookies._domain;
  }
  return env.internalEndpoint;
};

const proxyMiddleware = createProxyMiddleware({
  target: env.internalEndpoint,
  changeOrigin: true,
  pathRewrite: { "^/api/internal": env.isMock ? "/api/mock" : "" },
  router: customRouter,
}) as any;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxyMiddleware(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
