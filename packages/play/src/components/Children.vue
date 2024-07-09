<template>
	<div>{{ msg }}</div>
	<hr />
	插槽：
	<div>
		<div>header:<slot name="header"></slot></div>
		<div>default:<slot></slot></div>
		<div>footer:<slot name="footer"></slot></div>
	</div>
</template>

<script setup lang="ts">
	const props = withDefaults(defineProps<{ msg: string }>(), {
		msg: "children",
	});

	console.log(props.msg);
</script>
<style lang="scss" scoped></style>
