<template>
	<div class="gg-button-group">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import { reactive, provide, toRef } from "vue";
	import type { ButtonGroupProps } from "./types";
	import { BUTTON_GROUP_CTX_KEY } from "./constants";
	defineOptions({
		name: "GgButtonGroup",
	});

	const props = defineProps<ButtonGroupProps>();

	//提供给button组件 属性封装成响应式
	provide(
		BUTTON_GROUP_CTX_KEY,
		reactive({
			size: toRef(props, "size"),
			type: toRef(props, "type"),
			disabled: toRef(props, "disabled"),
		})
	);
</script>
<style scoped>
	@import "./style.css";
</style>
