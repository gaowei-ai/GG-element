import type { ComputedRef, VNode } from "vue";
import type { ButtonSize, ButtonType } from "../Button";
import type { TooltipProps } from "../Tooltip";

export interface DropdownItemProps {
	command?: string | number;
	label: string | VNode;
	disabled?: boolean;
	/**
	 * 是否分割线
	 */
	divided?: boolean;
}
export interface DropdownProps extends TooltipProps {
	type?: ButtonType;
	size?: ButtonSize;
	/**
	 * 点击外部是否关闭tooltip
	 */
	hideOnClick?: boolean;
	splitButton?: boolean;
	items?: DropdownItemProps[];
}

export interface DropdownEmits {
	(e: "click", event: MouseEvent): void;
	(e: "command", command: string | number): void;
	(e: "visible-change", visible: boolean): void;
}

export interface DropdownInstance {
	open: () => void;
	close: () => void;
}

export interface DropdownContext {
	handleItemClick(item: DropdownItemProps): void;
	size: ComputedRef<ButtonSize | void>;
}
