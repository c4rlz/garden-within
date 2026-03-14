import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use this repo as the root for file tracing (avoids parent lockfile warning).
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
