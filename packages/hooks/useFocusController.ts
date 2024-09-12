import { isFunction } from "lodash-es";
import { getCurrentInstance, ref, type Ref } from "vue";
import useEventListener from "./useEventListener";

interface UseFocusControllerOptions {
	afterFocus?(): void;
	beforeBlur?(event: FocusEvent): boolean | void;
	afterBlur?(): void;
}

export default function useFocusController<T extends HTMLElement | { focus(): void }>(
	target: Ref<T | void>,
	{ afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions = {}
) {
	const { emit } = getCurrentInstance()!;
	const wrapperRef = ref<HTMLElement>();
	const isFocused = ref(false);

	//聚焦
	const handleFocus = (event: FocusEvent) => {
		if (isFocused.value) return;
		isFocused.value = true;
		emit("focus", event);
		afterFocus?.();
	};

	// 失焦
	const handleBlur = (event: FocusEvent) => {
		const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
		// 从当前input移动到下一个input event.relatedTarget 有值 不触发blur
		if (
			cancelBlur ||
			(event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget as Node))
		)
			return;

		isFocused.value = false;
		emit("blur", event);
		afterBlur?.();
	};

	const handleClick = () => {
		target.value?.focus();
	};

	useEventListener(wrapperRef, "click", handleClick);

	return {
		wrapperRef,
		isFocused,
		handleFocus,
		handleBlur,
	};
}
