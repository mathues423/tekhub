<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/Loaders/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';
import ListaCardComponent from '../util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '../util/Loaders/LoaderListaCardComponent.vue';


export default defineComponent({
      template: '#Usua_comp',
      data() {
          return {
            lista_opc_pagina_card: [
                  {'text': '12', 'value': 12},
                  {'text': '30', 'value': 30},
                  {'text': '60', 'value': 60},
                  {'text': 'all', 'value': 0},
            ],
            lista_opc_pagina_not_card: [
                  {'text': '10', 'value': 10},
                  {'text': '25', 'value': 25},
                  {'text': '50', 'value': 50},
                  {'text': '100', 'value': 100},
                  {'text': 'all', 'value': 0},
            ],
            lista_estado: 'Loader',
            itsOnFilter: false,
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'ordem':{'on': true,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Email', 'key_body': 'email',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Perfil', 'key_body': 'perfil',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'pre'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Empresa', 'key_body': 'empresaDescricao',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},
                        
                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
            dado_pesquisa:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Email', 'key_body': 'email',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Perfil', 'key_body': 'perfil',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Empresa', 'key_body': 'empresaDescricao',
                        'isfiltrable': false, 'isordenable':false},
                        
                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
            its_card: false,
            largura: window.innerWidth
          }
      },
      components:{
            LoaderListaComponent,
            FiltroPaiComponent,
            ListaComponent,
            ListaCardComponent,
            LoaderListaCardComponent
      },
      async mounted() {
            this.onResize()
            this.$nextTick(()=> window.addEventListener('resize', this.onResize))
            this.requestDados()
            // if(store.getters.getUsuarios != undefined){
            //       this.lista_estado = 'Lista'
            //       this.dado_paginado.body = await store.getters.getUsuarios
            //       store.dispatch('getPaginas', 'usuarios').then((value) => this.pagina_atual = value)
            //       this.NUMERO_PAGINA = Math.ceil(await store.getters.getCanaisLength / this.ITEM_PAGINA_MAX);
            // }else{
            //       this.requestDados()
            // }
      },
      methods:{
            onResize(){
                  this.largura = window.innerWidth
                  if (this.largura <= 960) { //col-lg
                        this.its_card = true;
                        this.ITEM_PAGINA_MAX = 12;
                  }else{
                        this.its_card = false;
                        this.ITEM_PAGINA_MAX = 10;
                  }
            },
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'usuario', 'id': objeto.codigo, 'roter_interna': 'usuarios'}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => this.requestDados()
                  ).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        this.requestDados();
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        this.requestDados();
                  }
            },
            async requestDados(){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'usuarios',
                        'roter_externa': 'usuario',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.dado_paginado.body = store.getters.getUsuarios;
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getUsuariosLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.lista_estado = 'Lista'
                  }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            },
            ordenaUsuario(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
                  this.dado_paginado.header.forEach(
                        (valor) => {
                              if(valor.ordem?.on != undefined){
                                    valor.ordem.on = false;
                              }
                        })
                  if (title.ordem.tipo_ordenacao == 'Asc') {
                        title.ordem.tipo_ordenacao = 'Desc'
                  }else{
                        title.ordem.tipo_ordenacao = 'Asc'
                  }
                  title.ordem.on = true;
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': 'usuarios',
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            },
            filtraUsuario(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarUsuario(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'usuarios_pesquisa',
                        'roter_externa': 'usuario',
                        'request': `?pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc&`+request,
                        'pagina_atual': 1,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.NUMERO_PAGINA = 1;
                        this.dado_pesquisa.body = store.getters.getUsuarios_pesquisa;
                        this.lista_estado = 'Lista'
                  }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            }
      },
      emits:['Erro_fetch']
})
</script>

<template id="Usua_comp">
      <div class="row">
            <FiltroPaiComponent v-if="!its_card"
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarUsuario"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Usuarios Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :dados="dado_pesquisa"
                  :item_p_pagina="0"
                  :pagina="1"
                  :pagina_max="1"
                  :rota_edicao="'usuarios'"
                  :ModalContent_Remocao="[
                        {'nome': 'Email', 'key': 'email'},
                        {'nome': 'Perfil', 'key': 'perfil'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista Usuarios -->
            <ListaComponent v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado_paginado"
                  :item_p_pagina="10"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'usuarios'"
                  :ModalContent_Remocao="[
                        {'nome': 'Email', 'key': 'email'},
                        {'nome': 'Perfil', 'key': 'perfil'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaUsuario(arg)"
                  @filtrarDadoPai="filtraUsuario"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />

            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Usuario Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && itsOnFilter && its_card"
                  :lista_opc_paginas="lista_opc_pagina_card"
                  :dados="dado_pesquisa"
                  :item_p_pagina="0"
                  :pagina="1"
                  :pagina_max="1"
                  :rota_edicao="'usuarios'"
                  :ModalContent_Remocao="[
                        {'nome': 'Email', 'key': 'email'},
                        {'nome': 'Perfil', 'key': 'perfil'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Card Lista Usuario -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && !itsOnFilter && its_card"
                  :lista_opc_paginas="lista_opc_pagina_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado_paginado"
                  :item_p_pagina="10"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'usuarios'"
                  :ModalContent_Remocao="[
                        {'nome': 'Email', 'key': 'email'},
                        {'nome': 'Perfil', 'key': 'perfil'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaUsuario(arg)"
                  @filtrarDadoPai="filtraUsuario"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>