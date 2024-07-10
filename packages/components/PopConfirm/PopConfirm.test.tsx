import { describe, it, expect, vi, beforeEach, test } from "vitest";
import { mount } from "@vue/test-utils";
import PopConfirm from "./PopConfirm.vue";
import { GgPopConfirm, type PopConfirmProps } from ".";
import { each, get } from "lodash-es";

describe("PopConfirm/index", () => {
	it("should be export", () => {
		expect(PopConfirm).toBeDefined();
	});

	it("withInstall work", () => {
		expect(GgPopConfirm.install).toBeDefined();
	});
});

describe("PopConfirm.vue", () => {
	const props = {
		title: "Test Title",
		confirmButtonText: "Confirm",
		cancelButtonText: "Cancel",
		confirmButtonType: "primary",
		cancelButtonType: "info",
		icon: "check-circle",
		iconColor: "green",
		hideIcon: false,
		hideAfter: 500,
		width: 200,
	} as PopConfirmProps;
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});

	it("should accept all props", () => {
		const wrapper = mount(PopConfirm, {
			props,
		});

		each(props, (value, key) => {
			expect(get(wrapper.props(), key)).toBe(value);
		});
	});

	it("should render slots", () => {
		const slotContent = "Default slot";
		const wrapper = mount(PopConfirm, {
			props,
			slots: {
				default: slotContent,
			},
		});

		expect(wrapper.text()).toBe(slotContent);
	});

	test("popconfirm test", async () => {
		const onConfirm = vi.fn();
		const onCancel = vi.fn();
		const wrapper = mount(() => {
			return (
				<div>
					<div id="outside"></div>
					<PopConfirm title="Test Title" hideIcon={true} onConfirm={onConfirm} onCancel={onCancel}>
						<button id="trigger"></button>
					</PopConfirm>
				</div>
			);
		});

		const triggerNode = wrapper.find("#trigger");
		triggerNode.trigger("click");
		await vi.runAllTimers();

		expect(wrapper.find(".gg-popconfirm").exists()).toBe(true);
		const confirmBtn = wrapper.find(".gg-popconfirm__confirm");
		expect(confirmBtn.exists()).toBe(true);
		confirmBtn.trigger("click");
		await vi.runAllTimers();
		expect(onConfirm).toBeCalled();

		triggerNode.trigger("click");
		await vi.runAllTimers();
		expect(wrapper.find(".gg-popconfirm").exists()).toBe(true);
		const cancelBtn = wrapper.find(".gg-popconfirm__cancel");
		expect(cancelBtn.exists()).toBe(true);
		cancelBtn.trigger("click");
		await vi.runAllTimers();
		expect(onCancel).toBeCalled();
	});
});
