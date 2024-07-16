import { makeInstaller } from "./makeInstaller";
import components from "./components";
import "@GG-element/theme/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from "./printLogo";

printLogo();

library.add(fas); //添加图标

// 使用插件
const installer = makeInstaller(components);

export * from "@GG-element/components";
export * from "@GG-element/locale";

export default installer;
