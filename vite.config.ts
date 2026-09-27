import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  ssr: {
    noExternal: [
      "@supabase/supabase-js",
      "@supabase/functions-js",
      "@supabase/auth-js",
      "@supabase/postgrest-js",
      "@supabase/realtime-js",
      "@supabase/storage-js",
    ],
  },

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
