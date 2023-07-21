import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes.js";
import { ErrorMessage, Field, Form } from "vee-validate";
const app = createApp(App);
app.component("FormInput", Field);
app.component("FormWrapper", Form);
app.component("ErrorMessages", ErrorMessage);

// Sử dụng router và gắn ứng dụng Vue vào #app
app.use(router).mount("#app");
