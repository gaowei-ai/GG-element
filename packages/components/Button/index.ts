import { withInstall } from "@GG-element/utils";
import Button from "./Button.vue";
import BUttonGroup from "./ButtonGroup.vue";

export const GgButton = withInstall(Button);
export const GgButtonGroup = withInstall(BUttonGroup);
export * from "./types.ts";
