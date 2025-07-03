import "./assets/main.css";
// MAIN
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createPinia } from "pinia";

const app = createApp(App);

// instance pinia
const pinia = createPinia();

app.use(router);
// gunakan pinia di app
app.use(pinia);

app.mount("#app");
