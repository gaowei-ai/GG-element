<template>
	<div class="gg-dropdown" :class="{ 'is-disabled': props.disabled }">
		<gg-tooltip
			v-bind="toolTipProps"
			ref="tooltipRef"
			:virtual-triggering="splitButton"
			:virtual-ref="virtualRef"
			@visible-change="$emit('visible-change', $event)"
		>
			<gg-button-group v-if="splitButton" :type="type" :size="size" :disabled="disabled">
				<gg-button @click="$emit('click', $event)">
					<slot name="default"></slot>
				</gg-button>
				<gg-button icon="angle-down" ref="triggerRef"> </gg-button>
			</gg-button-group>
			<slot name="default" v-else></slot>

			<template #content>
				<div class="gg-dropdown__menu">
					<slot name="dropdown">
						<template v-for="item in items" :key="item.command">
							<dropdown-item v-bind="item"></dropdown-item>
						</template>
					</slot>
				</div>
			</template>
		</gg-tooltip>
	</div>
</template>

<script setup lang="ts">
	import { GgTooltip, type TooltipInstance } from "../Tooltip";
	import { GgButton, GgButtonGroup, type ButtonInstance } from "../Button";
	import DropdownItem from "./DropdownItem.vue";
	import type { DropdownEmits, DropdownInstance, DropdownItemProps, DropdownProps } from "./types";
	import { computed, provide, ref } from "vue";
	import { isNil, omit } from "lodash-es";
	import { DROPDOWN_CTX_KEY } from "./constants";
	// import { useDisabledStyle } from "@GG-element/hooks";

	defineOptions({
		name: "GgDropdown",
	});
	const props = withDefaults(defineProps<DropdownProps>(), {
		type: "primary",
		size: "default",
		hideOnClick: true,
		splitButton: false,
		items: () => [] as DropdownItemProps[],
	});
	const emit = defineEmits<DropdownEmits>();

	const toolTipProps = computed(() =>
		omit(props, ["type", "size", "splitButton", "items", "hideOnClick"])
	);
	const tooltipRef = ref<TooltipInstance>();
	const triggerRef = ref<ButtonInstance>();
	const virtualRef = computed(() => {
		return (triggerRef.value?.ref as unknown as HTMLElement) ?? void 0;
	});

	function handleItemClick(item: DropdownItemProps) {
		props.hideOnClick && tooltipRef.value?.hide();
		!isNil(item.command) && emit("command", item.command);
	}

	provide(DROPDOWN_CTX_KEY, {
		handleItemClick,
		size: computed(() => props.size),
	});

	defineExpose<DropdownInstance>({
		open: () => tooltipRef.value?.show(),
		close: () => tooltipRef.value?.hide(),
	});

	// useDisabledStyle();
</script>
<style scoped>
	@import "./style.css";
	:deep(.gg-button-group) {
		& > :last-child {
			padding: 5px 7px;
		}
	}
</style>
