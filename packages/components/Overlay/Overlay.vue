<template>
	<div
		v-if="mask"
		class="gg-overlay"
		@click="onMaskClick"
		:style="{ zIndex: zIndex }"
		:class="overlayClass"
	>
		<slot></slot>
	</div>

	<div
		v-else
		:class="overlayClass"
		:style="{
			zIndex: zIndex,
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		}"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import type { OverlayEmits, OverlayProps } from "./types";

	defineOptions({
		name: "GgOverlay",
	});
	withDefaults(defineProps<OverlayProps>(), {
		mask: true,
	});

	const emits = defineEmits<OverlayEmits>();

	const onMaskClick = (e: MouseEvent) => {
		emits("click", e);
	};
</script>
<style scoped>
	.gg-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		overflow: auto;
		z-index: 2000;
	}
</style>
