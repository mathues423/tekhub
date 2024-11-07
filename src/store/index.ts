import fetch_ from '@/services/fetch/requisicao';
import { createStore } from 'vuex'
/* eslint-disable */

// Cria uma nova instância do store.
const store = createStore({
  state: {
    dashboard: Array<{}>(),

    empresas: Array<{}>(),
    ambientes: Array<{}>(),
    usuarios: Array<{}>(),
    canais: Array<{}>(),

    log_req: Array<{}>(),
    log_att: Array<{}>(),
    mapeamentoprodudo: Array<{}>(),
    marketplaceecommerce: Array<{}>(),
  },
  mutations:{
    setDadosInterno(state, obj: {dado : Array<{}>, roter_interna: string}){
      state[obj.roter_interna as keyof typeof state] = obj.dado;
    }, 
    setDadosInternoID(state, obj : {new_dado: object, id: string, roter_interna: string}){
      state[obj.roter_interna as keyof typeof state].forEach((value,index) => {
        if (value['codigo' as keyof typeof value] == parseInt(obj.id)) {
          state.empresas[index] = obj.new_dado;
        }
      })
    },
    delDadosInternoID(state, obj : {id: string, roter_interna: string}){
      state[obj.roter_interna as keyof typeof state].forEach((value,index) => {
        if (value['codigo' as keyof typeof value] == parseInt(obj.id)) {
          state[obj.roter_interna as keyof typeof state].splice(index, 1)
        }
      })      
    },
    putDadosInterno(state, obj: {dado: object, rota_interna: string}){
      state[obj.rota_interna as keyof typeof state].push(obj.dado);
    }
  },
  getters: {
    getDashboard(state): Array<Object>{
      return state.dashboard
    },
    getEmpresas(state): Array<Object>{
      return state.empresas
    },
    getAmbientes(state): Array<Object>{
      return state.ambientes
    },
    getUsuarios(state): Array<Object>{
      return state.usuarios
    },
    getCanais(state): Array<Object>{
      return state.canais
    },
    getLogAtt(state): Array<Object>{
      return state.log_att
    },
    getLogReq(state): Array<Object>{
      return state.log_req
    },
    getMapeamentoProduto(state): Array<Object>{
      return state.mapeamentoprodudo
    },
    getMarketplaceEcommerce(state): Array<Object>{
      return state.marketplaceecommerce
    },
  },
  actions: { //Asincrono
    getEmpresasID(context, id : string){
      let retorno;
      context.state.empresas.forEach((value) => {
        if (value['codigo' as keyof typeof context.state.empresas[0]] == parseInt(id)) {
          retorno = value;
        }
      })
      return retorno
    },
    async delDadosID(context, obj : {roter_externa: string, id: string, roter_interna: string}){
      Promise.resolve(fetch_.delDado(obj.roter_externa,obj.id))
      .then(() => 
        context.commit('delDadosInternoID', {'id': obj.id, 'roter_interna': obj.roter_interna})
      ); 
    },
    async setDadosID(context, obj: {roter_externa: string, id: string, roter_interna: string, new_dado: {codigo: number}}){
      obj.new_dado.codigo = parseInt(obj.id);
      Promise.resolve(fetch_.putDado('/'+obj.roter_externa, obj.id,obj.new_dado))
      .then(() =>
        context.commit('setDadosInternoID', {'new_dado': obj.new_dado, 'id':obj.id, 'roter_interna':obj.roter_interna} )
      )
    },
    async putDados(context, obj : {roter_externa: string, dado: object, roter_interna: string}){
      let new_obj = {};
      Promise.resolve(new_obj = await fetch_.postDado('/'+obj.roter_externa, obj.dado))
      .then(()=> {
        console.log(new_obj)
        context.commit('putDadosInterno', {'dado': new_obj, 'rota_interna': obj.roter_interna})}
      )
    }
  }

})

export default store;