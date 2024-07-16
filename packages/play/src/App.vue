<script setup lang="ts">
	import { ja, ko, en, zhCn, zhTw, GgConfigProvider, GgPopConfirm } from "GG-element";
	import { get } from "lodash-es";

	import { computed, ref } from "vue";

	const language = ref("zhTw");
	const langMap = {
		ja,
		ko,
		en,
		zhCn,
		zhTw,
	} as const;
	const locale = computed(() => get(langMap, language.value));
	const changelang = () => {
		const l = ["zhCn", "zhTw", "ko", "en", "ja"];
		language.value = l[(l.indexOf(language.value) + 1) % l.length];
	};
</script>
<template>
	<gg-button @click="changelang" type="info" style="margin-right: 20px">change language</gg-button>
	<gg-config-provider :locale="locale">
		<gg-pop-confirm title="Are you shure to delete this item?">
			<gg-button>Delete</gg-button>
		</gg-pop-confirm>
	</gg-config-provider>
</template>
