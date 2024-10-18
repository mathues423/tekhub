let date = new Date();
let ano = date.getFullYear();

export const APPCONFIG = {
  versao: '011.00',

  

  ano: ano,
  linkProducao: "http://tekapi.teksystemcloud.com.br:8090/api/v1", //window.location.protocol + "//" + window.location.hostname.replace("www.", "") + ":8090/api/v1",
  // linkProducao: "https://ecommerces.teksystem.com.br:8090/api/v1",
  authToken: 'auth-token',
  lembrarme: 'lembrar-me',

  //region Usuario
  // perfilUsuario: 'perfil-usuario',
  // USER: 'ROLE_USER',
  // SUPORTE: 'ROLE_SUP',
  // ADM: 'ROLE_ADMIN',
  //endregion

//   pathDashboard: '/dashboard',

//   //region Empresa
//   pathEmpresas: '/empresas',
//   pathEmpresa: '/empresa/',
//   //endregion

//   //region Ambiente
//   pathAmbiente: '/ambiente/',
//   pathAmbientes: '/ambientes',
//   //endregion

//   //region Usuário
//   pathUsuario: '/usuario/',
//   pathUsuarios: '/usuarios',
//   //endregion

//   //region Canal
//   pathCanal: '/canal/',
//   pathCanais: '/canais',
//   //endregion

//   // region Integracao
//   pathIntegracao: '/integracao/',
//   pathIntegracoes: '/integracoes',

//   pathVersaoAtualizar: '/integracaomarketplaceecommerce/empresa/canal',

//   pathIntegracaoEM: '/integracaomarketplaceecommerce/',
//   pathIntegracoesEM: '/integracoesmarketplacesecommerces/',

//   pathMapeamentoProduto: '/mapeamentoproduto/',
//   pathMapeamentoProdutos: '/mapeamentoprodutos/',
//   //endregion

//   //region Log
//   pathLogs: '/logrequisicoes',
//   pathLog: '/logrequisicao/',
//   //endregion

//   //region Log Atualizações
//   pathLogAtualizacao: '/atualizacaoecommerce/',
//   pathLogAtualizacoes: '/atualizacoesecommerces/',
//   pathAtualizar: '/atualizacaoecommerce/atualizar',
//   pathAtulizacaoPendentes: '/atualizacaoecommerce/pendentes',
//   //endregion

//   settings: {
//     boxedLayout: false, // boolean: true, false
//     fixedHeader: true, // boolean: true, false
//     collapsedNav: false, // boolean: true, false
//     offCanvasNav: false, // boolean: true, false
//     sidebarWidth: 240, // number
//     colorOption: '34', // string: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
//     theme: 'light', // (WIP) string: light, gray, dark
//   }
};