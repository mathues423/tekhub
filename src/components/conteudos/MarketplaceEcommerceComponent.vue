<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components//util/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';


export default defineComponent({
      template: '#Empre_comp',
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
            deletar(arg: object){
                  this.$emit('deletar', arg)
            },
            ordenaMarketplaceEcommerce(arg: object){
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
                  :rota_edicao="'integracoesmarketplacesecommerces'"
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
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'integracoesmarketplacesecommerces'"
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