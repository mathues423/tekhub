<script lang="ts">
import { defineComponent } from 'vue';
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
            largura: window.innerWidth
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
            this.requestDados()
            // if(store.getters.getEmpresas != undefined){
            //       this.dado_paginado.body = await store.getters.getEmpresas
            //       store.dispatch('getPaginas', 'empresas').then((value) => this.pagina_atual = value)
            //       this.NUMERO_PAGINA = Math.ceil(await store.getters.getEmpresasLength / this.ITEM_PAGINA_MAX);
            //       this.lista_estado = 'Lista'
            // }else{
            //       this.requestDados()
            // }
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

            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'empresa', 'id': objeto.codigo, 'roter_interna': 'empresas'}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => this.requestDados()
                  ).catch((error)=> { console.warn(error) })
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        this.requestDados();
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        this.requestDados();
                  }
            },
            async requestDados(){
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
                  })
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
            filtraEmpresa(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarEmpresa(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'empresas_pesquisa',
                        'roter_externa': 'empresa',
                        'request': `?pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc&`+request,
                        'pagina_atual': 1,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.NUMERO_PAGINA = 1;
                        this.dado_pesquisa.body = store.getters.getEmpresas_pesquisa;
                        this.lista_estado = 'Lista';
                  })
            },
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  this.requestDados()
            }
      },
})
</script>

<template id="Empre_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarEmpresa"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader' && !its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Empresas Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter && !its_card"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista Empresas -->
            <ListaComponent v-if="lista_estado == 'Lista' && !itsOnFilter && !its_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
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
                  @filtrarDadoPai="filtraEmpresa"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"
            />

            <LoaderListaCardComponent v-if="lista_estado == 'Loader' && its_card"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Card Lista Empresa Pesquisa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && its_card"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :item_p_pagina="0"
                  :pagina_max="1"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Card Lista Empresa -->
            <ListaCardComponent v-if="lista_estado == 'Lista' && its_card"
                  :have_item_p_pagina="true"
                  :have_pagination="true"
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
                  @filtrarDadoPai="filtraEmpresa"
                  @trocarQuandidadeDadoPai="(args: number)=> changeItemPagina(args)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"
            />
      </div>
</template>

<style scoped>

</style>