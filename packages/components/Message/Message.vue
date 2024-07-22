<template>
	<Transition
		:name="transitionName"
		@afterLeave="!visible && onDestory()"
		@enter="boxHeight = messageRef!.getBoundingClientRect().height"
	>
		<div
			ref="messageRef"
			class="gg-message"
			:class="{
				[`gg-message--${type}`]: type,
				'is-close': showClose,
				'text-center': center,
			}"
			v-show="visible"
			:style="customStyle"
			role="alert"
			@mouseenter="clearTimer"
			@mouseleave="startTimmer"
		>
			<gg-icon class="gg-message__icon" :icon="iconName" />
			<div class="gg-message__content">
				<slot>
					<render-vnode v-if="message" :vNode="message" />
				</slot>
			</div>
			<div class="gg-message__close" v-if="showClose">
				<gg-icon icon="xmark" @click.stop="close" />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from "vue";
	import type { MessageCompInstance, MessageProps } from "./types";
	import { GgIcon } from "../Icon";
	import { typeIconMap, RenderVnode, addUnit } from "@GG-element/utils";
	import { bind, delay } from "lodash-es";
	import { useEventListener, useOffset } from "@GG-element/hooks";
	import { getLastBottomOffset } from "./methods";

	defineOptions({
		name: "GgMessage",
	});

	const props = withDefaults(defineProps<MessageProps>(), {
		type: "info",
		duration: 3000,
		offset: 10,
		transitionName: "fade-up",
	});

	const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

	const visible = ref(false);
	function close() {
		visible.value = false;
	}

	let timer: number;
	function startTimmer() {
		if (props.duration === 0) return;
		timer = delay(close, props.duration);
	}
	function clearTimer() {
		clearTimeout(timer);
	}

	onMounted(() => {
		visible.value = true;
		startTimmer();
	});

	watch(visible, (value) => {
		if (!value) boxHeight.value = -props.offset; // 是关闭效果更流畅
	});
	const boxHeight = ref(0);
	const messageRef = ref<HTMLElement | null>(null);
	const { topOffset, bottomOffset } = useOffset({
		boxHeight,
		offset: props.offset,
		getLastBottomOffset: bind(getLastBottomOffset, props),
	});

	const customStyle = computed(() => ({
		top: addUnit(topOffset.value),
		zIndex: props.zIndex,
	}));

	useEventListener(document, "keydown", (e: Event) => {
		const { code } = e as KeyboardEvent;
		if (code === "Escape") close();
	});

	defineExpose<MessageCompInstance>({
		close,
		bottomOffset,
	});
</script>
<style scoped>
	@import "./style.css";
</style>
