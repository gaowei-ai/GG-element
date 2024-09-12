import { GgInput } from "GG-element";

declare module "vue" {
	// GlobalComponents for Volar
	export interface GlobalComponents {
		GgInput: typeof GgInput;
	}
}

export {};
