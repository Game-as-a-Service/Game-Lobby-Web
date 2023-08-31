import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

import { getEnv } from "@/lib/env";

const env = getEnv();

const proxyMiddleware = createProxyMiddleware({
  target: env.internalEndpoint,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    if (!env.isMock) return path.replace(/^\/api\/internal/, "");
    return path.replace(/:/g, "/").replace(/^\/api\/internal/, "/api/mock");
  },
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
