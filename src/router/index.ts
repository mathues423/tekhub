import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PaginaNotFaundView from '@/views/PaginaNotFaundView.vue'
import EmpresasView from '@/views/EmpresasView.vue'
import CanaisView from '@/views/CanaisView.vue'
import AmbienteView from '@/views/AmbienteView.vue'
import MarketplaceEcommerceView from '@/views/MarketplaceEcommerceView.vue'
import MapeamentoProdutoView from '@/views/MapeamentoProdutoView.vue'
import UsuarioView from '@/views/UsuarioView.vue'
import LogAtualizacaoView from '@/views/LogAtualizacaoView.vue'
import LogRequisicaoView from '@/views/LogRequisicaoView.vue'

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
    component: DashboardView,
    meta:{
      auth: true
    }
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: EmpresasView,
    meta:{
      auth: true
    }
  },
  {
    path: '/canais',
    name: 'canais',
    component: CanaisView,
    meta:{
      auth: true
    }
  },
  {
    path: '/ambiente',
    name: 'ambiente',
    component: AmbienteView,
    meta:{
      auth: true
    }
  },
  {
    path: '/marketplaceecommerce',
    name: 'marketplaceecommerce',
    component: MarketplaceEcommerceView,
    meta:{
      auth: true
    }
  },
  {
    path: '/mapeamentoprodutos',
    name: 'mapeamentoprodutos',
    component: MapeamentoProdutoView,
    meta:{
      auth: true
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: UsuarioView,
    meta:{
      auth: true
    }
  },
  {
    path: '/atualizacao',
    name: 'atualizacao',
    component: LogAtualizacaoView,
    meta:{
      auth: true
    }
  },
  {
    path: '/requisicao',
    name: 'requisicao',
    component: LogRequisicaoView,
    meta:{
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Proteção das rotas
router.beforeEach(async (to, from, next) => {
  // console.log('to:  ', to); // TO Onde eu vou
  // console.log('from:  ', from); //FROM Onde eu estava
  // console.log('next:  ', next); //NEXT Passa para a pagina 

  // ERRO 404
  if(routes.map((x) => x.path).indexOf(to.path) == -1){
    next({name:'PageNotFaund'}); //Fazer a pagina erro 404
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
