import type { Plugin, App } from "vue";
import { each } from "lodash-es";
import type { ConfigProviderProps } from "@GG-element/components/ConfigProvider/types";
import { provideGlobalConfig } from "@GG-element/components/ConfigProvider";

/**
 *
 * @param components 批量注册插件
 * @returns
 */

export function makeInstaller(components: Plugin[]) {
	const install = (app: App, options?: ConfigProviderProps) => {
		each(components, (component) => app.use(component));
		if (options) provideGlobalConfig(options, app, true);
	};

	return install;
}
