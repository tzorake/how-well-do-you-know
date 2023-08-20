import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/level-view/:id", component: () => import("@/views/LevelView.vue") },
  { path: "/next-level/:id", component: () => import("@/views/NextView.vue") },
  { path: "/about", component: () => import("@/views/AboutView.vue") },
  { path: "/contact", component: () => import("@/views/ContactView.vue") },
  { path: "/share", component: () => import("@/views/ShareView.vue") },
  { path: "/diamond", component: () => import("@/views/DiamondView.vue") },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => {
      return { path: "/level-view/1" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
