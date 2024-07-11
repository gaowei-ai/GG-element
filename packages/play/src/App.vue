<script setup lang="ts">
	import { ref, useSlots } from "vue";
	const value = ref([]);
	const handleChange = (...args: any) => {
		console.log(args);
		console.log(value.value);
	};

	function handleConfirm(e: any) {
		console.log("confirm", e);
	}
	function handleCancel(e: any) {
		console.log("cancel", e);
	}

	const item = ref([
		{
			command: 1,
			label: "command1",
			// disabled: true,
		},
		{
			command: 2,
			label: "command2",
		},
	]);

	function handleCommand(item: any) {
		console.log(item);
	}
	function handleClick() {
		console.log("click");
	}

	import Children from "./components/Children.vue";
</script>

<template>
	<!-- <gg-button type="success" icon="search">13123</gg-button>
	<gg-icon icon="search"></gg-icon>
	<gg-collapse v-model="value" @change="handleChange">
		<gg-collapse-item name="1" title="第一项">12313213123</gg-collapse-item>
		<gg-collapse-item name="2" title="第2项">asdadSDsd </gg-collapse-item>
		<gg-collapse-item name="3" title="第3项">23asdaSD</gg-collapse-item>
	</gg-collapse> -->

	<!-- <gg-icon icon="search" color="red" type="success"></gg-icon>
	<gg-popConfirm title="popConfirm" @confirm="handleConfirm" @cancel="handleCancel" width="300">
		<button>13131</button>
	</gg-popConfirm> -->

	<!-- <gg-dropdown
		:items="item"
		@command="handleCommand"
		:splitButton="true"
		@click="handleClick"
		disabled
	>
		<span>12213</span>
	</gg-dropdown> -->

	<gg-dropdown :items="item" :disabled="true">
		<span> Dropdown List GG </span>
	</gg-dropdown>
	<Children>children</Children>
</template>

<style scoped></style>
