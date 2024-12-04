<template>
	<div
		style="width: 200px; height: 300px; background-color: aqua"
		v-loading="loading"
		gg-loading-text="loaduing"
	>
		1232321321
	</div>
	<gg-button @click="handleClick">As service</gg-button>
	<gg-button @click="handleClick">messageBox</gg-button>
</template>

<script setup lang="ts">
	import { GgLoading } from "GG-element";
	import { ref } from "vue";

	const loading = ref(true);
	const handleClick = () => {
		GgLoading.service({
			lock: true,
			spinner: "circle-notch",
			text: "加载中...",
			background: "rgba(255,255,255,0.5)",
		});
	};
</script>
<style lang="scss" scoped></style>
