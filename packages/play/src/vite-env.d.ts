/// <reference types="vite/client" />

import { GgInput } from "GG-element";
declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}

declare module "vue" {
	export interface ComponentCustomProperties {
		$message: Lod;
	}
	// export interface GlobalComponents {
	// 	GgInput: typeof GgInput;
	// }
}

export {};
