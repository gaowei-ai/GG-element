import { makeInstaller } from "@GG-element/utils";
import components from "./components";
import "@GG-element/theme/index.css";

// 使用插件
const installer = makeInstaller(components);

export * from "./components";

export default installer;
