import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "@svgr/rollup";
import {
  defineConfig,
  ConfigEnv,
  UserConfig,
  Plugin as VitePlugin,
} from "vite";
import { VitePWA } from "vite-plugin-pwa";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig((env: ConfigEnv): UserConfig => {
  const plugins = [
    react(),
    svgr(),
    viteTsconfigPaths(),
    env.command === "build" &&
      removeConsole({
        includes: ["log", "warn", "error"],
      }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "/icons/favicon.ico",
        "/icons/favicon-16x16.png",
        "/icons/favicon-32x32.png",
        "/icons/apple-icon-180x180.png",
        "robots.txt",
      ],
      manifest: {
        name: "Lucky Day",
        short_name: "Lucky Day",
        description: "무작위로 찾아오는 나만의 특별한 날",
        theme_color: "#faf7f3",
        background_color: "#FFB43E",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        dir: "ltr",
        icons: [
          {
            src: "/icons/icon_48.png",
            type: "image/png",
            sizes: "48x48",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_72.png",
            type: "image/png",
            sizes: "72x72",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_96.png",
            type: "image/png",
            sizes: "96x96",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_152.png",
            type: "image/png",
            sizes: "152x152",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },
          {
            src: "/icons/icon_192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icons/icon_512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
          {
            src: "/icons/icon_512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        lang: "ko",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/developers\.kakao\.com\/sdk\/js\/kakao\.min\.js$/,
            handler: "NetworkOnly", // Kakao SDK는 네트워크에서만 로드
          },
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "CacheFirst",
            options: {
              cacheName: "local-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean) as VitePlugin[];

  return {
    plugins,
    cacheDir: "./.vite",
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});
