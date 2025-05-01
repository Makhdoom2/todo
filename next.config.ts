import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
