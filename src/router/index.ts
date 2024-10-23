import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContentView from '@/views/ContentView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
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
router.beforeEach(async (to, from, next) => {
  // console.log('to:  ', to); // Onde eu vou
  // console.log('from:  ', from); //Onde eu estava
  // console.log('next:  ', next); //Passa para a pagina 

  // ERRO 404
  if(routes.map((x) => x.path).indexOf(to.path) == -1){
    next({name:'home'}); //Fazer a pagina erro 404
  }
  
  next();
  
  // // eslint-disable-next-line
  // if (true) {
  //   next();
  // } else {
  //   next({name:'home'}); //ERRO 401
  // }
});

export default router
