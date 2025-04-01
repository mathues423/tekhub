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
            lista_opc_pagina_card: [
                  {'text': '12', 'value': 12},
                  {'text': '30', 'value': 30},
                  {'text': '60', 'value': 60},
                  {'text': '120', 'value': 120},
            ],
            lista_opc_pagina_not_card: [
                  {'text': '10', 'value': 10},
                  {'text': '25', 'value': 25},
                  {'text': '50', 'value': 50},
                  {'text': '100', 'value': 100},
                  {'text': '200', 'value': 200},
                  {'text': '300', 'value': 300},
            ],
            ITEM_PAGINA_MAX_local: this.ITEM_PAGINA_MAX,
            its_card: false,
            largura: window.innerWidth,
            opc_filtrot_selected: undefined as object | undefined,
          }
      },
      watch:{
            ITEM_PAGINA_MAX(value){
                  this.ITEM_PAGINA_MAX_local = value;
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
            is_in_DeletModal:{
                  type: Boolean,
                  required: true
            },
            header_info:{
                  type: Object,
                  required: true
            },
            is_deletando:{
                  type: Boolean,
                  required: true
            },
            disable_botao_delet:{
                  type: Boolean,
                  required: true
            }
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
                  if (this.largura <= 960) { //col-lg
                        this.its_card = true;
                        this.ITEM_PAGINA_MAX_local = 12;
                  }else{
                        this.its_card = false;
                        this.ITEM_PAGINA_MAX_local = 10;
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
            filtraMapeamentoProduto(title: object){
                  this.opc_filtrot_selected = title
                  this.$emit('filtraMapeamentoProduto', title)
            },
            select_pag(value: number){
                  this.$emit('select_pag', value)
            },
            quantidadeItens(args: number){
                  this.$emit('quantidadeItens', args)
            }
      },
      emits:['getPesquisa','closefiltrarMapeamentoProduto','deletar', 'quantidadeItens',
      'ordenaMapeamentoProduto','filtraMapeamentoProduto','select_pag',
      'fecharModal', 'abrirModal']
})
</script>

<template id="MapPro_comp">
      <v-row no-gutters>
            <v-col class="v-col-1"></v-col>
            <v-col class="v-col-10">
                  <FiltroPaiComponent v-if="!its_card"
                        :itsOnFilter="itsOnFilter"
                        :header="header_info"
                        :opc_default="opc_filtrot_selected"
                        @pesquisa_request="(args: string) => getPesquisa(args)"
                        @close_pesquisa="closefiltrarMapeamentoProduto"
                  />
      
                  <!-- Loader -->
                  <LoaderListaComponent v-if="lista_estado == 'Loader' && (itsOnRequestPesquisa || itsOnFilter) && !its_card" 
                        :header="dado.header"
                        :quantidade_dados="ITEM_PAGINA_MAX_local"
                  />
                  <!-- Lista Mapeamento não filtrada -->
                  <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                        :lista_opc_paginas="lista_opc_pagina_not_card"
                        :have_item_p_pagina="true"
                        :have_pagination="true"
                        :have_expancion="false"
                        :dados="dado"
                        :pagina="pagina_atual"
                        :item_p_pagina="ITEM_PAGINA_MAX_local"
                        :pagina_max="NUMERO_PAGINA"
                        :rota_edicao="'mapeamentoprodutos'"
                        :ModalContent_Remocao="[
                              {'nome': 'Produto ERP', 'key': 'produtoErp'},
                              {'nome': 'Produto Site', 'key': 'produtoSite'},
                              {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                        ]"
                        @deletarDadoPai="(arg) => deletar(arg)"
                        @ordenarDadoPai="(arg) => ordenaMapeamentoProduto(arg)"
                        @filtrarDadoPai="(arg: object)=> filtraMapeamentoProduto(arg)"
                        @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                        @select_paginacao="(value: number)=> select_pag(value)" 
                        
                        :deletando="is_deletando"
                        :disabled_btn="disable_botao_delet"
                        :showDeletModal="is_in_DeletModal"
                        @fecharModal="$emit('fecharModal')"
                        @abrirModal="$emit('abrirModal')"
                  />
                  <!-- Lista fildrada -->
                  <ListaComponent  v-if="lista_estado == 'Lista_filtrada' && itsOnFilter && !its_card"
                        :lista_opc_paginas="lista_opc_pagina_not_card"
                        :have_item_p_pagina="true"
                        :have_pagination="true"
                        :have_expancion="false"
                        :dados="dado"
                        :pagina="pagina_atual"
                        :item_p_pagina="ITEM_PAGINA_MAX_local"
                        :pagina_max="NUMERO_PAGINA"
                        :rota_edicao="'mapeamentoprodutos'"
                        :ModalContent_Remocao="[
                              {'nome': 'Produto ERP', 'key': 'produtoErp'},
                              {'nome': 'Produto Site', 'key': 'produtoSite'},
                              {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                        ]"
                        @deletarDadoPai="(arg: object) => deletar(arg)"
                        @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                        @select_paginacao="(value: number)=> select_pag(value)"
                        
                        :deletando="is_deletando"
                        :disabled_btn="disable_botao_delet"
                        :showDeletModal="is_in_DeletModal"
                        @fecharModal="$emit('fecharModal')"
                        @abrirModal="$emit('abrirModal')"
                  />
      
      
                  <LoaderListaCardComponent v-if="lista_estado == 'Loader' && (itsOnRequestPesquisa || itsOnFilter) && its_card"
                        :header="dado.header"
                        :quantidade_dados="ITEM_PAGINA_MAX_local"
                  />
                  <!-- Card Lista Mapeamento Pesquisa -->
                  <ListaCardComponent v-if="lista_estado == 'Lista_filtrada' && itsOnFilter && its_card"
                        :lista_opc_paginas="lista_opc_pagina_card"
                        :header_info="header_info"
                        :have_item_p_pagina="true"
                        :have_pagination="true"
                        :have_expancion="false"
                        :dados="dado"
                        :pagina="pagina_atual"
                        :item_p_pagina="ITEM_PAGINA_MAX_local"
                        :pagina_max="NUMERO_PAGINA"
                        :rota_edicao="'mapeamentoprodutos'"
                        :ModalContent_Remocao="[
                              {'nome': 'Produto ERP', 'key': 'produtoErp'},
                              {'nome': 'Produto Site', 'key': 'produtoSite'},
                              {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                        ]"
                        @deletarDadoPai="(arg: object) => deletar(arg)"
                        @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                        @select_paginacao="(value: number)=> select_pag(value)" 
                        
                        :deletando="is_deletando"
                        :disabled_btn="disable_botao_delet"
                        :showDeletModal="is_in_DeletModal"
                        @fecharModal="$emit('fecharModal')"
                        @abrirModal="$emit('abrirModal')"
                  />
                  <!-- Card Lista Mapeamento -->
                  <ListaCardComponent v-if="lista_estado == 'Lista' && !itsOnFilter && its_card"
                        :lista_opc_paginas="lista_opc_pagina_card"
                        :header_info="header_info"
                        :have_item_p_pagina="true"
                        :have_pagination="true"
                        :have_expancion="false"
                        :dados="dado"
                        :pagina="pagina_atual"
                        :item_p_pagina="ITEM_PAGINA_MAX_local"
                        :pagina_max="NUMERO_PAGINA"
                        :rota_edicao="'mapeamentoprodutos'"
                        :ModalContent_Remocao="[
                              {'nome': 'Produto ERP', 'key': 'produtoErp'},
                              {'nome': 'Produto Site', 'key': 'produtoSite'},
                              {'nome': 'Produto Pai Site', 'key': 'produtoPaiSite'},
                        ]"
                        @deletarDadoPai="(arg: object) => deletar(arg)"
                        @ordenarDadoPai="(arg: object) => ordenaMapeamentoProduto(arg)"
                        @filtrarDadoPai="(arg: object)=> filtraMapeamentoProduto(arg)"
                        @trocarQuandidadeDadoPai="(args: number)=> quantidadeItens(args)"
                        @select_paginacao="(value: number)=> select_pag(value)" 
                        
                        :deletando="is_deletando"
                        :disabled_btn="disable_botao_delet"
                        :showDeletModal="is_in_DeletModal"
                        @fecharModal="$emit('fecharModal')"
                        @abrirModal="$emit('abrirModal')"
                  />
            </v-col>
            <v-col class="v-col-1"></v-col>
      </v-row>
      
</template>