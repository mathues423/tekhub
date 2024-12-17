<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components/util/Loaders/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';
import ListaCardComponent from '../util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '../util/Loaders/LoaderListaCardComponent.vue';


export default defineComponent({
      template: '#MapPro_comp',
      data() {
          return {
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
            itsOnRequestPesquisa:{
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
      mounted() {
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
            closefiltrarMapeamentoProduto(){
                  this.$emit('closefiltrarMapeamentoProduto')
            },
            deletar(arg: object){
                  this.$emit('deletar', arg)
            },
            ordenaMapeamentoProduto(arg: object){
                  this.$emit('ordenaMapeamentoProduto', arg)
            },
            filtraMapeamentoProduto(){
                  this.$emit('filtraMapeamentoProduto')
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
      emits:['getPesquisa','closefiltrarMapeamentoProduto','deletar', 'quantidadeItens',
      'ordenaMapeamentoProduto','filtraMapeamentoProduto','avancaPagina','recuarPagina']
})
</script>

<template id="MapPro_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado['header' as keyof typeof dado]"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarMapeamentoProduto"
            />

            <!-- Loader -->
            <LoaderListaComponent v-if="lista_estado == 'Loader' && (itsOnRequestPesquisa || itsOnFilter) && !its_card" 
                  :header="dado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Mapeamento não filtrada -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'mapeamentoprodutos'"
                  :ModalContent_Remocao="[
                        {'nome': 'Produto ERP', 'key': 'produtoErp'},
                        {'nome': 'Produto Site', 'key': 'produtoSite'},
                        {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => ordenaMapeamentoProduto(arg)"
                  @filtrarDadoPai="filtraMapeamentoProduto"
                  @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
            <!-- Lista fildrada -->
            <ListaComponent  v-if="lista_estado == 'Lista_filtrada' && itsOnFilter && !its_card"
                  :dados="dado"
                  :pagina="1"
                  :pagina_max="1"
                  :item_p_pagina="0"
                  :rota_edicao="'mapeamentoprodutos'"
                  :ModalContent_Remocao="[
                        {'nome': 'Produto ERP', 'key': 'produtoErp'},
                        {'nome': 'Produto Site', 'key': 'produtoSite'},
                        {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                  ]"
                  @deletarDadoPai="(arg: object) => deletar(arg)"
            />


            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && (itsOnRequestPesquisa || itsOnFilter) && its_card"
                  :header="dado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Mapeamento Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista_filtrada' && itsOnFilter && its_card"
                  :dados="dado"
                  :pagina="1"
                  :pagina_max="1"
                  :item_p_pagina="0"
                  :rota_edicao="'mapeamentoprodutos'"
                  :ModalContent_Remocao="[
                        {'nome': 'Produto ERP', 'key': 'produtoErp'},
                        {'nome': 'Produto Site', 'key': 'produtoSite'},
                        {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                  ]"
                  @deletarDadoPai="(arg: object) => deletar(arg)"
            />
            <!-- Card Lista Mapeamento -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && !itsOnFilter && its_card"
            :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'mapeamentoprodutos'"
                  :ModalContent_Remocao="[
                        {'nome': 'Produto ERP', 'key': 'produtoErp'},
                        {'nome': 'Produto Site', 'key': 'produtoSite'},
                        {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                  ]"
                  @deletarDadoPai="(arg: object) => deletar(arg)"
                  @ordenarDadoPai="(arg: object) => ordenaMapeamentoProduto(arg)"
                  @filtrarDadoPai="filtraMapeamentoProduto"
                  @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>