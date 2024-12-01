<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components//util/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';


export default defineComponent({
      template: '#Empre_comp',
      data() {
          return {
            // lista_estado: 'Loader',
            // itsOnFilter: false,
            // ITEM_PAGINA_MAX : 10,
            // NUMERO_PAGINA: 1,
            // pagina_atual: 1,
            // dado_paginado:{
            //       header:[
            //             {'header': 'Código', 'key_body': 'codigo',
            //             'ordem':{'on': true,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
            //             'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
            //             'isfiltrable': true, 'isordenable':true},

            //             {'header': 'Canal', 'key_body': 'ambienteCanalAlias',
            //             'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
            //             'isfiltrable': true, 'isordenable':false},

            //             {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
            //             'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
            //             'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
            //             'isfiltrable': true, 'isordenable':true},

            //             {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
            //             'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
            //             'isfiltrable': true, 'isordenable':false},

            //             {'header': 'Ações', 'key_body': 'button',
            //             'isfiltrable': false, 'isordenable':false}
            //       ],
            //       body: [] as Array<object>
            // },
            // dado_pesquisa:{
            //       header:[
            //       {'header': 'Código', 'key_body': 'codigo',
            //             'isfiltrable': false, 'isordenable':false},

            //             {'header': 'Canal', 'key_body': 'ambienteCanalAlias',
            //             'isfiltrable': false, 'isordenable':false},

            //             {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
            //             'isfiltrable': false, 'isordenable':false},

            //             {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
            //             'isfiltrable': false, 'isordenable':false},

            //             {'header': 'Ações', 'key_body': 'button',
            //             'isfiltrable': false, 'isordenable':false}
            //       ],
            //       body: [] as Array<object>
            // }
          }
      },
      props: {
            lista_estado:{
                  type: String,
                  required: true
            },
            itsOnFilter:{
                  type: Boolean,
                  required: true
            },
            ITEM_PAGINA_MAX:{
                  type: Number,
                  required: true
            },
            NUMERO_PAGINA:{
                  type: Number,
                  required: true
            },
            pagina_atual:{
                  type: Number,
                  required: true
            },
            dado:{
                  type: Object as PropType<{header: Array<object>, body: Array<object>}>,
                  required: true
            },
      },
      components:{
            LoaderListaComponent,
            ListaComponent,
            FiltroPaiComponent
      },
      methods:{
            getPesquisa(args: string){
                  this.$emit('getPesquisa', args)
            },
            closefiltrarMarketplaceEcommerce(){
                  this.$emit('closefiltrarMarketplaceEcommerce')
            },
            deletar(arg: any){
                  this.$emit('deletar', arg)
            },
            ordenaMarketplaceEcommerce(arg: any){
                  this.$emit('ordenaMarketplaceEcommerce', arg)
            },
            filtraMarketplaceEcommerce(){
                  this.$emit('filtraMarketplaceEcommerce')
            },
            avancaPagina(){
                  this.$emit('avancaPagina')
            },
            recuarPagina(){
                  this.$emit('recuarPagina')
            },
            quantidadeItens(args: number){
                  this.$emit('quantidadeItens', args)
            }
      },
      emits:['getPesquisa','closefiltrarMarketplaceEcommerce','deletar', 'quantidadeItens',
      'ordenaMarketplaceEcommerce','filtraMarketplaceEcommerce','avancaPagina','recuarPagina']
})
</script>

<template id="Empre_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado['header' as keyof typeof dado]"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarMarketplaceEcommerce"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado['header' as keyof typeof dado]"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista MarketplaceEcommerces Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter"
                  :dados="dado"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'undefined'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código', 'key': 'codigo'},
                        {'nome': 'Canal', 'key': 'ambienteCanalAlias'},
                        {'nome': 'Código Empresa', 'key': 'empresaCodigo'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista MarketplaceEcommerces -->
            <ListaComponent v-if="lista_estado == 'Lista' && !itsOnFilter"
                  :dados="dado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'undefined'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código', 'key': 'codigo'},
                        {'nome': 'Canal', 'key': 'ambienteCanalAlias'},
                        {'nome': 'Código Empresa', 'key': 'empresaCodigo'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaMarketplaceEcommerce(arg)"
                  @filtrarDadoPai="filtraMarketplaceEcommerce"
                  @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"
            />
      </div>
</template>

<style scoped>

</style>