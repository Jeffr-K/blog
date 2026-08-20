import type { NextConfig } from "next";
import stylexPlugin from "@stylexjs/nextjs-plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

export default stylexPlugin({
  rootDir: process.cwd(),
})(nextConfig);
