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

    setDadosInterno(state, obj: {dado : Array<{}>, key: string}){
      state[obj.key as keyof typeof state] = obj.dado;
    }, 
    setDadosInternoID(state, obj : {new_dado: object, id: string, key: string}){
      state[obj.key as keyof typeof state].forEach((value,index) => {
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
    async delDadosID(contex, obj : {roter_externa: string, id: string, roter_interna: string}){
      Promise.resolve(fetch_.delDado(obj.roter_externa,obj.id))
      .then(() => 
        contex.commit('delDadosInternoID', {'id': obj.id, 'roter_interna': obj.roter_interna})
      ); 
    },
    async setDadosID(contex, obj: {roter_externa: string, id: string, roter_interna: string, new_dado: {codigo: number}}){
      obj.new_dado.codigo = parseInt(obj.id);
      Promise.resolve(fetch_.putDado('/'+obj.roter_externa, obj.id,obj.new_dado))
      .then(() =>
        contex.commit('setDadosInternoID', {'new_dado': obj.new_dado, 'id':obj.id, 'key':obj.roter_interna} )
      )
    },
    //ADICAO DADO
  }

})

export default store;