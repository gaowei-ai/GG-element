import { createVNode, render, type VNode, type App } from "vue";
import Loading from "./index.vue";
import type { Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;
export const withInstallFunction = <T>(fn: T, name: string) => {
	(fn as SFCWithInstall<T>).install = (app: App) => {
		debugger;
		app.config.globalProperties[name] = fn;
	};

	return fn as SFCWithInstall<T>;
};
const _Loading = () => {
	//createVNode vue提供的底层方法 可以给我们组件创建一个虚拟DOM 也就是Vnode
	const vnode: VNode = createVNode(Loading);
	//render 把我们的Vnode 生成真实DOM 并且挂载到指定节点
	render(vnode, document.body);
};
export const LoadingComponent = withInstallFunction(_Loading, "$loading");
