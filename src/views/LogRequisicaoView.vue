<script lang="ts">
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import BuscaEmpresaDateComponent from '@/components/util/BuscaEmpresaDateComponent.vue';
import ListaComponent from '@/components/util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components/util/Loaders/LoaderListaComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ListaCardComponent from '@/components/util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '@/components/util/Loaders/LoaderListaCardComponent.vue';
import store from '@/store';
import { defineComponent } from 'vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';


export default defineComponent({
      data() {
          return {
                  fetch_error_msg: {},
                  have_fetch_error: false,
            lista_opc_pagina_card: [
                  {'text': '12', 'value': 12},
                  {'text': '30', 'value': 30},
                  {'text': '60', 'value': 60},
            ],
            lista_opc_pagina_not_card: [
                  {'text': '10', 'value': 10},
                  {'text': '25', 'value': 25},
                  {'text': '50', 'value': 50},
                  {'text': '100', 'value': 100},
                  {'text': 'all', 'value': 0},
            ],
            lista_estado: 'Empty',
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Status http', 'key_body': 'codigoestatus',
                        'expandible':true,
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Data e hora', 'key_body': 'datahora',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Entrada/saída', 'key_body': 'entradasaida',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Recurso', 'key_body': 'recurso',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Tipo de Requisição', 'key_body': 'tiporequisicao',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
            
            query_request_pesquisa:'',

            its_card: false,
            largura: window.innerWidth
          }
      },
      components:{
            NavbarComplet,
            BuscaEmpresaDateComponent,
            VersaoMaximisada,
            LoaderListaComponent,
            ListaComponent,
            ListaCardComponent,
            LoaderListaCardComponent,
            ErroResponseComponent
      },
      mounted() {
            this.onResize()
            this.$nextTick(()=> window.addEventListener('resize', this.onResize))
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
            requisicao(path: string){
                  console.log(path);
                  
                  this.lista_estado = 'Loader'
                  this.query_request_pesquisa = path;
                  Promise.resolve(store.dispatch('getDadosPaginados',{
                        'roter_interna': 'log_req',
                        'roter_externa': 'logrequisicao',
                        'request': `?ordenacao=datahora&direcao=ASC&pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}`+path,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  })).then(()=>{
                              this.dado_paginado.body = store.getters.getLogReq
                              console.log(this.dado_paginado.body);
                              if(this.ITEM_PAGINA_MAX != 0){
                                    this.NUMERO_PAGINA = Math.ceil(store.getters.getLogReqLength / this.ITEM_PAGINA_MAX);
                              }else{
                                    this.NUMERO_PAGINA = 1;
                              }
                              this.lista_estado = 'Lista'
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        this.requisicao(this.query_request_pesquisa);
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        this.requisicao(this.query_request_pesquisa);
                  }
            },
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  this.requisicao(this.query_request_pesquisa)
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'log_req'"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error">
                        <BuscaEmpresaDateComponent
                              :rota_externa="'logrequisicao'"
                              @request_filtro="(args: string)=> requisicao(args)"
                              @Erro_fetch="(arg)=> showError(arg)"
                        />
                        <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card" 
                              :header="dado_paginado.header"
                              :quantidade_dados="ITEM_PAGINA_MAX"
                        />
                        <ListaComponent v-if="lista_estado == 'Lista' && !its_card"
                              :lista_opc_paginas="lista_opc_pagina_not_card"
                              :have_item_p_pagina="true"
                              :have_pagination="true" 
                              :have_expancion="true"    
                              :dados="dado_paginado"
                              :pagina="pagina_atual"
                              :item_p_pagina="ITEM_PAGINA_MAX"
                              :pagina_max="NUMERO_PAGINA"
                              :rota_edicao="''"
                              :ModalContent_Remocao="[]"
                              
                              @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                              @avancar="avancaPagina" 
                              @recuar="recuarPagina"
                        />
      
                        <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                              :header="dado_paginado.header"
                              :quantidade_dados="ITEM_PAGINA_MAX"
                        />
                        <!-- Card Lista Canais -->
                        <ListaCardComponent v-if="lista_estado == 'Lista' && its_card"
                              :lista_opc_paginas="lista_opc_pagina_card"
                              :have_item_p_pagina="true"
                              :have_pagination="true"
                              :have_expancion="true"
                              :dados="dado_paginado"
                              :pagina="pagina_atual"
                              :item_p_pagina="ITEM_PAGINA_MAX"
                              :pagina_max="NUMERO_PAGINA"
                              :rota_edicao="''"
                              :ModalContent_Remocao="[]"
                              
                              @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                              @avancar="avancaPagina" 
                              @recuar="recuarPagina"
                        />
                  </span>
                  <span v-else>
                        <ErroResponseComponent 
                              :error_msg="fetch_error_msg"
                        />
                  </span>
            </div>
            <VersaoMaximisada />
      </div>
</template>

<style scoped>
#content{
      background-color: var(--bs-white);
      color: var(--bs-gray-600);
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>