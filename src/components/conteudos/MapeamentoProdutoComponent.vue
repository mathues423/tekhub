<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components//util/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';


export default defineComponent({
      template: '#MapPro_comp',
      data() {
          return {
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
            FiltroPaiComponent
      },
      methods:{
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
            <LoaderListaComponent v-if="lista_estado == 'Loader' && (itsOnRequestPesquisa || itsOnFilter)" 
                  :header="dado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Mapeamento não filtrada -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :dados="dado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'dashboard'"
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
            <ListaComponent  v-if="lista_estado == 'Lista_filtrada' && itsOnFilter"
                  :dados="dado"
                  :pagina="1"
                  :pagina_max="1"
                  :item_p_pagina="0"
                  :rota_edicao="'dashboard'"
                  :ModalContent_Remocao="[
                        {'nome': 'Produto ERP', 'key': 'produtoErp'},
                        {'nome': 'Produto Site', 'key': 'produtoSite'},
                        {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
            />
            
            Dado {{ dado }}<br><br>

      </div>
</template>

<style scoped>

</style>