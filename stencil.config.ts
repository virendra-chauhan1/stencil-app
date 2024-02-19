// (c) Copyright 2024 Hewlett Packard Enterprise Development LP
import { Config } from "@stencil/core";
import { postcss } from "@stencil-community/postcss";
import autoprefixer from "autoprefixer";
import replace from "postcss-replace";
import { inlineSvg } from "stencil-inline-svg";
import storageStyles from "@storage/dscc-storage-styles";
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

// purge function to keep only the classes used in EACH component
const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/**/*.css", "./src/**/*.ts"],
  safelist: [":host"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  blocklist: [
    "block",
    /^dscc-/,
    "inline-block",
    "box-border",
    "cursor-pointer",
    "no-underline",
    /^bg-/,
    "rounded",
    "normal-case",
    "overflow-visible",
    "transition",
    "duration-100",
    "ease-in-out",
    /^border/,
    "outline",
    /^py-/,
    /^px-/,
  ],
});

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],

  plugins: [
    inlineSvg(),
    postcss({
      // Add postcss plugins
      plugins: [
        storageStyles,
        autoprefixer(),
        // Shadow dom does not respect 'html' and 'body' styling, so we replace it with ':host' instead
        replace({ pattern: "html", data: { replaceAll: ":host" } }),
        // purge and cssnano if production build
        ...(process.argv.includes("--purge") ? [purge, cssnano()] : []),
      ],
    }),
  ],
};
