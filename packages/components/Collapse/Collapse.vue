<template>
	<div class="gg-collapse">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
	import { provide, ref, watch, watchEffect } from "vue";
	import { COLLAPSE_CTX_KEY } from "./constants";
	import { debugWarn } from "@GG-element/utils/error";

	const COMP_NAME = "GgCollapse";
	defineOptions({
		name: COMP_NAME,
	});
	const props = defineProps<CollapseProps>();
	const emits = defineEmits<CollapseEmits>();

	const handleItemClick = (name: CollapseItemName) => {
		let _activeNames = [...activeNames.value];

		// 手风琴模式
		if (props.accordion) {
			_activeNames = [_activeNames[0] === name ? "" : name];
			updateActives(_activeNames);
			return;
		}

		// 非手风琴模式
		const index = _activeNames.indexOf(name);
		if (index > -1) {
			//存在 删除
			_activeNames.splice(index, 1);
		} else {
			_activeNames.push(name);
		}
		updateActives(_activeNames);
		console.log(name);
	};

	const activeNames = ref<CollapseItemName[]>(props.modelValue);

	const updateActives = (val: CollapseItemName[]) => {
		activeNames.value = val;
		emits("update:modelValue", val);
		emits("change", val);
	};

	watchEffect(() => {
		if (props.accordion && activeNames?.value?.length > 1) {
			debugWarn(COMP_NAME, "不支持手风琴模式下，同时存在多个折叠面板");
		}
	});

	watch(
		() => props.modelValue,
		(newVal) => updateActives(newVal)
	);

	provide(COLLAPSE_CTX_KEY, {
		activeNames,
		handleItemClick,
	});
</script>

<style scoped>
	@import "./style.css";
</style>
