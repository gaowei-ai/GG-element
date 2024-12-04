<template>
	<Transition name="fade-in-linear" @after-leave="onAfterLeave">
		<div
			v-show="(props.visible as Ref).value"
			class="gg-loading gg-loading__mask"
			:class="{ 'is-fullscreen': fullscreen }"
		>
			<div class="gg-loading__spinner">
				<gg-icon v-if="props.spinner !== false" :icon="iconName" spin></gg-icon>
				<p v-if="props.text" class="gg-loading-text">{{ text }}</p>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	import { computed, type Ref } from "vue";
	import { GgIcon } from "../Icon";
	import type { LoadingOptions } from "./types";
	import { isString } from "lodash-es";
	defineOptions({
		name: "GgLoading",
		inheritAttrs: false,
	});

	const props = defineProps<LoadingOptions>();

	const iconName = computed(() => {
		if (isString(props.spinner)) {
			return props.spinner;
		}
		return "spinner";
	});
</script>
<style>
	@import "./style.css";
	.gg-loading {
		--gg-loading-bg-color: v-bind(background) !important;
		--gg-loading-z-index: v-bind(zIndex) !important;
	}
</style>
