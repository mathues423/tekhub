<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components/util/Loaders/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';
import ListaCardComponent from '../util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '../util/Loaders/LoaderListaCardComponent.vue';


export default defineComponent({
      template: '#Empre_comp',
      data() {
          return{
            its_card: false,
            largura: window.innerWidth
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
            FiltroPaiComponent,
            ListaCardComponent,
            LoaderListaCardComponent
      },
      mounted(){
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
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado['header' as keyof typeof dado]"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista MarketplaceEcommerces Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
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
            <ListaComponent v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
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

            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista MarketplaceEcommerces Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && its_card"
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
            <!-- Card Lista MarketplaceEcommerces -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && its_card"
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