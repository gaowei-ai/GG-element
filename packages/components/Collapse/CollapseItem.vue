<template>
	<div
		class="gg-collapse-item"
		:class="{
			'is-disabled': disabled,
		}"
	>
		<div
			class="gg-collapse-item__header"
			:id="`item-header-${name}`"
			:class="{
				'is-disabled': disabled,
				'is-active': isActive,
			}"
			@click="handleClick"
		>
			<span class="gg-collapse-item__title">
				<slot name="title">
					{{ title }}
				</slot>
			</span>
			<gg-icon icon="angle-right" class="header-angle" />
		</div>
		<transition name="slide" v-on="transitionEvents">
			<div class="er-collapse-item__wapper" v-show="isActive">
				<div class="er-collapse-item__content" :id="`item-content-${name}`">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
	import type { CollapseItemProps } from "./types";
	import { COLLAPSE_CTX_KEY } from "./constants";
	import { inject, computed } from "vue";
	import { GgIcon } from "../Icon";
	import transitionEvents from "./transitionEvents.ts";

	defineOptions({
		name: "GgCollapseItem",
	});

	const ctx = inject(COLLAPSE_CTX_KEY, void 0);
	const props = defineProps<CollapseItemProps>();

	const isActive = computed(() => ctx?.activeNames?.value?.includes(props.name));

	const handleClick = () => {
		if (props.disabled) return;
		ctx?.handleItemClick(props.name);
	};
</script>
<style scoped>
	@import "./style.css";
</style>
