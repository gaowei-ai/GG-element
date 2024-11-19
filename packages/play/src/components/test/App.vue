<template>
	<div><gg-input type="password" v-model="value" show-password></gg-input>:{{ value }}</div>
	<div><gg-input type="textarea" v-model="value"></gg-input>:{{ value }}</div>
	<gg-button @click="handleClick">adada</gg-button>
	<Children />
</template>

<script setup lang="ts">
	import { GgInput, GgMessage } from "GG-element";
	import { getCurrentInstance, ref } from "vue";
	import Children from "./components/Children.vue";
	console.log("children", Children);
	const value = ref("sds");
	const app = getCurrentInstance();

	const handleClick = () => {
		GgMessage({
			message: "hello",
			type: "success",
		});
		app?.proxy?.$message("hehehe");
	};
</script>
<style lang="scss" scoped></style>
