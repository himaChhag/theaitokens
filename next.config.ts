import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ Key fix: don't bundle tiktoken; load it from node_modules so the wasm is found
  serverExternalPackages: ["tiktoken"],
};

export default nextConfig;