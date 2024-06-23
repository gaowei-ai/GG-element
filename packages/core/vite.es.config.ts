import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { filter, includes, map } from "lodash-es";
import { resolve } from "path";
import dts from "vite-plugin-dts"; //生产d.ts文件
import { readdirSync } from "fs";

function getDirectoriesSync(basePath: string) {
	const entries = readdirSync(resolve(__dirname, basePath), { withFileTypes: true });

	return map(
		filter(entries, (entry) => entry.isDirectory()),
		(entry) => entry.name
	);
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: "../../tsconfig.build.json",
			outDir: "dist/types",
		}),
	],
	build: {
		outDir: "dist/es",
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
					return assetInfo.name as string;
				},
				//分包
				manualChunks(id) {
					if (includes(id, "node_modules")) return "vendor";

					if (includes(id, "/packages/hooks")) return "hooks";

					if (includes(id, "/packages/utils") || includes(id, "plugin-vue:export-helper"))
						return "utils";

					for (const item of getDirectoriesSync("../components")) {
						if (includes(id, `/packages/components/${item}`)) return item;
					}
				},
			},
		},
	},
});
