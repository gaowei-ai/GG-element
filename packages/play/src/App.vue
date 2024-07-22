<template>
	<button @click="handleClick('info')">info</button>
	<button @click="handleClick('success')">success</button>
	<button @click="handleClick('warning')">warning</button>
	<button @click="handleClick('danger')">danger</button>
	<button @click="handleClick('error')">error</button>
</template>

<script setup lang="ts">
	import { GgMessage, type MessageType } from "GG-element";
	const handleClick = (type: MessageType) => {
		GgMessage({
			type: type,
			message: "hello",
			// duration: 0,
			showClose: true,
		});
		GgMessage.error!("success");
	};
</script>
<style lang="scss" scoped></style>
