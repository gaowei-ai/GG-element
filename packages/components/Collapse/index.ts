import { withInstall } from "@GG-element/utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

export const GgCollapse = withInstall(Collapse);
export const GgCollapseItem = withInstall(CollapseItem);
export * from "./types.ts";
