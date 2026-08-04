import { injectCssPlugin } from "@bosh-code/tsdown-plugin-inject-css";
import { tailwindPlugin } from "@bosh-code/tsdown-plugin-tailwindcss";
import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.css"],
	format: "esm",
	outDir: "./dist",
	clean: true,
	exports: true,
	dts: true,
	sourcemap: false,
	noExternal: [/@workspace\/.*/],
	platform: "browser",
	external: ["/.css$/", "react", "react/jsx-runtime"],
	minify: process.env.NODE_ENV === "production",
	plugins: [tailwindPlugin(), injectCssPlugin()],
	css: {
		splitting: false,
	},
});
