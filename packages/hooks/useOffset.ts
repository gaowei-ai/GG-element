import { computed, type Ref } from "vue";

interface useOffsetOptions {
	boxHeight: Ref<number>;
	offset: number;
	getLastBottomOffset(): number;
}
interface UseOffsetResult {
	topOffset: Ref<number>;
	bottomOffset: Ref<number>;
}

export default function useOffset(options: useOffsetOptions): UseOffsetResult {
	const lastBottomOffset = computed(() => options.getLastBottomOffset());
	const topOffset = computed(() => {
		return options.offset + lastBottomOffset.value;
	});

	const bottomOffset = computed(() => topOffset.value + options.boxHeight.value);

	return {
		topOffset,
		bottomOffset,
	};
}
