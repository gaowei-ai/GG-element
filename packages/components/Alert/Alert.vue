<template>
	<transition name="gg-alert-fade">
		<div
			v-show="visible"
			class="gg-alert"
			role="alert"
			:class="{
				[`gg-alert__${type}`]: type,
				[`gg-alert__${effect}`]: effect,
				'text-center': center,
			}"
		>
			<gg-icon
				v-if="showIcon"
				class="gg-alert__icon"
				:class="{ 'big-icon': withDescription }"
				:icon="iconName"
			/>
			<div class="gg-alert__content">
				<span
					class="gg-alert__title"
					:class="{ 'with-desc': withDescription }"
					:style="{ display: center && !showIcon ? 'flow' : 'inline' }"
				>
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="gg-alert__description">
					<slot>{{ description }}</slot>
				</p>
				<div class="gg-alert__close" v-if="closable">
					<gg-icon @click.stop="close" icon="xmark" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import { computed, ref, useSlots } from "vue";
	import type { AlertEmits, AlertInstance, AlertProps } from "./types";
	import { typeIconMap } from "@GG-element/utils";
	import GgIcon from "../Icon/Icon.vue";

	defineOptions({
		name: "GgAlert",
	});

	const props = withDefaults(defineProps<AlertProps>(), {
		effect: "light",
		type: "info",
		closable: true,
	});
	const emits = defineEmits<AlertEmits>();
	const slots = useSlots();

	const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
	const withDescription = computed(() => props.description ?? slots.default);

	const visible = ref(true);

	const close = () => {
		visible.value = false;
		emits("close");
	};

	const open = () => {
		visible.value = true;
	};

	defineExpose<AlertInstance>({
		open,
		close,
	});
</script>
<style scoped>
	@import "./style.css";
</style>
