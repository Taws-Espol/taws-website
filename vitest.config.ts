import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    // The modules under test are pure and render to a string, so no DOM is needed.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
