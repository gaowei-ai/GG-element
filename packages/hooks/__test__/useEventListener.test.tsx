import { describe, it, expect, vi } from "vitest";

import useEventListener from "../useEventListener";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref, type Ref } from "vue";

describe("hooks/useEventListener", () => {
	it("should add and remove event listener when target is HTMLElement", async () => {
		const target = document.createElement("div");
		const handler = vi.fn();

		const wrapper = mount(
			defineComponent({
				setup() {
					useEventListener(target, "click", handler);
					return () => <div id="container">container</div>;
				},
			})
		);
		wrapper.get("#container").element.appendChild(target);

		await target.click();
		expect(handler).toHaveBeenCalled();
	});

	it("should add and remove event listener when target is RefHTMLElement", async () => {
		const target: Ref<HTMLElement | void> = ref();
		const handler = vi.fn();

		const wrapper = mount(
			defineComponent({
				setup() {
					useEventListener(target, "click", handler);
					return () => (
						<button id="container" ref={target}>
							target
						</button>
					);
				},
			})
		);

		await nextTick();
		await wrapper.get("#container").trigger("click");

		expect(handler).toHaveBeenCalledOnce();

		//更换value
		target.value = document.createElement("div");
		await document.getElementById("container")?.click();
		expect(handler).toHaveBeenCalledOnce();
	});
});
