import shell from "shelljs";
import { readFile } from "fs";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import { delay } from "lodash-es";
import { hooksPlugin } from "@GG-element/vite-plugins";

function moveStyles() {
	readFile("./dist/umd/index.css", (err) => {
		if (err) return delay(moveStyles, 1000);
		// 将theme文件夹复制到dist下
		shell.cp("./dist/umd/index.css", "./dist");
	});
}

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
	plugins: [
		vue(),
		hooksPlugin({
			// 移除多余的文件
			rmFiles: ["./dist/umd", "./dist/index.css"],
			buildStart() {},
			afterBuild: moveStyles,
		}),
	],
	define: {
		PROD: JSON.stringify(isProd),
		DEV: JSON.stringify(isDev),
		TEST: JSON.stringify(isTest),
	},
	build: {
		outDir: "dist/umd",
		lib: {
			entry: resolve(__dirname, "./index.ts"),
			formats: ["umd"],
			name: "GGElement",
			fileName: "index",
		},
		rollupOptions: {
			external: ["vue"], //外部模块 vue排除不打包
			output: {
				exports: "named",
				globals: {
					//只有umd或life模式需要定义globals
					vue: "Vue", //指定外部模块 'vue' 在捆绑包中对应的全局变量是 Vue。这意味着在捆绑包中，当需要引用 'vue' 模块时，会使用全局变量
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "style.css") return "index.css";
					return assetInfo.name as string;
				},
			},
		},
	},
});
