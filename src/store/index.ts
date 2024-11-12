import fetch_ from '@/services/fetch/requisicao';
import { createStore } from 'vuex'

// Cria uma nova instância do store.
const store = createStore({
  state: {
    dashboard: Array<object>(),

    empresas: Array<object>(),
    ambientes: Array<object>(),
    usuarios: Array<object>(),
    canais: Array<object>(),

    log_req: Array<object>(),
    log_att: Array<object>(),
    mapeamentoprodudo: Array<object>(),
    marketplaceecommerce: Array<object>(),
  },
  mutations:{ ///Comit
    setDadosInterno(state, obj: {dado : Array<object>, roter_interna: string}){
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
    },
    ordenarDadosInterno(state, obj: {ordem: boolean, rota_interna: string, nome_dado: string, tipo: string}){
      console.log('OBJ REQ: ', obj);
      console.log('State.rota: ', state[obj.rota_interna as keyof typeof state]);
      
      if (obj.tipo == 'Number') {
        console.log("ORDENA NUMBER");
        if(obj.ordem){ // Ascendente
          state[obj.rota_interna as keyof typeof state].sort((a: object , b: object) => 
            a[obj.nome_dado as keyof typeof a] - b[obj.nome_dado as keyof typeof b]
          )
        obj.ordem = !obj.ordem;
        }else{ //Decrescente
          state[obj.rota_interna as keyof typeof state].sort((a: object , b: object) => 
            b[obj.nome_dado as keyof typeof b] - a[obj.nome_dado as keyof typeof a]
          )
        }
      }
      if(obj.tipo == 'String'){
        console.log("ORDENA STRING");
        if(obj.ordem){ // Ascendente
          state[obj.rota_interna as keyof typeof state].sort((a, b) => 
            (a[obj.nome_dado as keyof typeof a] as string).localeCompare(b[obj.nome_dado as keyof typeof b])
          )
          obj.ordem = !obj.ordem;
        }else{ //Decrescente
        state[obj.rota_interna as keyof typeof state].sort((a, b) =>
          (b[obj.nome_dado as keyof typeof b] as string).localeCompare(a[obj.nome_dado as keyof typeof a])
        )
        }
      }
      console.log('State.rota: ', state[obj.rota_interna as keyof typeof state]);
      console.log('ROTINA--------------FIM-------------------------------------------------');
    }
  },
  getters: {
    getDashboard(state): Array<object>{
      return state.dashboard
    },
    getEmpresas(state): Array<object>{
      return state.empresas
    },
    getAmbientes(state): Array<object>{
      return state.ambientes
    },
    getUsuarios(state): Array<object>{
      return state.usuarios
    },
    getCanais(state): Array<object>{
      return state.canais
    },
    getLogAtt(state): Array<object>{
      return state.log_att
    },
    getLogReq(state): Array<object>{
      return state.log_req
    },
    getMapeamentoProduto(state): Array<object>{
      return state.mapeamentoprodudo
    },
    getMarketplaceEcommerce(state): Array<object>{
      return state.marketplaceecommerce
    },
  },
  actions: { //Asincrono Dispacht
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