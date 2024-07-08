import { withInstall, makeInstaller } from "../install";
import { describe, it, expect } from "vitest";
import { createApp, defineComponent } from "vue";
import { mount } from "@vue/test-utils";

const AppComp = defineComponent({
	name: "AppComp",
	setup() {
		return () => <div>AppComp</div>;
	},
});
const CompA = defineComponent({
	name: "CompA",
	setup() {
		return () => <div>CompA</div>;
	},
});
const ComB = defineComponent({
	name: "ComB",
	setup() {
		return () => <div>ComB</div>;
	},
});

describe("utils/install.ts", () => {
	it("withInstall should work", () => {
		const wrapper = mount(() => <div id="app"></div>);
		const app = createApp(AppComp);
		app.use(withInstall(CompA));
		app.use(withInstall(ComB));
		app.mount(wrapper.element);

		expect(wrapper.findComponent(CompA)).toBeTruthy();
		expect(wrapper.findComponent(ComB)).toBeTruthy();
	});

	it("makeInstall should work", () => {
		const wrapper = mount(() => <div id="app"></div>);
		const app = createApp(AppComp);
		const withInstallComA = withInstall(CompA);
		const withInstallComB = withInstall(ComB);
		const installer = makeInstaller([withInstallComA, withInstallComB]);

		app.use(installer);
		app.mount(wrapper.element);

		expect(wrapper.findComponent(CompA)).toBeTruthy();
		expect(wrapper.findComponent(ComB)).toBeTruthy();
	});
});
