<template>
	<component
		:is="tag"
		ref="_ref"
		:type="tag === 'button' ? nativeType : void 0"
		class="gg-button"
		:disabled="disabled || loading ? true : false"
		:class="{
			[`gg-button--${type}`]: type,
			[`gg-button--${size}`]: size,
			'is-plain': plain,
			'is-round': round,
			'is-circle': circle,
			'is-disabled': disabled,
			'is-loading': loading,
		}"
		@click="(e:MouseEvent) => (useThrottle ? throttleClick(e) : handleClick(e))"
	>
		<template v-if="loading">
			<slot name="loading">
				<gg-icon
					class="loading-icon"
					:icon="loadingIcon ?? 'spinner'"
					size="1x"
					spin
					:style="iconStyle"
				></gg-icon>
			</slot>
		</template>

		<gg-icon v-if="icon && !loading" :icon="icon" size="1x" :style="iconStyle"></gg-icon>

		<slot></slot>
	</component>
</template>

<script setup lang="ts">
	defineOptions({
		name: "GgButton",
	});

	import { computed, inject, ref } from "vue";
	import type { ButtonEmits, ButtonInstance, ButtonProps } from "./types";
	import { throttle } from "lodash-es";
	import { GgIcon } from "../Icon";
	import { BUTTON_GROUP_CTX_KEY } from "./constants";

	const props = withDefaults(defineProps<ButtonProps>(), {
		tag: "button",
		nativeType: "button",
		useThrottle: false,
		throttleDuration: 500,
	});

	const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);

	const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
	const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");
	const disabled = computed(() => buttonGroupCtx?.disabled || props.disabled || false);

	const emits = defineEmits<ButtonEmits>();
	const handleClick = (e: MouseEvent) => {
		emits("click", e);
	};
	const throttleClick = throttle(handleClick, props.throttleDuration);

	const slots = defineSlots();

	const iconStyle = computed(() => ({
		marginRight: slots.default ? "6px" : "0px",
	}));

	const _ref = ref<HTMLButtonElement>();
	defineExpose<ButtonInstance>({
		ref: _ref,
	});
</script>
<style scoped>
	@import "./style.css";
</style>
