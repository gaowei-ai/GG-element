import type { Component, Ref } from 'vue';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'default' | 'large';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  loadingIcon?: string;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}

export interface ButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

export interface ButtonGroupCtx {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}
