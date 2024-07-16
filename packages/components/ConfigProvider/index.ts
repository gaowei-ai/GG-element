import { withInstall } from "@GG-element/utils";
import ConfigProvider from "./ConfigProvider.vue";

export const GgConfigProvider = withInstall(ConfigProvider);

export * from "./types";
export * from "./hooks";
