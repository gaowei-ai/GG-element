import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";

import Dropdown from "./Dropdown.vue";
import { GgDropdown, GgDropdownItem } from ".";
import DropdownItem from "./DropdownItem.vue";
import type { DropdownItemProps } from "./types";

describe("Dropdown/index", () => {
	it("should be export", () => {
		expect(Dropdown).toBeDefined();
		expect(DropdownItem).toBeDefined();
	});
	it("withInstall work", () => {
		expect(GgDropdown.install).toBeDefined();
		expect(GgDropdownItem.install).toBeDefined();
	});
});

describe("Dropdown.vue", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});

	it("should render slots", () => {
		const items: DropdownItemProps[] = [
			{ label: "Item 1", command: 1 },
			{ label: "Item 2", command: 2 },
		];
		const wrapper = mount(Dropdown, {
			slots: {
				default: () => <div>Default slots</div>,
				dropdown: () => items.map((item) => <DropdownItem v-bind={item}></DropdownItem>),
			},
		});

		expect(wrapper.text()).toContain("Default slots");
		expect(wrapper.find(".gg-dropdown").exists()).toBeTruthy();
	});

	it("should emit command event when item is clicked", async () => {
		const onCommand = vi.fn();
		const items: DropdownItemProps[] = [
			{ label: "Item 1", disabled: true },
			{ label: "Item 2", command: "item2", divided: true },
		];
		const wrapper = mount(Dropdown, {
			props: {
				trigger: "click",
				items,
				onCommand,
			},
			slots: {
				default: () => <div id="trigger">Default slots</div>,
			},
		});
		const triggerNode = wrapper.find("#trigger");
		expect(triggerNode.exists()).toBeTruthy();
		triggerNode.trigger("click");
		await vi.runAllTimers();

		expect(wrapper.find(".gg-dropdown__menu").exists()).toBeTruthy();

		// 点击分割线
		await wrapper.findAll("li").at(0)?.trigger("click");
		expect(onCommand).toBeCalledTimes(0); //disabled

		await wrapper.findAll("li").at(2)?.trigger("click");
		expect(onCommand).toBeCalled();
		expect(onCommand).toBeCalledWith("item2");
	});

	it("should toggle visibility when split btn is clicked", async () => {
		const onClick = vi.fn();
		const items: DropdownItemProps[] = [
			{ label: "Item 1", disabled: true },
			{ label: "Item 2", command: "item2", divided: true },
		];
		const wrapper = mount(Dropdown, {
			props: {
				trigger: "click",
				items,
				onClick,
				splitButton: true,
			},
			slots: {
				default: () => <div id="trigger">Default slots</div>,
			},
		});
		const triggerArea = wrapper.find("#trigger");
		expect(triggerArea.exists()).toBeTruthy();
		triggerArea.trigger("click");
		await vi.runAllTimers();

		expect(wrapper.find(".gg-dropdown__menu").exists()).toBeFalsy();
		expect(onClick).toBeCalled();
	});
});
