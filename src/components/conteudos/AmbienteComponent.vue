<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/Loaders/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';
import ListaCardComponent from '../util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '../util/Loaders/LoaderListaCardComponent.vue';


export default defineComponent({
      template: '#Ambi_comp',
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

                        {'header': 'Canal', 'key_body': 'canalAlias',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Ambiente', 'key_body': 'ambiente',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'pre'},
                        'config_filtro': [
                              {'key': 0, 'text': 'HOMOLOGAÇÃO', isChecked: false},
                              {'key': 1, 'text': 'PRODUÇÃO', isChecked: false}
                        ],
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

                        {'header': 'Canal', 'key_body': 'canalAlias',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ambiente', 'key_body': 'ambiente',
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
            this.requestDados()
            // if(store.getters.getAmbientes != undefined){
            //       this.lista_estado = 'Lista'
            //       this.dado_paginado.body = await store.getters.getAmbientes
            //       store.dispatch('getPaginas', 'ambientes')
            //       .then((pagina_salvo)=>{
            //             this.pagina_atual = pagina_salvo;
            //       })
            //       store.dispatch('getItensPagina', 'ambientes')
            //       .then((itens_max)=> {
            //             this.ITEM_PAGINA_MAX =  itens_max;
            //             this.NUMERO_PAGINA = Math.ceil( store.getters.getAmbientesLength / itens_max);
            //       })
            // }else{
            //       this.requestDados()
            // }
            this.onResize()
            this.$nextTick(()=> window.addEventListener('resize', this.onResize))
      },
      methods:{
            onResize(){
                  this.largura = window.innerWidth
                  if (this.largura <= 768) { //col-md
                        this.its_card = true;
                  }else{
                        this.its_card = false;
                  }
            },
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'ambiente', 'id': objeto.codigo, 'roter_interna': 'ambientes'}
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
                        'roter_interna': 'ambientes',
                        'roter_externa': 'ambiente',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX      
                  }).then((args) => {
                        this.dado_paginado.body = store.getters.getAmbientes;
                        if(this.ITEM_PAGINA_MAX != 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getAmbientesLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.lista_estado = 'Lista'
                        console.log(args);
                        console.log('IN REQUEST ', store.state);
                  })
            },
            filtraAmbiente(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarAmbiente(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'ambientes_pesquisa',
                        'roter_externa': 'ambiente',
                        'request': `?pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc&`+request,
                        'pagina_atual': 1,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.NUMERO_PAGINA = 1;
                        this.dado_pesquisa.body = store.getters.getAmbientes_pesquisa;
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

<template id="Ambi_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarAmbiente"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Ambientes Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista Ambientes -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => {return null}"
                  @filtrarDadoPai="filtraAmbiente"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />


            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Ambientes Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && itsOnFilter && its_card"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Card Lista Ambientes -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && !itsOnFilter && its_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => {return null}"
                  @filtrarDadoPai="filtraAmbiente"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>