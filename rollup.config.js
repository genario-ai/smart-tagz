import sucrase from "@rollup/plugin-sucrase";
import scss from "rollup-plugin-scss";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";
import common from "@rollup/plugin-commonjs";
import buble from "@rollup/plugin-buble";
import beep from "@rollup/plugin-beep";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
      format: "umd",
      exports: "named",
      strict: true,
      banner,
      name: "FloatMenu",
      globals: {
        vue: "vue",
        nanoid: "nanoid",
      },
    },
  ],
  plugins: [
    vue({
      target: "browser",
      css: true,
    }),
    scss(),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript"],
    }),
    common(),
    buble(),
    beep(),
  ],
  external: ["vue", "nanoid", "vue-feather-icons"],
};
