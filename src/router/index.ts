import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { APPCONFIG } from '@/components/constants/Config';

/*
ADMIN [ALL]  
SUP [Dashboard, Log Att]
USER [Dashboard, Map Prod]
*/

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/404',
  //   name: 'PageNotFaund',
  //   component: PaginaNotFaundView
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import ('@/views/DashboardView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_USER', 'ROLE_SUP', 'ROLE_ADMIN']
    }
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: () => import ('@/views/Empresa/EmpresasView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/empresas/0',
    name: 'empresas_criacao',
    component: () => import ('@/views/Empresa/EmpresasNewView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/empresas/:id',
    name: 'empresas_edicao',
    component: () => import ('@/views/Empresa/EmpresasEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/canais',
    name: 'canais',
    component: () => import ('@/views/Canais/CanaisView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  // { // Não permitido criar canal 
  //   path: '/canais/0',
  //   name: 'canais_criacao',
  //   component: () => import ('@/views/Canais/CanaisNewView.vue'),
  //   meta:{
  //     auth: true,
  //     user_type: ['ROLE_ADMIN']
  //   }
  // },
  {
    path: '/canais/:id',
    name: 'canais_edicao',
    component: () => import ('@/views/Canais/CanaisEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/ambientes',
    name: 'ambiente',
    component: () => import ('@/views/Ambiente/AmbienteView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/ambientes/0',
    name: 'ambientes_criacao',
    component: () => import ('@/views/Ambiente/AmbienteNewView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/ambientes/:id',
    name: 'ambientes_edicao',
    component: () => import ('@/views/Ambiente/AmbienteEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/integracoesmarketplacesecommerces', 
    name: 'marketplaceecommerce',
    component: () => import ('@/views/MarketplaceEcommerce/MarketplaceEcommerceView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/integracoesmarketplacesecommerces/0', 
    name: 'marketplaceecommerce_criacao',
    component: () => import ('@/views/MarketplaceEcommerce/MarketplaceEcommerceNewView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/integracoesmarketplacesecommerces/:id', 
    name: 'marketplaceecommerce_edicao',
    component: () => import ('@/views/MarketplaceEcommerce/MarketplaceEcommerceEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/mapeamentoprodutos',
    name: 'mapeamentoprodutos',
    component: () => import ('@/views/MapeamentoProduto/MapeamentoProdutoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  {
    path: '/mapeamentoprodutos/0',
    name: 'mapeamentoprodutos_criacao',
    component: () => import ('@/views/MapeamentoProduto/MapeamentoProdutoNewView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  {
    path: '/mapeamentoprodutos/:id',
    name: 'mapeamentoprodutos_edicao',
    component: () => import ('@/views/MapeamentoProduto/MapeamentoProdutoEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import ('@/views/Usuario/UsuarioView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/usuarios/0',
    name: 'usuarios_criacao',
    component: () => import ('@/views/Usuario/UsuarioNewView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/usuarios/:id',
    name: 'usuarios_edicao',
    component: () => import ('@/views/Usuario/UsuarioEdicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
    }
  },
  {
    path: '/atualizacoesecommerces',
    name: 'atualizacoesecommerces',
    component: () => import ('@/views/LogAtualizacao/LogAtualizacaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_SUP', 'ROLE_ADMIN']
    }
  },
  {
    path: '/logrequisicoes',
    name: 'logrequisicoes',
    component: () => import ('@/views/LogRequisicaoView.vue'),
    meta:{
      auth: true,
      user_type: ['ROLE_ADMIN']
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

  const required_type = to.meta.user_type as Array<string>;
  
  if (required_type) {
    if (required_type.includes(APPCONFIG.authType)) {
      next();
    }else{
      console.error('ERRO REQUEST');
    }
  }else{
    next();
  }

  // if(routes.map((x) => x.name).indexOf(to.name) == -1){
  //   let rota = (router.options.history.state['current' as keyof typeof router.options.history.state] || '/dashboard') as string;
  //   if (routes.map((x)=> x.name).indexOf(rota) == -1) {
  //     rota = '/'
  //   }
  //   console.log('to', to);
  //   console.log('rota', rota);
  //   console.log('router', router);
  //   router.push('/')
  //   next({path: rota});
  // }
  
});

export default router
