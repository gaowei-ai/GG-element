/// <reference types="vitest" />

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

export default defineConfig({
	plugins: [vue(), vueJsx()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: resolve(__dirname, "./vitest.setup.ts"), // 每个test都执行该文件
	},
});
