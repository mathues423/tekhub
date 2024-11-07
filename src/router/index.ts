import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaginaNotFaundView from '@/views/PaginaNotFaundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/404',
    name: 'PageNotFaund',
    component: PaginaNotFaundView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import ('@/views/DashboardView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: () => import ('@/views/EmpresasView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/empresas/0',
    name: 'empresas_criacao',
    component: () => import ('@/views/EmpresasNewView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/empresas/:id',
    name: 'empresas_edicao',
    component: () => import ('@/views/EmpresasEdicaoView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/canais',
    name: 'canais',
    component: () => import ('@/views/CanaisView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/ambientes',
    name: 'ambiente',
    component: () => import ('@/views/AmbienteView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/integracoesmarketplacesecommerces', 
    name: 'marketplaceecommerce',
    component: () => import ('@/views/MarketplaceEcommerceView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/mapeamentoprodutos',
    name: 'mapeamentoprodutos',
    component: () => import ('@/views/MapeamentoProdutoView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import ('@/views/UsuarioView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/atualizacoesecommerces',
    name: 'atualizacoesecommerces',
    component: () => import ('@/views/LogAtualizacaoView.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/logrequisicoes',
    name: 'logrequisicoes',
    component: () => import ('@/views/LogRequisicaoView.vue'),
    meta:{
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  //TO Onde eu vou
  //FROM Onde eu estava
  //NEXT Passa para a pagina 

  // ERRO 404
  if(routes.map((x) => x.name).indexOf(to.name) == -1){
    next({name:'PageNotFaund'}); //Fazer a pagina erro 404
  }
  
  next();
});

export default router
