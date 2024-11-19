<template>
	<transition name="fade-in-linear">
		<gg-overlay mask v-show="(visible as Ref).value" :z-index="state.zIndex">
			<div role="dialog" class="gg-overlay-message-box" @click="handleWrapperClick">
				<div
					ref="rootRef"
					:class="[
						'gg-message-box',
						{
							'is-center': state.center,
						},
					]"
					@click.stop
				>
					<div
						v-if="!isNil(state.title)"
						ref="headerRef"
						class="gg-message-box__header"
						:class="{ 'show-close': state.showClose }"
					>
						<div class="gg-message-box__title">
							<gg-icon
								v-if="iconComponent && state.center"
								:class="{
									[`gg-icon-${state.type}`]: state.type,
								}"
								:icon="iconComponent"
							/>
							{{ state.title }}
						</div>
						<button v-if="showClose" class="gg-message-box__header-btn" @click.stop="handleClose">
							<gg-icon icon="xmark" />
						</button>
					</div>
					<div class="gg-message-box__content">
						<gg-icon
							v-if="iconComponent && !state.center && hasMessage"
							:class="{
								[`gg-icon-${state.type}`]: state.type,
							}"
							:icon="iconComponent"
						/>
						<div v-if="hasMessage" class="gg-message-box__message">
							<slot>
								<component
									:is="state.showInput ? 'label' : 'p'"
									:for="state.showInput ? inputId : void 0"
								>
									{{ state.message }}
								</component>
							</slot>
						</div>
					</div>
					<div v-show="state.showInput" class="gg-message-box__input">
						<gg-input
							v-model="state.inputValue"
							ref="inputRef"
							:placeholder="state.inputPlaceholder"
							:type="state.inputType"
							@keyup.enter="handleInputEnter"
						/>
					</div>
					<div class="gg-message-box__footer">
						<gg-button
							v-if="state.showCancelButton"
							class="gg-message-box__footer-btn gg-message-box__cancel-btn"
							:type="state.cancelButtonType"
							:round="state.roundButton"
							:loading="state.cancelButtonLoading"
							@click="handleAction('cancel')"
							@keydown.prevent.enter="handleAction('cancel')"
							>{{ state.cancelButtonText }}</gg-button
						>
						<gg-button
							v-show="state.showConfirmButton"
							class="gg-message-box__footer-btn gg-message-box__confirm-btn"
							:type="state.confirmButtonType ?? 'primary'"
							:round="state.roundButton"
							:loading="state.confirmButtonLoading"
							@click="handleAction('confirm')"
							@keydown.prevent.enter="handleAction('confirm')"
							>{{ state.confirmButtonText }}</gg-button
						>
					</div>
				</div>
			</div>
		</gg-overlay>
	</transition>
</template>

<script setup lang="ts">
	import { ref, reactive, type Ref, computed, nextTick, watch } from "vue";
	import GgOverlay from "../Overlay/Overlay.vue";
	import type { MessageBoxAction, MessageBoxProps } from "./types";
	import { useId, useZIndex } from "@GG-element/hooks";
	import type { InputInstance } from "../Input";
	import { isFunction, isNil } from "lodash-es";

	import { GgIcon } from "../Icon";
	import { GgInput } from "../Input";
	import { GgButton } from "../Button";
	import { typeIconMap } from "@GG-element/utils";

	defineOptions({
		name: "GgMessageBox",
		inheritAttrs: false,
	});
	const props = withDefaults(defineProps<MessageBoxProps>(), {
		lockScroll: true,
		showClose: true,
		closeOnClickModal: true,
		confirmButtonType: "primary",
		roundButton: false,
		boxType: "",
		inputValue: "",
		inputPlaceholder: "Please input...",
		confirmButtonText: "Ok",
		cancelButtonText: "Cancel",
		showConfirmButton: true,
	});

	const { doAction } = props;
	const headerRef = ref<HTMLElement>();
	const inputRef = ref<InputInstance>();
	const inputId = useId();

	const { nextZIndex } = useZIndex();
	const state = reactive({
		...props,
		zIndex: nextZIndex(),
	});

	const hasMessage = computed(() => !!state.message);

	const iconComponent = computed(() => state.icon ?? typeIconMap.get(state.type ?? ""));

	const handleAction = (action: MessageBoxAction) => {
		isFunction(props.beforeClose)
			? props.beforeClose(action, state, () => doAction(action, state.inputValue))
			: doAction(action, state.inputValue);
	};
	const handleWrapperClick = () => {
		props.closeOnClickModal && handleAction("close");
	};

	const handleClose = () => {
		handleAction("close");
	};

	function handleInputEnter(e: KeyboardEvent) {
		if (state.inputType === "textarea") return;
		e.preventDefault();
		return handleAction("confirm");
	}

	watch(
		() => props.visible?.value,
		(val) => {
			if (val) state.zIndex = nextZIndex();
			if (props.boxType !== "prompt") return;
			if (!val) return;

			nextTick(() => {
				inputRef.value && inputRef.value?.focus();
			});
		}
	);
</script>
<style scoped>
	@import "./style.css";
</style>
