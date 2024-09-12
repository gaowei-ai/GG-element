<template>
	<div
		class="gg-input"
		:class="{
			[`gg-input--${type}`]: type,
			[`gg-input--${size}`]: size,
			'is-disabled': isDisabled,
			'is-prepend': $slots.prepend,
			'is-append': $slots.append,
			'is-prefix': $slots.prefix,
			'is-suffix': $slots.suffix,
			'is-focus': isFocused,
		}"
	>
		<template v-if="type !== 'textarea'">
			<div class="gg-input__prepend" v-if="$slots.prepend">
				<slot name="prepend"></slot>
			</div>
			<div class="gg-input__wrapper">
				<span v-if="$slots.prefix" class="gg-input__prefix">
					<slot name="prefix"></slot>
				</span>
				<input
					class="gg-input__inner"
					ref="inputRef"
					:type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
					:id="useId().value"
					:disabled="isDisabled"
					:readonly="readonly"
					:autocomplete="autocomplete"
					:autofocus="autofocus"
					:placeholder="placeholder"
					v-bind="$attrs"
					v-model="innerValue"
					@input="handleInput"
					@focus="handleFocus"
					@blur="handleBlur"
					@change="handleChange"
				/>
				showPwdIcon--{{ showPwdIcon }}
				<span v-if="$slots.suffix || showClear || showPwdIcon" class="gg-input__suffix">
					<slot name="suffix"></slot>
					<gg-icon
						icon="circle-xmark"
						v-if="showClear"
						@click="clear"
						@mousedown.prevent="noop"
						class="gg-input__clear"
					></gg-icon>
					<gg-icon
						icon="eye"
						v-if="showPwdIcon && pwdVisible"
						@click="togglePwdVisible"
						class="gg-input__password"
					></gg-icon>
					<gg-icon
						icon="eye-slash"
						class="gg-input__password"
						v-if="showPwdIcon && !pwdVisible"
						@click="togglePwdVisible"
					></gg-icon>
				</span>
			</div>
		</template>
		<template v-else>
			<textarea
				class="gg-textarea__wrapper"
				ref="textareaRef"
				:id="useId().value"
				:disabled="isDisabled"
				:readonly="readonly"
				:autocomplete="autocomplete"
				:placeholder="placeholder"
				:autofocus="autofocus"
				:form="form"
				v-model="innerValue"
				v-bind="$attrs"
				@input="handleInput"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
			></textarea>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, shallowRef, nextTick, watch } from "vue";
	import type { InputInstance, InputProps } from "./types";
	import { useId, useFocusController } from "@GG-element/hooks";
	import { GgIcon } from "../Icon";
	import { each, noop } from "lodash-es";
	defineOptions({
		name: "GgInput",
		inheritAttrs: false, // 不继承attrs
	});
	const props = withDefaults(defineProps<InputProps>(), {
		type: "text",
		autocomplete: "off",
	});
	const emits = defineEmits();

	const inputRef = shallowRef<HTMLInputElement>();
	const textareaRef = shallowRef<HTMLTextAreaElement>();
	const _ref = computed(() => inputRef.value || textareaRef.value);

	const isDisabled = computed(() => props.disabled);
	const innerValue = ref(props.modelValue);

	const showClear = computed(
		() => props.clearable && !!innerValue.value && !isDisabled.value && isFocused.value
	);

	const pwdVisible = ref(false);
	const showPwdIcon = computed(
		() => props.type === "password" && props.showPassword && !isDisabled.value && !!innerValue.value
	);
	const togglePwdVisible = () => {
		pwdVisible.value = !pwdVisible.value;
	};

	const handleInput = () => {
		emits("update:modelValue", innerValue.value);
		emits("input", innerValue.value);
	};

	const handleChange = () => {
		emits("change", innerValue.value);
	};

	const { isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
		afterBlur() {
			// form 校验
		},
	});

	const clear: InputInstance["clear"] = () => {
		innerValue.value = "";
		each(["input", "change", "update:modelValue"], (key: string) => emits(key, ""));
		emits("clear");
	};
	const focus: InputInstance["focus"] = async function () {
		await nextTick();
		_ref.value?.focus();
	};

	const blur: InputInstance["blur"] = function () {
		_ref.value?.blur();
	};

	const select: InputInstance["select"] = function () {
		_ref.value?.select();
	};

	watch(
		() => props.modelValue,
		(val) => {
			innerValue.value = val;

			// 表单校验触发
		}
	);

	defineExpose<InputInstance>({
		ref: _ref,
		focus,
		blur,
		select,
		clear,
	});
</script>
<style scoped>
	@import "./style.css";
</style>
