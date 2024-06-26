import type { Plugin, App } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

/**
 *
 * @param components 批量注册插件
 * @returns
 */

export function makeInstaller(components: Plugin[]) {
	const install = (app: App) => {
		each(components, (component) => {
			app.use(component);
		});
	};

	return install;
}

/**
 * 给单个组件添加install方法，使其可以通过app.use()方法注册为Vue插件。
 * @param component  注册成全局组件
 * @returns
 */
export const withInstall = <T>(component: T) => {
	(component as SFCWithInstall<T>).install = (app: App) => {
		const name = (component as any)?.name;
		app.component(name, component as SFCWithInstall<T>);
	};
	return component as SFCWithInstall<T>;
};
