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
            largura: window.innerWidth,

            request_pesquisa: '',
            is_in_DeletModal: false
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
                  this.is_in_DeletModal = true;
                  const rota_interna = this.itsOnFilter ? 'ambientes_pesquisa' : 'ambientes';
                  let aux = {'roter_externa': 'ambiente', 'id': objeto.codigo, 'roter_interna': rota_interna}
                  store.dispatch('delDadosID', aux)
                  .then(
                        () => {
                              if (this.itsOnFilter) {
                                    this.getPesquisa(this.request_pesquisa);
                              }else{
                                    this.requestDados();
                              }
                        }
                  ).catch((error_retorno)=> {
                        this.is_in_DeletModal = false;
                        this.$emit('Erro_fetch', error_retorno)
                  })
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        if (this.itsOnFilter) {
                              this.getPesquisa(this.request_pesquisa);
                        }else{
                              this.requestDados();
                        }
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        if (this.itsOnFilter) {
                              this.getPesquisa(this.request_pesquisa);
                        }else{
                              this.requestDados();
                        }
                  }
            },
            async requestDados(){
                  this.is_in_DeletModal = false;
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
                  }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            },
            filtraAmbiente(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
                  this.pagina_atual = 1;
                  this.requestDados();
            },
            closefiltrarAmbiente(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.request_pesquisa = request;
                  this.is_in_DeletModal = false;
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'ambientes_pesquisa',
                        'roter_externa': 'ambiente',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc&`+this.request_pesquisa,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getAmbientes_pesquisaLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.dado_pesquisa.body = store.getters.getAmbientes_pesquisa;
                        this.lista_estado = 'Lista'
                  }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            },
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  if (this.itsOnFilter) {
                        this.getPesquisa(this.request_pesquisa);
                  }else{
                        this.requestDados();
                  }
            }
      },
      emits:['Erro_fetch']
})
</script>

<template id="Ambi_comp">
      <div class="row">
            <FiltroPaiComponent v-if="!its_card"
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => {
                        pagina_atual = 1
                        getPesquisa(args)
                  }"
                  @close_pesquisa="closefiltrarAmbiente"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Ambientes Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
                  :dados="dado_pesquisa"
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
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"

                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="()=> is_in_DeletModal = false"
                  @abrirModal="()=> is_in_DeletModal = true"
            />
            <!-- Lista Ambientes -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
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

                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="()=> is_in_DeletModal = false"
                  @abrirModal="()=> is_in_DeletModal = true"
            />


            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Ambientes Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && itsOnFilter && its_card"
                  :lista_opc_paginas="lista_opc_pagina_card"
                  :header_info="dado_paginado.header"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
                  :dados="dado_pesquisa"
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
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"

                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="()=> is_in_DeletModal = false"
                  @abrirModal="()=> is_in_DeletModal = true"
            />
            <!-- Card Lista Ambientes -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && !itsOnFilter && its_card"
                  :lista_opc_paginas="lista_opc_pagina_card"
                  :header_info="dado_paginado.header"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
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

                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="()=> is_in_DeletModal = false"
                  @abrirModal="()=> is_in_DeletModal = true"
            />
      </div>
</template>

<style scoped>

</style>