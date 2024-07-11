<template>
	<li v-if="divided" role="separator" class="divided-placeholder"></li>
	<li
		:id="`dropdown-item-${command}`"
		:class="{
			'gg-dropdown__item': true,
			['gg-dropdown__item--' + size]: size,
			'is-disabled': disabled,
			'is-divided': divided,
		}"
		@click="handleClick"
	>
		<slot>
			{{ label }}
		</slot>
	</li>
</template>

<script setup lang="ts">
	import { inject, computed } from "vue";
	import type { DropdownItemProps } from "./types";
	import { DROPDOWN_CTX_KEY } from "./constants";
	import { useId } from "@GG-element/hooks";
	defineOptions({
		name: "GgDropdownItem",
	});
	const ctx = inject(DROPDOWN_CTX_KEY, void 0);

	const props = withDefaults(defineProps<DropdownItemProps>(), {
		disabled: false,
		divided: false,
		command: useId().value,
	});
	const emit = defineEmits();
	const size = computed(() => ctx?.size);

	function handleClick() {
		if (props.disabled) return;
		ctx?.handleItemClick(props);
	}
</script>
<style scoped>
	@import "./style.css";
</style>
