import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  nitro: isVercel
    ? {
        preset: "vercel",
      }
    : true,

  tanstackStart: {
    server: { entry: "server" },

    pages: [{ path: "/" }, { path: "/auth" }],

    prerender: {
      enabled: !isVercel,
      autoStaticPathDiscovery: false,
    },
  },
});