import type { App } from "vue";
import { Loading } from "./service";
import { vLoading } from "./directive";
export const GgLoading = {
	name: "GgLoading",
	install(app: App) {
		app.directive("loading", vLoading);
		app.config.globalProperties.$loading = Loading;
	},
	service: Loading,
	directive: vLoading,
};

export default GgLoading;

export { vLoading, vLoading as GgLoadingDirective, Loading as GgLoadingService };

export * from "./types";
