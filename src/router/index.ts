import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/views/LevelView.vue") },
  { path: "/next-level", component: () => import("@/views/NextView.vue") },
  { path: "/about", component: () => import("@/views/AboutView.vue") },
  { path: "/contact", component: () => import("@/views/ContactView.vue") },
  { path: "/share", component: () => import("@/views/ShareView.vue") },
  { path: "/diamond", component: () => import("@/views/DiamondView.vue") },
  { path: "/levels", component: () => import("@/views/LevelListView.vue") },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => {
      return { path: "/" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
