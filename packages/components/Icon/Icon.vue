<template>
	<i class="gg-icon" :class="[`gg-icon-${props.type}`]" :style="customStyles" v-bind="$attrs">
		<font-awesome-icon v-bind="filterProps" />
	</i>
</template>

<script setup lang="ts">
	defineOptions({
		name: "GgIcon",
		inheritAttrs: false, // 不继承attrs
	});

	import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
	import type { IconProps } from "./types";
	import { computed } from "vue";
	import { omit } from "lodash-es";

	const props = defineProps<IconProps>();
	const filterProps = computed(() => omit(props, ["type", "color"])); // type color 是自己定义的 需去除
	const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>
<style scoped>
	@import "./style.css";
</style>
