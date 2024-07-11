import { withInstall } from "@GG-element/utils";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";

export const GgDropdown = withInstall(Dropdown);
export const GgDropdownItem = withInstall(DropdownItem);
export * from "./types.ts";
