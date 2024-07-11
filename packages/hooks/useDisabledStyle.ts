import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
	each(nodes, (node) => {
		isFunction(cb) && cb(node);
		node.children && _dfs(node.children as VNode[], cb);
	});

export function useDisabledStyle() {
	const nodePropsMap = new Map();
	console.log("useDisabledStyle");

	const instance = getCurrentInstance();
	const children = useSlots()?.default?.();

	watchEffect(() => {
		if (!instance?.props.disabled) {
			_dfs(children ?? [], (node) => {
				if (!nodePropsMap.has(node)) return;
				node.props = nodePropsMap.get(node);
			});
			return;
		}
		_dfs(children ?? [], (node) => {
			//没有props属性代表是个纯文本节点
			if (!node.hasOwnProperty("props")) return;

			nodePropsMap.set(node, cloneDeep(node.props));
			node.props = assign(node?.props, {
				style: {
					cursor: "not-allowed",
					color: "var(--gg-text-color-placeholder)",
				},
			});
		});
	});
	console.log("instance", instance);
	console.log(children);
}

export default useDisabledStyle;
