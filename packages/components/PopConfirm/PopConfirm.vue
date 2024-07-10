<template>
	<gg-tooltip trigger="click" :hide-timeout="hideAfter" ref="tooltipRef">
		<template #content>
			<div class="gg-popconfirm" :style="style">
				<div class="gg-popconfirm__main">
					<gg-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor"></gg-icon>
					{{ title }}
				</div>
				<div class="gg-popconfirm__action">
					<gg-button
						class="gg-popconfirm__cancel"
						size="small"
						:type="cancelButtonType"
						@click="handleCancel"
					>
						{{ cancelButtonText }}
					</gg-button>
					<gg-button
						class="gg-popconfirm__confirm"
						size="small"
						:type="confirmButtonType"
						@click="handleConfirm"
					>
						{{ confirmButtonText }}
					</gg-button>
				</div>
			</div>
		</template>

		<template #default v-if="slots.default">
			<slot name="default"></slot>
		</template>

		<template #default v-if="slots.reference">
			<slot name="reference"></slot>
		</template>
	</gg-tooltip>
</template>

<script setup lang="ts">
	import { computed, ref, useSlots } from "vue";
	import { GgTooltip, type TooltipInstance } from "../Tooltip";
	import { GgIcon } from "../Icon";
	import { GgButton } from "../Button";
	import type { PopConfirmEmits, PopConfirmProps } from "./types";
	import { addUnit } from "@GG-element/utils/style";

	defineOptions({
		name: "GgPopConfirm",
	});

	const slots = useSlots();
	const tooltipRef = ref<TooltipInstance>();
	const props = withDefaults(defineProps<PopConfirmProps>(), {
		title: "",
		confirmButtonType: "primary",
		icon: "question-circle",
		iconColor: "#f90",
		hideAfter: 200,
		width: 150,
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
	});
	const emits = defineEmits<PopConfirmEmits>();

	const style = computed(() => ({
		width: addUnit(props.width),
	}));

	function hidePoper() {
		tooltipRef.value?.hide();
	}

	function handleCancel(e: MouseEvent) {
		emits("cancel", e);
		hidePoper();
	}

	function handleConfirm(e: MouseEvent) {
		emits("confirm", e);
		hidePoper();
	}
</script>
<style scoped>
	@import "./style.css";
</style>
