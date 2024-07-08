import { describe, it, expect } from "vitest";
import { withInstall, makeInstaller, debugWarn, throwError, typeIconMap } from "../index";
import { each } from "lodash-es";

describe("utils/index", () => {
	it("withInstall show be export", () => {
		expect(withInstall).toBeDefined();
	});

	it("makeInstaller show be export", () => {
		expect(makeInstaller).toBeDefined();
	});

	it("debugWarn show be export", () => {
		expect(debugWarn).toBeDefined();
	});

	it("throwError show be export", () => {
		expect(throwError).toBeDefined();
	});

	it("typeIconMap show be worked", () => {
		expect(typeIconMap).toBeDefined();
		each(
			[
				["info", "circle-info"],
				["success", "check-circle"],
				["warning", "circle-exclamation"],
				["danger", "circle-xmark"],
				["error", "circle-xmark"],
			],
			([type, icon]) => {
				expect(typeIconMap.get(type)).toBe(icon);
			}
		);
	});
});
