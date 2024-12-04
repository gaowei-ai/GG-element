<template>
	<gg-button @click="handleClick">messageBox</gg-button>
</template>

<script setup lang="ts">
	import { GgMessageBox } from "GG-element";

	const handleClick = () => {
		GgMessageBox.alert("messageBox");
	};
</script>
<style lang="scss" scoped></style>
