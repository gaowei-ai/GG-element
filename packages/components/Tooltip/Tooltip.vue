<template>
	<div class="gg-tooltip" ref="containerNode" v-on="outerEvents">
		<div class="gg-tooltip__trigger" ref="_triggerNode" v-on="events" v-if="!virtualTriggering">
			<slot></slot>
		</div>
		<slot name="default" v-else></slot>

		<transition :name="transition" @after-leave="destroyPopperInstance">
			<div class="gg-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
				<slot name="content">
					{{ content }}
				</slot>
				<div id="arrow" data-popper-arrow></div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
	import type { Ref } from "vue";
	import { computed, onUnmounted, ref, watch, watchEffect } from "vue";
	import type { TooltipEmits, TooltipInstance, TooltipProps } from "./types";
	import { bind, debounce, type DebouncedFunc } from "lodash-es";
	import { createPopper, type Instance } from "@popperjs/core";
	import { useClickOutside } from "@GG-element/hooks";
	import useEvenstToTriggerNode from "./useEventsToTriggerNode";

	defineOptions({
		name: "GgTooltip",
	});

	interface _TooltipProps extends TooltipProps {
		virtualRef?: HTMLElement | void;
		virtualTriggering?: boolean;
	}

	const props = withDefaults(defineProps<_TooltipProps>(), {
		placement: "bottom",
		trigger: "hover",
		transition: "fade",
		showTimeout: 0,
		hideTimeout: 200,
	});

	const emits = defineEmits<TooltipEmits>();

	const events: Ref<Record<string, EventListener>> = ref({});
	const outerEvents: Ref<Record<string, EventListener>> = ref({});
	const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

	const containerNode = ref<HTMLElement>();
	const popperNode = ref<HTMLElement>();
	const _triggerNode = ref<HTMLElement>();

	const triggerNode = computed(() => {
		if (props.virtualTriggering) {
			return props.virtualRef ?? _triggerNode.value;
		}
		return _triggerNode.value;
	});

	const popperOptions = computed(() => ({
		placement: props.placement,
		modifiers: [
			{
				name: "offset",
				options: {
					offset: [0, 8],
				},
			},
		],
		...props.popperOptions,
	}));

	const triggerStrategyMap: Map<string, () => void> = new Map();
	triggerStrategyMap.set("hover", () => {
		events.value["mouseenter"] = openFinal;
		outerEvents.value["mouseleave"] = closeFinal;
		dropdownEvents.value["mouseenter"] = openFinal;
	});
	triggerStrategyMap.set("click", () => {
		events.value["click"] = togglePopper;
	});
	triggerStrategyMap.set("contextmenu", () => {
		events.value["contextmenu"] = (e) => {
			e.preventDefault();
			openFinal();
		};
	});

	const visible = ref(false);

	function togglePopper() {
		visible.value ? closeFinal() : openFinal();
	}
	function setVisible(value: boolean) {
		if (props.disabled) return;
		visible.value = value;
		emits("visible-change", value);
	}

	let openDebounce: DebouncedFunc<() => void> | void;
	let closeDebounce: DebouncedFunc<() => void> | void;
	const openDelay = computed(() => (props.trigger === "hover" ? props.showTimeout : 0));
	const closeDelay = computed(() => (props.trigger === "hover" ? props.hideTimeout : 0));

	// 设置打开关闭函数
	watchEffect(() => {
		openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
		closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
	});

	function openFinal() {
		closeDebounce?.cancel();
		openDebounce?.();
	}

	function closeFinal() {
		openDebounce?.cancel();
		closeDebounce?.();
	}

	function attachEvents() {
		if (props.disabled || props.manual) return;
		triggerStrategyMap.get(props.trigger)?.();
	}

	function resetEvents() {
		events.value = {};
		outerEvents.value = {};
		dropdownEvents.value = {};

		attachEvents();
	}

	// 监听手动模式
	watch(
		() => props.manual,
		(isManual) => {
			if (isManual) {
				events.value = {};
				outerEvents.value = {};
				dropdownEvents.value = {};
				return;
			}
			attachEvents();
		},
		{
			immediate: true,
		}
	);

	//监听触发方式
	watch(
		() => props.trigger,
		() => {
			openDebounce?.cancel();
			setVisible(false);
			resetEvents();
		}
	);

	let popperInstance: null | Instance;
	watch(
		visible,
		(val) => {
			if (!val) return;
			if (triggerNode.value && popperNode.value) {
				popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
			}
		},
		{
			flush: "post",
		}
	);

	function destroyPopperInstance() {
		popperInstance?.destroy();
		popperInstance = null;
	}

	onUnmounted(() => {
		destroyPopperInstance();
	});

	//点击外部触发事件
	useClickOutside(containerNode, () => {
		emits("click-outside");
		if (props.trigger === "hover" || props.manual) return;
		visible.value && closeFinal();
	});

	//虚拟触发
	useEvenstToTriggerNode(props, triggerNode, events, () => {
		openDebounce?.cancel();
		setVisible(false);
	});

	const show: TooltipInstance["show"] = openFinal;
	const hide: TooltipInstance["hide"] = () => {
		openDebounce?.cancel();
		setVisible(false);
	};

	defineExpose<TooltipInstance>({
		show,
		hide,
	});
</script>
<style scoped>
	@import "./style.css";
</style>
