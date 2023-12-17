import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/views/Level/LevelView.vue") },
  { path: "/next-level", component: () => import("@/views/Next/NextView.vue") },
  { path: "/about", component: () => import("@/views/About/AboutView.vue") },
  { path: "/share", component: () => import("@/views/Share/ShareView.vue") },
  { path: "/diamond", component: () => import("@/views/Diamond/DiamondView.vue") },
  { path: "/levels", component: () => import("@/views/LevelListView/LevelListView.vue") },
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
