import type { ArgTypes, StoryObj, Meta } from "@storybook/vue3";

import { GgCollapse, GgCollapseItem } from "GG-element";
import "GG-element/dist/theme/Collapse.css";

type Story = StoryObj<typeof GgCollapse> & { argTypes?: ArgTypes };

const meta: Meta<typeof GgCollapse> = {
	title: "Example/Collapse",
	component: GgCollapse,
	subcomponents: { GgCollapseItem },
	tags: ["autodocs"], // 用于 storybook 的自动文档
};

export const Default: Story = {
	args: {
		accordion: true,
		modelValue: ["a"],
	},
	render: (args) => ({
		components: { GgCollapse, GgCollapseItem },

		setup() {
			return { args };
		},

		template: `
    <gg-collapse v-bind="args">
      <gg-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </gg-collapse-item>
      <gg-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </gg-collapse-item>
      <gg-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </gg-collapse-item>
    </gg-collapse>
    `,
	}),
};

export default meta;
