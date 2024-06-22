<script setup lang="ts">
	import Children from "./components/Children.vue";
</script>

<template>
	<gg-button type="success">13123</gg-button>
	<Children>
		<template #header>
			123
		</template>
		<span>content</span>
		<span>eqe</span>
	</Children>
</template>

<style scoped>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
