import "./services/firebase";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import "material-icons/iconfont/material-icons.css";
import { createPinia } from "pinia";
import '@sweetalert2/theme-borderless';

createApp(App).use(createPinia()).use(router).mount("#app");
