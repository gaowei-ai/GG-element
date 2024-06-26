<script setup lang="ts">
	import { ref } from "vue";
	const value = ref([]);
	const handleChange = (...args: any) => {
		console.log(args);
		console.log(value.value);
	};
</script>

<template>
	<gg-button type="success" icon="search">13123</gg-button>
	<gg-icon icon="search"></gg-icon>
	<gg-collapse v-model="value" @change="handleChange">
		<gg-collapse-item name="1" title="第一项">12313213123</gg-collapse-item>
		<gg-collapse-item name="2" title="第2项">asdadSDsd </gg-collapse-item>
		<gg-collapse-item name="3" title="第3项">23asdaSD</gg-collapse-item>
	</gg-collapse>
</template>

<style scoped></style>
