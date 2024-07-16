<template>
	<div>{{ msg }}</div>
	<div>国际化:{{ t("popconfirm.confirmButtonText") }}</div>
	<hr />
	插槽：
	<div>
		<div>header:<slot name="header"></slot></div>
		<div>default:<slot></slot></div>
		<div>footer:<slot name="footer"></slot></div>
	</div>
</template>

<script setup lang="ts">
	import { useLocale } from "@GG-element/hooks";

	const props = withDefaults(defineProps<{ msg: string }>(), {
		msg: "children",
	});

	const { t } = useLocale();
	useLocale;

	console.log(props.msg);
</script>
<style lang="scss" scoped></style>
