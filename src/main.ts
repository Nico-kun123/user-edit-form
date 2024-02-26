import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./routes/index";
import VuelidatePlugin from "@vuelidate/core";

import "goodt-framework-css/src/_all.less";
import "./assets/less/style.less";

createApp(App).use(VuelidatePlugin).use(router).mount("#app");
