import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
 nitro: isVercel
  ? {
      preset: "vercel",
      output: {
        dir: ".vercel/output",
        serverDir: ".vercel/output/functions/__server.func",
        publicDir: ".vercel/output/static",
      },
    }
  : true,

  tanstackStart: {
    server: { entry: "server" },
    pages: [{ path: "/" }, { path: "/auth" }],
    prerender: {
      enabled: true,
      autoStaticPathDiscovery: false,
    },
  },
});
