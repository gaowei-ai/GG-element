import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3";
import { fn } from "@storybook/test";
import { GgTooltip } from "GG-element";
import "GG-element/dist/theme/Tooltip.css";

type Story = StoryObj<typeof GgTooltip> & { argTypes?: ArgTypes };

const meta: Meta<typeof GgTooltip> = {
	title: "Example/Tooltip",
	component: GgTooltip,
	tags: ["autodocs"],
	argTypes: {
		trigger: {
			options: ["hover", "click", "contextmenu"],
			control: {
				type: "select",
			},
		},
		placement: {
			options: ["top", "bottom", "left", "right"],
			control: {
				type: "select",
			},
		},
		hideTimeout: {
			control: "number",
		},
	},
	args: {
		"onVisible-change": fn(),
	},
};

export const Default: Story = {
	args: {
		content: "This is a tooltip",
		placement: "top",
		trigger: "hover",
		hideTimeout: 0,
	},
	render: (args) => ({
		components: { GgTooltip },
		setup() {
			return {
				args,
			};
		},
		template: '<gg-tooltip v-bind="args"><button>hover me</button></gg-tooltip>',
	}),
};
export default meta;
