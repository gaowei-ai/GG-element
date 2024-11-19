import { createApp } from "vue";
import App from "./App.vue";
import GGElement from "GG-element";
// import GGElement, { GgMessage } from "GG-element";
import "GG-element/dist/index.css"; // 发布包的时候打开

const app = createApp(App);
app.use(GGElement);
// app.use(GgMessage);
app.mount("#app");
