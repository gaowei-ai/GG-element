import type { Plugin, App } from "vue";

type SFCWithInstall<T> = T & Plugin;

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

export const withInstallFunction = <T>(fn: T, name: string) => {
	(fn as SFCWithInstall<T>).install = (app: App) => {
		app.config.globalProperties[name] = fn;
	};

	return fn as SFCWithInstall<T>;
};
