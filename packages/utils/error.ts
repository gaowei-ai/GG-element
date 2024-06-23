import { isString } from "lodash-es";

class GgError extends Error {
	constructor(mes: string) {
		super(mes);
		this.name = "GgError";
	}
}

export function throwError(scope: string, mes: string) {
	throw new Error(`[${scope}]: ${mes}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
	if (process.env.NODE_ENV !== "production") {
		const err = isString(scope) ? new GgError(`[${scope}] ${msg}`) : scope;
		console.warn(err);
	}
}
