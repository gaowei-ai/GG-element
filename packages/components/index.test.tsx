import { describe, it, expect } from "vitest";
import { GgAlert, GgButton, GgButtonGroup, GgCollapse, GgCollapseItem } from "./index.ts";
import type { Plugin } from "vue";
import { get, map } from "lodash-es";

const components = [GgAlert, GgButton, GgButtonGroup, GgCollapse, GgCollapseItem] as Plugin[];
describe("components/index.ts", () => {
	it.each(map(components, (c) => [get(c, "name") ?? "", c]))(
		"%s should be exported",
		(_, component) => {
			expect(component).toBeDefined();
			expect(component.install).toBeDefined();
		}
	);
});
