<script lang="ts">
import { defineComponent, PropType } from 'vue';
import store from '@/store';
import ListaComponent from '@/components//util/lista/ListaComponent.vue';
import LoaderListaComponent from '@/components/util/Loaders/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';
import ListaCardComponent from '../util/lista/ListaCardComponent.vue';
import LoaderListaCardComponent from '../util/Loaders/LoaderListaCardComponent.vue';

export default defineComponent({
      template: '#Empre_comp',
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
            lista_estado: 'Loader',
            itsOnFilter: false,
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'ordem':{'on': true,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Código Tek', 'key_body': 'codigoTek',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Razão Social', 'key_body': 'descricao',
                        'ordem':{'on': false,'tipo_obj': 'String', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'CNPJ', 'key_body': 'cnpj',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Versão API', 'key_body': 'versaoApiTek',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
            dado_pesquisa:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Código Tek', 'key_body': 'codigoTek',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Razão Social', 'key_body': 'descricao',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'CNPJ', 'key_body': 'cnpj',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Versão API', 'key_body': 'versaoApiTek',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
            its_card: false,
            largura: window.innerWidth,

            request_pesquisa: '',
            is_in_DeletModal: false,
            is_deletando: false,
            disable_botao_delet: false,
            opc_filtrot_selected: undefined,
          }
      },
      components:{
            LoaderListaComponent,
            ListaComponent,
            ListaCardComponent,
            FiltroPaiComponent,
            LoaderListaCardComponent
      },
      async mounted() {
            this.onResize()
            this.$nextTick(()=> window.addEventListener('resize', this.onResize))
            this.requestDados()
            // if(store.getters.getEmpresas != undefined){
            //       this.dado_paginado.body = await store.getters.getEmpresas
            //       store.dispatch('getPaginas', 'empresas').then((value) => this.pagina_atual = value)
            //       this.NUMERO_PAGINA = Math.ceil(await store.getters.getEmpresasLength / this.ITEM_PAGINA_MAX);
            //       this.lista_estado = 'Lista'
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
                  this.is_deletando = this.is_in_DeletModal = this.disable_botao_delet = true;
                  const rota_interna = this.itsOnFilter ? 'empresas_pesquisa' : 'empresas';
                  let aux = {'roter_externa': 'empresa', 'id': objeto.codigo, 'roter_interna': rota_interna}
                  store.dispatch('delDadosID', aux)
                  .then(
                        () => {
                              this.is_deletando = false;
                              this.is_in_DeletModal = true;
                              this.disable_botao_delet = false;
                              if (this.itsOnFilter) {
                                    this.getPesquisa(this.request_pesquisa);
                              }else{
                                    this.requestDados();
                              }
                        }
                  ).catch((error_retorno)=> {
                        this.is_in_DeletModal = false;
                        this.is_deletando = false;
                        this.disable_botao_delet = false;
                        this.$emit('erro_fetch', error_retorno);
                  })
            },
            select_pag(value: number){
                  this.pagina_atual = value;
                  if (this.itsOnFilter) {
                        this.getPesquisa(this.request_pesquisa);
                  }else{
                        this.requestDados();
                  }
            },
            async requestDados(){
                  this.is_in_DeletModal = false;
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'empresas',
                        'roter_externa': 'empresa',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX      
                  }).then(() => {
                        this.dado_paginado.body = store.getters.getEmpresas;
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getEmpresasLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.lista_estado = 'Lista'
                  }).catch((error_retorno)=> this.$emit('erro_fetch', error_retorno))
            },
            ordenaEmpresa(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
                  this.dado_paginado.header.forEach(
                        (valor) => {
                              if(valor.ordem?.on != undefined){
                                    valor.ordem.on = false;
                              }
                        })
                  if (title.ordem.tipo_ordenacao == 'Asc') {
                        title.ordem.tipo_ordenacao = 'Desc'
                  }else{
                        title.ordem.tipo_ordenacao = 'Asc'
                  }
                  title.ordem.on = true;
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': 'empresas',
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            },
            filtraEmpresa(title: any){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
                  this.opc_filtrot_selected = title;
            },
            closefiltrarEmpresa(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
                  this.pagina_atual = 1;
                  this.requestDados()
            },
            getPesquisa(request: string){
                  this.is_in_DeletModal = false;
                  this.lista_estado = 'Loader'
                  this.request_pesquisa = request;
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'empresas_pesquisa',
                        'roter_externa': 'empresa',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc&`+this.request_pesquisa,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getEmpresas_pesquisaLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.dado_pesquisa.body = store.getters.getEmpresas_pesquisa;
                        this.lista_estado = 'Lista';
                  }).catch((error_retorno)=> this.$emit('erro_fetch', error_retorno))
            },
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  if (this.itsOnFilter) {
                        this.getPesquisa(this.request_pesquisa)
                  }else{
                        this.requestDados()
                  }
            }
      },
      emits:['erro_fetch']
})
</script>

<template id="Empre_comp">
<div>
      <v-row>
            <!-- MODIFICADO -->
            <FiltroPaiComponent v-if="!its_card"
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  :opc_default="opc_filtrot_selected" 
                  @pesquisa_request="(args: string) => {
                        pagina_atual = 1
                        getPesquisa(args)
                  }"
                  @close_pesquisa="closefiltrarEmpresa"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Empresas Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
                  :dados="dado_pesquisa"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @select_paginacao="(value: number)=> select_pag(value)"
                  
                  :deletando="is_deletando"
                  :disabled_btn="disable_botao_delet"
                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="is_in_DeletModal = false"
                  @abrirModal="is_in_DeletModal = true"
            />
            <!-- Lista Empresas -->
            <ListaComponent v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :lista_opc_paginas="lista_opc_pagina_not_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaEmpresa(arg)"
                  @filtrarDadoPai="(arg: object)=> filtraEmpresa(arg)"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @select_paginacao="(value: number)=> select_pag(value)"
                  
                  :deletando="is_deletando"
                  :disabled_btn="disable_botao_delet"
                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="is_in_DeletModal = false"
                  @abrirModal="is_in_DeletModal = true"
            />
            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Empresa Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && itsOnFilter && its_card"
                  :lista_opc_paginas="lista_opc_pagina_card"
                  :header_info="dado_paginado.header"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
                  :have_expancion="false"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="ITEM_PAGINA_MAX"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @select_paginacao="(value: number)=> select_pag(value)"
                  
                  :deletando="is_deletando"
                  :disabled_btn="disable_botao_delet"
                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="is_in_DeletModal = false"
                  @abrirModal="is_in_DeletModal = true"
            />
            <!-- Card Lista Empresa -->
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
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaEmpresa(arg)"
                  @filtrarDadoPai="(arg: object)=> filtraEmpresa(dado_paginado.header[0])"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @select_paginacao="(value: number)=> select_pag(value)"
                  
                  :deletando="is_deletando"
                  :disabled_btn="disable_botao_delet"
                  :showDeletModal="is_in_DeletModal"
                  @fecharModal="is_in_DeletModal = false"
                  @abrirModal="is_in_DeletModal = true"
            />
      </v-row>
</div>
</template>