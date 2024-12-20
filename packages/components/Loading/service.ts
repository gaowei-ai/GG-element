import { defer, delay, isNil, isString } from "lodash-es";
import type { LoadingOptions, LoadingOptionsResolved } from "./types";
import { createApp, nextTick, reactive, ref } from "vue";
import LoadingComp from "./Loading.vue";
import { useZIndex } from "@GG-element/hooks";

const RELATIVE_CLASS = "gg-loading-parent--relative" as const;
const HIDDEN_CLASS = "gg-loading-parent--hiden" as const;
const LOADING_NUMB_KEY = "gg-loading-numb" as const;

const instanceMap: Map<HTMLElement, LoadingInstance> = new Map();
const { nextZIndex } = useZIndex(3000);

function getLoadingNumb(target: HTMLElement = document.body) {
	return target.getAttribute(LOADING_NUMB_KEY);
}

function addRelativeClass(target: HTMLElement = document.body) {
	target.classList.add(RELATIVE_CLASS);
}

function removeRelativeClass(target: HTMLElement = document.body) {
	target.classList.remove(RELATIVE_CLASS);
}

function addHiddenClass(target: HTMLElement = document.body) {
	target.classList.add(HIDDEN_CLASS);
}

function removeHiddenClass(target: HTMLElement = document.body) {
	target.classList.remove(HIDDEN_CLASS);
}

function removeLoadingNumb(target: HTMLElement = document.body) {
	return target.removeAttribute(LOADING_NUMB_KEY);
}

function addLoadingNumb(target: HTMLElement = document.body) {
	const numb = getLoadingNumb(target) ?? "0";
	target.setAttribute(LOADING_NUMB_KEY, `${Number.parseInt(numb) + 1}`);
}

function subLoadingNumb(target: HTMLElement = document.body) {
	const numb = getLoadingNumb(target);
	if (numb) {
		const newNumb = Number.parseInt(numb) - 1;
		if (newNumb === 0) {
			removeLoadingNumb(target);
		} else {
			target.setAttribute(LOADING_NUMB_KEY, `${newNumb}`);
		}
	}
}
function createLoading(opts: LoadingOptionsResolved) {
	const visible = ref(opts.visible);
	const afterLeaveFlag = ref(false);

	const handleAfterLeave = () => {
		if (!afterLeaveFlag.value) return;
		destory();
	};

	const destory = () => {
		const target = opts.parent;
		subLoadingNumb(target);
		if (getLoadingNumb(target)) return;
		delay(() => {
			removeRelativeClass(target);
			removeHiddenClass(target);
		}, 1);
		instanceMap.delete(target ?? document.body);
		vm.$el?.parentNode?.removeChild(vm.$el);
		app.unmount();
	};

	const data = reactive({
		...opts,
		onAfterLeave: handleAfterLeave,
	});

	const setText = (text: string) => (data.text = text);

	let afterLeaveTimer: number;
	const close = () => {
		if (opts.beforeClose && !opts.beforeClose()) return;

		afterLeaveFlag.value = true;
		clearTimeout(afterLeaveTimer);
		afterLeaveTimer = defer(handleAfterLeave);

		visible.value = false;
		opts.closed?.();
	};

	const app = createApp(LoadingComp, {
		...data,
		zIndex: data.fullscreen ? nextZIndex() : void 0,
		visible,
	});

	const vm = app.mount(document.createElement("div"));
	return {
		get $el(): HTMLElement {
			return vm.$el;
		},
		vm,
		close,
		visible,
		setText,
	};
}

function resolveOptions(options: LoadingOptions): LoadingOptionsResolved {
	let target: HTMLElement;
	if (isString(options.target)) {
		target = document.querySelector(options.target) ?? document.body;
	} else {
		target = options.target || document.body;
	}

	return {
		parent: target === document.body || options.body ? document.body : target,
		background: options.background ?? "rgba(0, 0, 0, 0.5)",
		spinner: options.spinner,
		text: options.text,
		fullscreen: target === document.body && (options.fullscreen ?? true),
		lock: options.lock ?? false,
		visible: options.visible ?? true,
		target,
	};
}

function addClass(options: LoadingOptions, parent: HTMLElement = document.body) {
	if (options.lock) {
		addHiddenClass(parent);
	} else {
		removeHiddenClass(parent);
	}

	addRelativeClass(parent);
}

let fullscreenInstance: LoadingInstance | null = null;
export type LoadingInstance = ReturnType<typeof createLoading>;

export function Loading(options: LoadingOptions = {}) {
	const resolved = resolveOptions(options);
	const target = resolved.parent ?? document.body;

	if (resolved.fullscreen && !isNil(fullscreenInstance)) {
		return fullscreenInstance;
	}

	addLoadingNumb(resolved.parent);

	if (instanceMap.has(target)) {
		return instanceMap.get(target)!;
	}

	const instance = createLoading({
		...resolved,
		closed: () => {
			resolved.closed?.();
			if (resolved.fullscreen) {
				fullscreenInstance = null;
			}
		},
	});

	addClass(options, resolved?.parent);

	resolved.parent?.appendChild(instance.$el);

	nextTick(() => (instance.visible.value = !!resolved.visible));

	if (resolved.fullscreen) {
		fullscreenInstance = instance;
	}
	instanceMap.set(target, instance);
	return instance;
}
