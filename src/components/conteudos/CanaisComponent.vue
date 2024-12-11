<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';


export default defineComponent({
      template: '#Canl_comp',
      data() {
          return {
            lista_estado: 'Loader',
            itsOnFilter: false,
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Descrição', 'key_body': 'descricao',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Alias', 'key_body': 'alias',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'TIPO', 'key_body': 'tipo',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'pre'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Canal associado', 'key_body': 'vazio',
                        'filtro':{'tipo_obj': '????', 'tipo_filtro': 'all'},
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

                        {'header': 'Descrição', 'key_body': 'descricao',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Alias', 'key_body': 'alias',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'TIPO', 'key_body': 'tipo',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Canal associado', 'key_body': 'vazio',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            LoaderListaComponent,
            FiltroPaiComponent,
            ListaComponent
      },
      mounted() {
            this.requestDados()
            // if(store.getters.getCanais != undefined){
            //       this.dado_paginado.body = store.getters.getCanais
            //       store.dispatch('getPaginas', 'canais').then((value) => this.pagina_atual = value)
            //       this.NUMERO_PAGINA = Math.ceil(store.getters.getCanaisLength / this.ITEM_PAGINA_MAX);
            //       this.lista_estado = 'Lista'
            // }else{
            //       this.requestDados()
            // }
      },
      methods:{
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'canal', 'id': objeto.codigo, 'roter_interna': 'canais'}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => this.requestDados()
                  ).catch((error)=> { console.warn(error) })
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
                        'roter_interna': 'canais',
                        'roter_externa': 'canal',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX      
                  }).then(() => {
                        this.dado_paginado.body = store.getters.getCanais;
                        console.log(this.dado_paginado.body);
                        if(this.ITEM_PAGINA_MAX != 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getCanaisLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.lista_estado = 'Lista'
                  })
            },
            filtraCanais(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarCanais(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'canais_pesquisa',
                        'roter_externa': 'canal',
                        'request': `?pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc&`+request,
                        'pagina_atual': 1,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.NUMERO_PAGINA = 1;
                        this.dado_pesquisa.body = store.getters.getCanais_pesquisa;
                        this.lista_estado = 'Lista'
                  })
            },
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  this.requestDados()
            }
      },
})
</script>

<template id="Canl_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarCanais"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Canais Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'canais'"
                  :ModalContent_Remocao="[
                        {'nome': 'Descrição', 'key': 'descricao'},
                        {'nome': 'Alias', 'key': 'alias'},
                        {'nome': 'TIPO', 'key': 'tipo'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista Canais -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado_paginado"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'canais'"
                  :ModalContent_Remocao="[
                        {'nome': 'Descrição', 'key': 'descricao'},
                        {'nome': 'Alias', 'key': 'alias'},
                        {'nome': 'TIPO', 'key': 'tipo'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => {return null}"
                  @filtrarDadoPai="filtraCanais"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>
