import { isAuthenticated } from "@/utils";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pets",
    name: "Pets",
    component: () => import("../components/Pets.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (["Login", "Register"].indexOf((to as any).name) < 0) {
    if ((await isAuthenticated()) === false) {
      next({ path: "/login" });
      return;
    }
  }
  next();
});

export default router;
