import { createApp } from "vue";
import App from "./App.vue";
import GGElement from "GG-element";
import "GG-element/dist/index.css"; // 发布包的时候打开

createApp(App).use(GGElement).mount("#app");
