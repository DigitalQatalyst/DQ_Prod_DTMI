// Force Vite to reload dependencies
import { createServer } from "vite";

const server = await createServer({
  optimizeDeps: {
    force: true,
  },
});

console.log("Forcing dependency re-optimization...");
await server.close();
console.log("Done! Please refresh your browser.");
