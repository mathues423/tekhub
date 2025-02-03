<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue'
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue'
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';
import store from '@/store';
import MapeamentoProdutoComponent from '@/components/conteudos/MapeamentoProdutoComponent.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import regra_map from '@/services/regras_negocio/regras_mapeamentoprodutos'
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  lista_estado: 'Loader',
                  inRequestCanal: false,
                  inRequestPesquisa: false,
                  itsOnFilter: false,
                  ITEM_PAGINA_MAX : 10,
                  NUMERO_PAGINA: 1,
                  pagina_atual: 1,
                  dado_paginado:{
                        header:[
                              {'header': 'Produto ERP', 'key_body': 'produtoErp',
                              'ordem':{'on': true,'tipo_obj': 'String', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': true},
                              
                              {'header': 'Produto Site', 'key_body': 'produtoSite',
                              'ordem':{'on': false,'tipo_obj': 'String', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': true},

                              {'header': 'Produto Pai Site', 'key_body': 'produtoPaiSite',
                              'ordem':{'on': false,'tipo_obj': 'String', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': true},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable': false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_pesquisa:{
                        header:[
                              {'header': 'Produto ERP', 'key_body': 'produtoErp',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': false},

                              {'header': 'Produto Site', 'key_body': 'produtoSite',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': false},

                              {'header': 'Produto Pai Site', 'key_body': 'produtoPaiSite',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable': false},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable': false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_parametro:{'header': [{}], 'body': [{}]},
                  dado_canais:{},
                  dado_empresa_selected:{},
                  canal_selected:{},
                  escolheu_empresa: false,
                  erros_pesquisa: [''],
                  filtro_erp: '',
                  filtro_site: '',
                  request_pesquisa: '',

                  is_in_DeletModal:false,
                  is_deletando: false
            }
      },
      components:{
            NavbarComplet,
            ErroFormComponent,
            MapeamentoProdutoComponent,
            CriarBotaoComponent,
            LoaderSkeleton,
            EmpresaSelectComponent,
            VersaoMaximisada,
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      watch:{
            dado_empresa_selected(){
                  this.canal_selected = {}; 
                  this.escolheu_empresa = true;
            }
      },
      async mounted() {
            this.inRequestCanal = true;
            Promise.resolve(fetch_.getDado('/integracaomarketplaceecommerce'))
            .then((canal)=> 
                  {
                        this.dado_canais = canal.data;
                        this.inRequestCanal = false;
                  })
            .catch((error_retorno)=> this.showError(error_retorno))
      },
      methods:{
            adicionarMapeamentoProduto(){
                  router.push('/mapeamentoprodutos/0');
            },
            deletar(objeto: {codigo: string}){
                  this.is_deletando = true;
                  this.is_in_DeletModal = true;
                  const rota_interna = this.itsOnFilter ? 'mapeamentoprodudo_pesquisa' : 'mapeamentoprodudo';
                  let aux = {'roter_externa': 'mapeamentoproduto', 'id': objeto.codigo, 'roter_interna': rota_interna}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => {
                              if (this.itsOnFilter) {
                                    this.getPesquisa_filtrada(this.request_pesquisa);
                              }else{
                                    this.requestDados();
                              }
                              this.is_deletando = false;
                        }
                  ).catch((error_retorno)=> {
                        this.showError(error_retorno)
                        this.is_deletando = false;
                        this.is_in_DeletModal = false;
                  })
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        if (this.itsOnFilter) {
                              this.getPesquisa_filtrada(this.request_pesquisa);
                        }else{
                              this.requestDados();
                        }
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        if (this.itsOnFilter) {
                              this.getPesquisa_filtrada(this.request_pesquisa);
                        }else{
                              this.requestDados();
                        }
                  }
            },
            async requestDados(){
                  this.is_in_DeletModal = false;
                  this.dado_parametro.header = this.dado_paginado.header;
                  this.erros_pesquisa = [];
                  regra_map._pesquisa(this.dado_empresa_selected, this.canal_selected, this.erros_pesquisa, this.auth_type);
                  if(this.erros_pesquisa.length != 0){
                        return
                  }
                  // Request
                  const pagina = `?pagina=${this.pagina_atual}`;
                  const porPagina = `&porPagina=${this.ITEM_PAGINA_MAX}`;
                  const ordem = `&ordenacao=codigo&direcao=Asc`;
                  let codigo_empresa;
                  if(this.auth_type == 'ROLE_USER'){
                        codigo_empresa = ''
                  }else{
                        codigo_empresa = `&filtro=empresa.codigo==${this.dado_empresa_selected['codigo' as keyof typeof this.dado_empresa_selected]}`;
                  }
                  const codigo_canal = `&filtro=canal.codigo==${this.canal_selected['ambienteCanalCodigo' as keyof typeof this.canal_selected]}`;
                  let erp = '', site = '';
                  if (this.filtro_erp != '') {
                        erp = `&filtro=produtoErp==${this.filtro_erp}`
                  }
                  if (this.filtro_site != '') {
                        erp = `&filtro=produtoSite==${this.filtro_site}`
                  }

                  this.inRequestPesquisa = true;
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'mapeamentoprodudo',
                        'roter_externa': 'mapeamentoproduto',
                        'request': pagina+porPagina+ordem+codigo_empresa+codigo_canal+erp+site,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.dado_parametro.body = store.getters.getMapeamentoProduto;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getMapeamentoProdutoLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista';
                        this.inRequestPesquisa = false;
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            ordenaMapeamentoProduto(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
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
                        'rota_interna': 'marketplaceecommerce',
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            },
            filtraMapeamentoProduto(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Lista_filtrada'
            },
            closefiltrarMapeamentoProduto(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
                  this.pagina_atual = 1;
                  this.requestDados();
            },
            getPesquisa_filtrada(request: string){
                  this.request_pesquisa = request;
                  
                  this.dado_parametro.header = this.dado_pesquisa.header;
                  this.erros_pesquisa = [];
                  if(!this.dado_empresa_selected['codigo' as keyof typeof this.dado_empresa_selected] || !this.canal_selected['codigo' as keyof typeof this.canal_selected]){
                        if(!this.dado_empresa_selected['codigo' as keyof typeof this.dado_empresa_selected] && this.auth_type != 'ROLE_USER'){
                              this.erros_pesquisa.push('empresa')
                              return
                        }
                        if(!this.canal_selected['codigo' as keyof typeof this.canal_selected]){
                              this.erros_pesquisa.push('canal')
                              return
                        }
                  }
                  this.lista_estado = 'Loader'
                  let codigo_empresa;
                  if(this.auth_type == 'ROLE_USER'){
                        codigo_empresa = ''
                  }else{
                        codigo_empresa = `&filtro=empresa.codigo==${this.dado_empresa_selected['codigo' as keyof typeof this.dado_empresa_selected]}`;
                  }
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'mapeamentoprodudo_pesquisa',
                        'roter_externa': 'mapeamentoprodudo',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`+codigo_empresa+`&`+this.request_pesquisa,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then((le) => {
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getMapeamentoProduto_pesquisaLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.dado_parametro.body = store.getters.getMapeamentoProduto_pesquisa;
                        this.lista_estado = 'Lista_filtrada'
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            quantidadeItens(args: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = args;
                  if (this.itsOnFilter) {
                        this.getPesquisa_filtrada(this.request_pesquisa);
                  }else{
                        this.requestDados();
                  }
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErroServer(){
                  this.inRequestPesquisa = false;
                  this.fetch_error_msg = {};
                  this.have_fetch_error = false;
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'map_pro'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <!-- Pesquisa Card -->
                        <div :class="['row', 'my-1']">
                              <div class="col-lg-1"></div>
                              <div class="Card-Body col-10 row">
                                    <div class="col-4 col-lg-2 form_text" v-if="auth_type != 'ROLE_USER'">
                                          *Empresa: 
                                    </div>
                                    <div class="col-8" v-if="auth_type != 'ROLE_USER'">
                                          <EmpresaSelectComponent
                                                :valor_inicial="{}"
                                                :have_erro="erros_pesquisa.findIndex((x) => x =='empresa') != -1"
                                                @empresa_escolhida="(arg: object)=> dado_empresa_selected = arg"
                                                @erro_fetch="(ret)=> showError(ret)"
                                          />
                                    </div>
                                    <div class="col-12 col-lg-2" v-if="auth_type != 'ROLE_USER'">
                                          <ErroFormComponent
                                                :mensagem="'Informe a Empresa'"
                                                :class="['alert-danger desativada',{'ativada' : erros_pesquisa.indexOf('empresa') != -1 }]"
                                          />
                                    </div>
      
                                    <div class="col-4 col-lg-2 form_text">
                                          *Canal de venda:
                                    </div>
                                    <div class="col-8">
                                          <div v-show="inRequestCanal">
                                                <LoaderSkeleton 
                                                      :tipo_loader="'select'"
                                                />
                                          </div>
                                          <select class="custom-select w-100" v-model="canal_selected" required v-show="!inRequestCanal">
                                                <option selected disabled :value="{}"> Selecione o campo</option>
                                                <option v-for="canal in dado_canais" :key="canal" :value="canal"> {{ canal['ambienteCanalAlias' as keyof typeof canal] }}</option>
                                          </select>
                                    </div>
                                    <div class="col-12 col-lg-2">
                                          <ErroFormComponent
                                                :mensagem="'Informe a Canal'"
                                                :class="['alert-danger desativada',{'ativada' : erros_pesquisa.indexOf('canal') != -1 }]"
                                          />
                                    </div>
                                    <div class="divider">
                                          <hr class="divider">
                                          <span>Filtros</span>
                                    </div>
                                    <!-- Produto Erp -->
                                    <div class="col-4 col-lg-2 form_text">
                                          Produto Erp:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="filtro_erp">
                                          <!-- <ErroFormComponent
                                          :mensagem="''"
                                          :class="['alert-danger desativada',{'ativada' : erros_pesquisa.indexOf('filtro_erp') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-12"></div>
                                    <!-- Produto Site -->
                                    <div class="col-4 col-lg-2 form_text">
                                          Produto Site:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="filtro_site">
                                          <!-- <ErroFormComponent
                                          :mensagem="''"
                                          :class="['alert-danger desativada',{'ativada' : erros_pesquisa.indexOf('filtro_site') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-12"></div>

                                    <div class="col-2 col-lg-1"></div>
                                    <div class="col">
                                          <button class="btn btn-light" @click="requestDados" :disabled="inRequestPesquisa">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                </svg>
                                                Pesquisa 
                                          </button>
                                    </div>
                              </div>
                              
                        </div>
      
                        <CriarBotaoComponent @criar="adicionarMapeamentoProduto"/>
                        <MapeamentoProdutoComponent
                              :is_deletando="is_deletando"
                              :is_in_DeletModal="is_in_DeletModal"
                              :header_info="dado_paginado.header"

                              :lista_estado="lista_estado"
                              :itsOnFilter="itsOnFilter"
                              :itsOnRequestPesquisa="inRequestPesquisa"
                              :ITEM_PAGINA_MAX="ITEM_PAGINA_MAX"
                              :NUMERO_PAGINA="NUMERO_PAGINA"
                              :pagina_atual="pagina_atual"
                              :dado="dado_parametro"
      
                              @getPesquisa="(arg: string)=> {
                                          pagina_atual = 1;
                                          getPesquisa_filtrada(arg);
                                    }"
                              @closefiltrarMapeamentoProduto="closefiltrarMapeamentoProduto"
                              @deletar="(arg: any)=> deletar(arg)"
                              @quantidadeItens="(arg: number)=> quantidadeItens(arg)"
                              @ordenaMapeamentoProduto="(arg: any)=> ordenaMapeamentoProduto(arg)"
                              @filtraMapeamentoProduto="filtraMapeamentoProduto"
                              @avancaPagina="avancaPagina"
                              @recuarPagina="recuarPagina"

                              :showDeletModal="is_in_DeletModal"
                              @fecharModal="()=> is_in_DeletModal = false"
                              @abrirModal="()=> is_in_DeletModal = true"
                        />
                  </span>
                  <span v-else>
                        <ErroResponseComponent
                              :error_msg="fetch_error_msg"
                              @voltar="have_fetch_error = false"
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
div.divider{
      text-align: center;
      display: table;
}
div.divider > span{
      display: inline-block;
      color:black;
      font-size: 20px;
}
hr.divider{
      margin: auto;
}
.form_text{
      font-size: 14px;
      color: var(--bs-black);
      text-align: right;
}
.Card-Body >div{
      padding-top: 10px;
}
.custom-select{
      background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
      background-size: 8px 10px;
      padding: .375rem .75rem .375rem .75rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #495057;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: inline-block;
      
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>