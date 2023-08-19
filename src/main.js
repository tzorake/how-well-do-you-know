import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LevelView from './components/LevelView.vue';
import NextLevel from "./components/NextLevel.vue";

const routes = [
  { path: '/', redirect: '/level-view' },
  { path: '/level-view', redirect: '/level-view/1' },
  { path: '/level-view/:id', component: LevelView },
  { path: '/next-level/:id', component: NextLevel },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
