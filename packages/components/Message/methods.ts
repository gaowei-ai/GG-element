import { h, isVNode, render, shallowReactive } from "vue";
import {
	type MessageFn,
	type Message,
	type MessageParams,
	type CreateMessageProps,
	type MessageInstance,
	type MessageHandler,
	type MessageType,
	type MessageProps,
	messageTypes,
} from "./types";
import { each, findIndex, isString, get, set } from "lodash-es";
import { useId, useZIndex } from "@GG-element/hooks";
import MessageSfc from "./Message.vue";

export const messageDefaults = {
	type: "info",
	duration: 3000,
	offset: 10,
	transitionName: "fade-up",
};

const normalizedOptiions = (opts: MessageParams): CreateMessageProps => {
	const result =
		!opts || isVNode(opts) || isString(opts)
			? {
					message: opts,
				}
			: opts;
	return { ...messageDefaults, ...result } as CreateMessageProps;
};

const instances: MessageInstance[] = shallowReactive([]);
const { nextZIndex } = useZIndex();
const createMessageInstance = (props: CreateMessageProps): MessageInstance => {
	const id = useId().value;
	const container = document.createElement("div");

	const destory = () => {
		const index = findIndex(instances, { id });
		if (index === -1) return;
		instances.splice(index, 1);
		render(null, container);
	};

	const _props: MessageProps = {
		...props,
		id,
		onDestory: destory,
		zIndex: nextZIndex(),
	};
	//虚拟节点
	const vnode = h(MessageSfc, _props);
	render(vnode, container);
	document.body.appendChild(container.firstElementChild!);
	const vm = vnode.component!;

	const handler: MessageHandler = {
		close: () => vm.exposed!.close(),
	};

	const _instance: MessageInstance = {
		id,
		vnode,
		props: _props,
		vm,
		handler,
	};
	instances.push(_instance);

	return _instance;
};

export const closeAll = (type?: MessageType) => {
	each(instances, (instance) => {
		if (type) {
			instance.props.type === type && instance.handler.close();
			return;
		}
		instance.handler.close();
	});
};

export function getLastBottomOffset(this: MessageProps) {
	const index = findIndex(instances, { id: this.id });
	if (index <= 0) return 0;

	// 获取上一个元素
	return get(instances, [index - 1, "vm", "exposed", "bottomOffset", "value"]);
}

export const message: MessageFn & Partial<Message> = (options = {}) => {
	const normalized = normalizedOptiions(options);
	const instance = createMessageInstance(normalized);
	return instance.handler;
};
message.closeAll = closeAll;
each(messageTypes, (type) => {
	set(message, type, (opts: MessageParams) => {
		const normalized = normalizedOptiions(opts);
		return message({ ...normalized, type });
	});
});

export default message;
