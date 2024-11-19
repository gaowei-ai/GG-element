import shell from "shelljs";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { delay, filter, includes, map } from "lodash-es";
import { resolve } from "path";
import dts from "vite-plugin-dts"; //生产d.ts文件
import { readdirSync, readdir } from "fs";
import { hooksPlugin } from "@GG-element/vite-plugins";

function getDirectoriesSync(basePath: string) {
	const entries = readdirSync(resolve(__dirname, basePath), { withFileTypes: true });

	const res = map(
		filter(entries, (entry) => entry.isDirectory()),
		(entry) => entry.name
	);
	// console.log(res, "-----------");
	return res;
}

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
	readdir("./dist/es/theme", (err) => {
		console.log("mover", err);
		if (err) return delay(moveStyles, 1000);
		// 将theme文件夹移动到dist下
		shell.mv("./dist/es/theme", "./dist");
	});
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: "../../tsconfig.build.json",
			outDir: "dist/types",
		}),
		hooksPlugin({
			rmFiles: ["./dist/es", "./dist/types", "./dist/theme"],
			buildStart() {},
			afterBuild() {
				moveStyles();
			},
		}),
	],
	define: {
		PROD: JSON.stringify(isProd),
		DEV: JSON.stringify(isDev),
		TEST: JSON.stringify(isTest),
	},
	build: {
		outDir: "dist/es",
		// minify: false,
		cssCodeSplit: true, // 样式分包
		lib: {
			entry: resolve(__dirname, "./index.ts"),
			formats: ["es"],
			name: "GGElement",
			fileName: "index",
		},

		rollupOptions: {
			external: [
				"vue",
				"@fortawesome/fontawesome-svg-core",
				"@fortawesome/free-solid-svg-icons",
				"@fortawesome/vue-fontawesome",
				"@popperjs/core",
				"async-validator",
			], //外部模块 vue排除不打包
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "style.css") return "index.css";
					//css文件移动到theme目录
					if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name as string)) {
						return "theme/[name].[ext]";
					}
					return assetInfo.name as string;
				},
				//分包
				manualChunks(id) {
					if (includes(id, "MessageBox")) {
						console.log(id, "has00000000000000----");
					}

					if (includes(id, "node_modules")) return "vendor";

					if (includes(id, "/packages/hooks")) return "hooks";

					if (includes(id, "/packages/utils") || includes(id, "plugin-vue:export-helper"))
						return "utils";

					for (const item of getDirectoriesSync("../components")) {
						// if (item === "MessageBox") {
						// 	console.log("messageBox", id);
						// }
						if (includes(id, `/packages/components/${item}`)) {
							console.log(item);
							return item;
						}
					}
				},
			},
		},
	},
});
