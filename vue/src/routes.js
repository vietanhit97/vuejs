import { createRouter, createWebHistory } from "vue-router";
import Home from "./page/Home.vue";
import About from "./page/About.vue";
import Detail from "./page/Detail.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Detail },
  { path: "/Home", component: Home },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
