import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ Key fix: don't bundle tiktoken; load it from node_modules so the wasm is found
  serverExternalPackages: [
    "tiktoken", 
    "@xenova/transformers", 
    "@anthropic-ai/tokenizer",
    "cohere-ai",
    "openai",
    "@anthropic-ai/sdk",
    "@google/generative-ai"
  ],
  
  // Use turbopack config instead of webpack for Next.js 16
  turbopack: {
    // Empty config to silence the warning
  },
};

export default nextConfig;