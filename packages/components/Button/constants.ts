import type { InjectionKey } from 'vue';
import type { ButtonGroupCtx } from './types';

export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupCtx> =
  Symbol('ButtonGroupCtx');
