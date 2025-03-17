import fetch_ from '@/services/fetch/requisicao';
import { createStore } from 'vuex'

const store = createStore({
  state: {
    dashboard: Object,

    pages_atual: Object,
    itens_page_atual: Object, //implementar
    
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

    marketplaceecommerce: Object,
    marketplaceecommerce_pesquisa: Object,
    
    mapeamentoproduto: Object,
    mapeamentoproduto_pesquisa: Object,

    log_req: Object,
    log_att: Object,
  },
  mutations:{ ///Comit
    setDadosInterno(state, obj: object){
      state[obj['roter_interna' as keyof typeof obj] as keyof typeof state] = obj['dado' as keyof typeof obj];
    },
    // setDadosInternoID(state, obj: object){
    //   console.log("SET DADOS ", obj);
    //   state[obj['roter_interna' as keyof typeof obj] as keyof typeof state].forEach(
    //     (value) => console.log(value) 
    //   )
    // },
    setPageDadosInterno(state, obj: object){
      state.pages_atual[obj['roter_interna' as keyof typeof obj]] = obj['page' as keyof typeof obj];
    },
    setItensPaginaInterno(state, obj: object){
      const chave = obj['roter_interna' as keyof typeof obj];
      const valor = obj['itens_page' as keyof typeof obj];
      state.itens_page_atual[chave] = valor;
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
    },
    resetDadosInterno(state, key: string){
      state[key as keyof typeof state] = Object;
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
    getEmpresas_pesquisaLength(state): object{
      return state.empresas_pesquisa['totalRegistros' as keyof typeof state.empresas_pesquisa]
    },

    //Ambiente
    getAmbientes(state): object{
      return state.ambientes['data' as keyof typeof state.ambientes]
    },
    getAmbientes_pesquisa(state): object{
      return state.ambientes_pesquisa['data' as keyof typeof state.ambientes_pesquisa]
    },
    getAmbientesLength(state): object{
      return state.ambientes['totalRegistros' as keyof typeof state.ambientes]
    },
    getAmbientes_pesquisaLength(state): object{
      return state.ambientes_pesquisa['totalRegistros' as keyof typeof state.ambientes_pesquisa]
    },

    //Usuario
    getUsuarios(state): object{
      return state.usuarios['data' as keyof typeof state.usuarios]
    },
    getUsuarios_pesquisa(state): object{
      return state.usuarios_pesquisa['data' as keyof typeof state.usuarios_pesquisa]
    },
    getUsuariosLength(state): object{
      return state.usuarios['totalRegistros' as keyof typeof state.usuarios]
    },
    getUsuarios_pesquisaLength(state): object{
      return state.usuarios['totalRegistros' as keyof typeof state.usuarios_pesquisa]
    },

    //Canais
    getCanais(state): object{
      return state.canais['data' as keyof typeof state.canais]
    },
    getCanais_pesquisa(state): object{
      return state.canais_pesquisa['data' as keyof typeof state.canais_pesquisa]
    },
    getCanaisLength(state): object{
      return state.canais['totalRegistros' as keyof typeof state.canais]
    },
    getCanais_pesquisaLength(state): object{
      return state.canais['totalRegistros' as keyof typeof state.canais_pesquisa]
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
      return state.mapeamentoproduto['data' as keyof typeof state.mapeamentoproduto]
    },
    getMapeamentoProduto_pesquisa(state): object{
      return state.mapeamentoproduto_pesquisa['data' as keyof typeof state.mapeamentoproduto_pesquisa]
    },
    getMapeamentoProdutoLength(state): object{
      return state.mapeamentoproduto['totalRegistros' as keyof typeof state.mapeamentoproduto]
    },
    getMapeamentoProduto_pesquisaLength(state): object{
      return state.mapeamentoproduto['totalRegistros' as keyof typeof state.mapeamentoproduto_pesquisa]
    },

    //Market
    getMarketplaceEcommerce(state): object{
      return state.marketplaceecommerce['data' as keyof typeof state.marketplaceecommerce]
    },
    getMarketplaceEcommerce_pesquisa(state): object{
      return state.marketplaceecommerce_pesquisa['data' as keyof typeof state.marketplaceecommerce_pesquisa]
    },
    getMarketplaceEcommerceLength(state): object{
      return state.marketplaceecommerce['totalRegistros' as keyof typeof state.marketplaceecommerce]
    },
    getMarketplaceEcommerce_pesquisaLength(state): object{
      return state.marketplaceecommerce['totalRegistros' as keyof typeof state.marketplaceecommerce_pesquisa]
    },
  },
  actions: { //Asincrono Dispacht
    // GETS BY ID ONLY
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
    getCanaisID(context, id: string){
      let retorno = undefined;
      const aux = context.state.canais['data' as keyof typeof context.state.canais] as Array<object>;
      aux.forEach((value) => {
        if (value['codigo' as keyof typeof value] == parseInt(id)) {
          retorno =  value;
        }
      })
      return retorno
    },
    getAmbientesID(context, id: string){
      let retorno = undefined;
      const aux = context.state.ambientes['data' as keyof typeof context.state.ambientes] as Array<object>;
      aux.forEach((value) => {
        if (value['codigo' as keyof typeof value] == parseInt(id)) {
          retorno =  value;
        }
      })
      return retorno
    },
    getUsuariosID(context, id: string){
      let retorno = undefined;
      const aux = context.state.usuarios['data' as keyof typeof context.state.usuarios] as Array<object>;
      aux.forEach((value) => {
        if (value['codigo' as keyof typeof value] == parseInt(id)) {
          retorno =  value;
        }
      })
      return retorno
    },
    getMapeamentoProdutosID(context, id: string){
      let retorno = undefined;
      const aux = context.state.mapeamentoproduto['data' as keyof typeof context.state.mapeamentoproduto] as Array<object>;
      aux.forEach((value) => {
        if (value['codigo' as keyof typeof value] == parseInt(id)) {
          retorno =  value;
        }
      })
      return retorno
    },


    async delDadosID(context, obj : {roter_externa: string, id: string, roter_interna: string}){
      await fetch_.delDado(obj.roter_externa,obj.id)
      .then(()=> context.commit('resetDadosInterno', obj.roter_interna))
    },
    async setDadosID(context, obj: {roter_externa: string, id: string, roter_interna: string, new_dado: any}){
      obj.new_dado['codigo' as keyof typeof Object] = parseInt(obj.id);
      await fetch_.putDado('/'+obj.roter_externa, obj.id,obj.new_dado)
      .then(()=>{
        const aux = context.state[obj.roter_interna as keyof typeof context.state]['data' as keyof typeof Object] as Array<object>;
        aux.forEach((value, index)=>{
          if (value['codigo' as keyof typeof value] == obj.new_dado.codigo) {
            aux[index] =  obj.new_dado;
          }
        })
      })
    },
    async setDadosID_notCodigo(context, obj: {roter_externa: string, id: string, roter_interna: string, new_dado: any}){
      // obj.new_dado['codigo' as keyof typeof Object] = parseInt(obj.id);
      await fetch_.putDado('/'+obj.roter_externa, obj.id,obj.new_dado)
      .then(()=>{
        const aux = context.state[obj.roter_interna as keyof typeof context.state]['data' as keyof typeof Object] as Array<object>;
        aux.forEach((value, index)=>{
          if (value['codigo' as keyof typeof value] == obj.new_dado.codigo) {
            aux[index] =  obj.new_dado;
          }
        })
      })
    },
    async postDados(context, obj : {roter_externa: string, dado: object, roter_interna: string}){
      Promise.resolve(await fetch_.postDado('/'+obj.roter_externa, obj.dado))
      .then((ret) => {
        context.commit('resetDadosInterno', obj.roter_interna)
        return ret
      }).catch((error)=>{
        throw error;
      })
    },
    async getDadosPaginados(context, obj : {roter_interna: string, roter_externa: string, request: string, pagina_atual: number, item_page: number}){
      // context.commit('setPageDadosInterno', {'page': obj.pagina_atual,'roter_interna': obj.roter_interna})
      // context.commit('setItensPaginaInterno', {'roter_interna': obj.roter_interna, 'itens_page': obj.item_page})
      Promise.resolve(await fetch_.getDadoPaginado('/'+obj.roter_externa, obj.request))
      .then((value) =>{
        context.commit('setDadosInterno', {'dado': value , 'roter_interna': obj.roter_interna})
        return value
      }).catch((error)=>{
        throw error;
      })
    },
    getPaginas(context, rota_interna: string){
      return context.state.pages_atual[rota_interna as keyof typeof context.state.pages_atual]
    },
    getItensPagina(context, rota_interna: string){
      return context.state.itens_page_atual[rota_interna as keyof typeof context.state.itens_page_atual]
    }
  }

})

export default store;