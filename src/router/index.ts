import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ContentView from "../views/ContentView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('@/views/ContentView.vue'),
    meta:{
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Proteção das rotas
// router.beforeEach(async (to, from, next) => {
//   if (true) {
//     next();
//   } else {
//     next({name:'home'});
//   }
// });

export default router
