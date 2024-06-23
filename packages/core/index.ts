import { makeInstaller } from "@GG-element/utils";
import components from "./components";
import "@GG-element/theme/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas); //添加图标

// 使用插件
const installer = makeInstaller(components);

export * from "../components";

export default installer;
