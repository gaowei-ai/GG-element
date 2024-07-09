import { describe, it, expect } from "vitest";

import { useEventListener, useClickOutside } from "../index";

describe("hooks/index.ts", () => {
	it("should be defined", () => {
		expect(useEventListener).toBeDefined();
		expect(useClickOutside).toBeDefined();
	});
});
