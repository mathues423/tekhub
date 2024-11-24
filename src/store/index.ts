import fetch_ from '@/services/fetch/requisicao';
import { createStore } from 'vuex'

const store = createStore({
  state: {
    dashboard: Object,

    pages_atual: Object,
    empresas: Object,
    empresas_pesquisa: Object,
    // empresa_page_atual: Number,
    ambientes: Object,
    ambientes_pesquisa: Object,
    // ambientes_page_atual: Number,
    usuarios: Object,
    usuarios_pesquisa: Object,
    // usuarios_page_atual: Number,
    canais: Object,
    canais_pesquisa: Object,
    // canais_page_atual: Number,

    log_req: Object,
    log_att: Object,
    mapeamentoprodudo: Object,
    marketplaceecommerce: Object,
  },
  mutations:{ ///Comit
    setDadosInterno(state, obj: object){
      state[obj['roter_interna' as keyof typeof obj] as keyof typeof state] = obj['dado' as keyof typeof obj];
    }, 
    setPageDadosInterno(state, obj: object){
      state.pages_atual[obj['roter_interna' as keyof typeof obj]] = obj['page' as keyof typeof obj];
    },
    ordenarDadosInterno(state, obj: {ordem: string, rota_interna: string, nome_dado: string, tipo: string}){
      const aux = state[obj.rota_interna as keyof typeof state]['data' as keyof typeof Object] as Array<object>;
      if (obj.tipo == 'Number') {
        if(obj.ordem == 'Asc'){ // Ascendente
          aux.sort((a: object , b: object) => 
            a[obj.nome_dado as keyof typeof a] - b[obj.nome_dado as keyof typeof b]
          )
        }else{ //Decrescente
          aux.sort((a: object , b: object) => 
            b[obj.nome_dado as keyof typeof b] - a[obj.nome_dado as keyof typeof a]
          )
        }
      }
      if(obj.tipo == 'String'){
        if(obj.ordem == 'Asc'){ // Ascendente
          aux.sort((a, b) => 
            (a[obj.nome_dado as keyof typeof a] as string).localeCompare(b[obj.nome_dado as keyof typeof b])
          )
        }else{ //Decrescente
        aux.sort((a, b) =>
          (b[obj.nome_dado as keyof typeof b] as string).localeCompare(a[obj.nome_dado as keyof typeof a])
        )
        }
      }
    }
  },
  getters: {
    //Dashboard
    getDashboard(state): object{
      return state.dashboard['data' as keyof typeof state.dashboard]
    },
    getDashboardLength(state): object{
      return state.dashboard['totalRegistros' as keyof typeof state.dashboard]
    },

    //Empresas
    getEmpresas(state): object{
      return state.empresas['data' as keyof typeof state.empresas]
    },
    getEmpresas_pesquisa(state): object{
      return state.empresas_pesquisa['data' as keyof typeof state.empresas_pesquisa]
    },
    getEmpresasLength(state): object{
      return state.empresas['totalRegistros' as keyof typeof state.empresas]
    },

    //Ambiente
    getAmbientes(state): object{
      return state.ambientes['data' as keyof typeof state.ambientes]
    },
    getAmbientesLength(state): object{
      return state.ambientes['totalRegistros' as keyof typeof state.ambientes]
    },

    //Usuario
    getUsuarios(state): object{
      return state.usuarios['data' as keyof typeof state.usuarios]
    },
    getUsuariosLength(state): object{
      return state.usuarios['totalRegistros' as keyof typeof state.usuarios]
    },

    //Canais
    getCanais(state): object{
      return state.canais['data' as keyof typeof state.canais]
    },
    getCanaisLength(state): object{
      return state.canais['totalRegistros' as keyof typeof state.canais]
    },

    //LOG Atualização
    getLogAtt(state): object{
      return state.log_att['data' as keyof typeof state.log_att]
    },
    getLogAttLength(state): object{
      return state.log_att['totalRegistros' as keyof typeof state.log_att]
    },

    //LOG Requisição
    getLogReq(state): object{
      return state.log_req['data' as keyof typeof state.log_req]
    },
    getLogReqLength(state): object{
      return state.log_req['totalRegistros' as keyof typeof state.log_req]
    },

    //Mapeamento
    getMapeamentoProduto(state): object{
      return state.mapeamentoprodudo['data' as keyof typeof state.mapeamentoprodudo]
    },
    getMapeamentoProdutoLength(state): object{
      return state.mapeamentoprodudo['totalRegistros' as keyof typeof state.mapeamentoprodudo]
    },

    //Market
    getMarketplaceEcommerce(state): object{
      return state.marketplaceecommerce['data' as keyof typeof state.marketplaceecommerce]
    },
    getMarketplaceEcommerceLength(state): object{
      return state.marketplaceecommerce['totalRegistros' as keyof typeof state.marketplaceecommerce]
    },
  },
  actions: { //Asincrono Dispacht
    getEmpresasID(context, id : string){
      let retorno = undefined;
      const aux = context.state.empresas['data' as keyof typeof context.state.empresas] as Array<object>;
      aux.forEach((value) => {
        if (value['codigo' as keyof typeof value] == parseInt(id)) {
          retorno =  value;
        }
      })
      return retorno
    },
    async delDadosID(context, obj : {roter_externa: string, id: string, roter_interna: string}){
      fetch_.delDado(obj.roter_externa,obj.id)
    },
    async setDadosID(context, obj: {roter_externa: string, id: string, roter_interna: string, new_dado: {codigo: number}}){
      obj.new_dado.codigo = parseInt(obj.id);
      fetch_.putDado('/'+obj.roter_externa, obj.id,obj.new_dado)
    },
    async putDados(context, obj : {roter_externa: string, dado: object, roter_interna: string}){
      await fetch_.postDado('/'+obj.roter_externa, obj.dado)
    },
    async getDadosPaginados(context, obj : {roter_interna: string, roter_externa: string, request: string, pagina_atual: number}){
      Promise.resolve(await fetch_.getDadoPaginado('/'+obj.roter_externa, obj.request))
      .then((value) =>{
        context.commit('setPageDadosInterno', {'page': obj.pagina_atual,'roter_interna': obj.roter_interna})
        context.commit('setDadosInterno', {'dado': value , 'roter_interna': obj.roter_interna})
        return value
      })
    },
    getPaginas(context, rota_interna: string){
      return context.state.pages_atual[rota_interna as keyof typeof context.state.pages_atual]
    },
  }

})

export default store;