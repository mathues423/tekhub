<script lang="ts">
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import BuscaEmpresaDateComponent from '@/components/util/BuscaEmpresaDateComponent.vue';
import ListaComponent from '@/components/util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components/util/Loaders/LoaderListaComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import store from '@/store';
import { defineComponent } from 'vue';


export default defineComponent({
      data() {
          return {
            lista_estado: 'Empty',
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Status http', 'key_body': 'codigoestatus',
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
            }
          }
      },
      components:{
            NavbarComplet,
            BuscaEmpresaDateComponent,
            VersaoMaximisada,
            LoaderListaComponent,
            ListaComponent
      },
      methods:{
            requisicao(path: string){
                  console.log('PATH ', path);
                  
                  this.lista_estado = 'Loader'
                  Promise.resolve(store.dispatch('getDadosPaginados',{
                        'roter_interna': 'log_req',
                        'roter_externa': 'logrequisicao',
                        'request': path,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  })).then((dados)=>{
                              this.dado_paginado.body = store.getters.getLogReq
                              console.log(this.dado_paginado.body);
                              if(this.ITEM_PAGINA_MAX != 0){
                                    this.NUMERO_PAGINA = Math.ceil(store.getters.getLogReqLength / this.ITEM_PAGINA_MAX);
                              }else{
                                    this.NUMERO_PAGINA = 1;
                              }
                              this.lista_estado = 'Lista'
                  })
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'log_req'"/>
            <div class="col-12 col-lg-10" id="content">
                  <BuscaEmpresaDateComponent
                        :rota_externa="'logrequisicao'"
                        @request_filtro="(args: string)=> requisicao(args)"
                  />
                  <LoaderListaComponent v-if="lista_estado == 'Loader'" 
                        :header="dado_paginado.header"
                        :quantidade_dados="ITEM_PAGINA_MAX"
                  />
                  <ListaComponent v-if="lista_estado == 'Lista'"
                        :have_item_p_pagina="true"
                        :have_pagination="true"     
                        :dados="dado_paginado"
                        :pagina="1"
                        :item_p_pagina="ITEM_PAGINA_MAX"
                        :pagina_max="NUMERO_PAGINA"
                        :rota_edicao="''"
                        :ModalContent_Remocao="[]"
                        
                  />
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