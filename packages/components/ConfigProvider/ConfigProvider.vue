<template>
	<slot name="default" :config="config"></slot>
</template>

<script setup lang="ts">
	import type { ConfigProviderProps } from "./types";
	import { provideGlobalConfig } from "./hooks";

	defineOptions({
		name: "GgConfigProvider",
	});
	const props = defineProps<ConfigProviderProps>();

	const config = provideGlobalConfig(props);
</script>
<style lang="scss" scoped></style>
