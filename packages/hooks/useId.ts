import { computed } from "vue";
const defaultIdInject = {
	prefix: Math.floor(Math.random() * 10000),
	current: 0,
};

export default function useId(namespace: string = "gg") {
	return computed(() => `${namespace}-${defaultIdInject.prefix}-${defaultIdInject.current++}`);
}
