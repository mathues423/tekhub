<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import MarketplaceEcommerceComponent from '@/components/conteudos/MarketplaceEcommerceComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue'
import BuscaEmpresaComponent from '@/components/util/BuscaEmpresaComponent.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';
import store from '@/store';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  lista_estado: 'Loader',
                  itsOnEmpresa: false,
                  id_empresa: -1,
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

                              {'header': 'Canal', 'key_body': 'ambienteCanalAlias',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
                              'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':true},

                              {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable':false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_pesquisa:{
                        header:[
                              {'header': 'Código', 'key_body': 'codigo',
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Canal', 'key_body': 'ambienteCanalAlias',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
                              'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable':false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_parametro:{
                        header: [] as Array<object>,
                        body: [] as Array<object>
                  },
                  inRequestEmpresa: false,

                  request_pesquisa: '',
                  is_in_DeletModal: false,
                  is_deletando: false
            }
      },
      components:{
            NavbarComplet,
            MarketplaceEcommerceComponent,
            CriarBotaoComponent,
            VersaoMaximisada,
            BuscaEmpresaComponent,
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      async mounted() {
            this.dado_parametro.header = this.dado_paginado.header;
            this.requestDados()
            // if(store.getters.getMarketplaceEcommerce != undefined){
            //       this.dado_paginado.body = await store.getters.getMarketplaceEcommerce
            //       store.dispatch('getPaginas', 'marketplaceecommerce').then((value) => this.pagina_atual = value)
            //       this.NUMERO_PAGINA = Math.ceil(await store.getters.getMarketplaceEcommerceLength / this.ITEM_PAGINA_MAX);
            //       this.lista_estado = 'Lista'
            //       this.dado_parametro = this.dado_paginado;
            // }else{
            //       this.requestDados()
            // }
      },
      methods:{
            adicionarNewmarketplaceecommerce(){
                  router.push('/integracoesmarketplacesecommerces/0');
            },
            request_empresa(id: number){
                  this.inRequestEmpresa = true
                  this.lista_estado = 'Loader'
                  Promise.resolve(fetch_.getDado('/empresa/'+id+`?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`))
                  .then((arg)=>{
                        this.inRequestEmpresa = false;
                        this.dado_parametro.body = arg.data.integracoes;
                        this.lista_estado = 'Lista';
                        this.itsOnEmpresa = true;
                        this.id_empresa = id;
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            deletar(objeto: {codigo: string}){
                  this.is_deletando = false;
                  this.is_in_DeletModal = true;
                  const rota_interna = this.itsOnFilter ? 'marketplaceecommerce_pesquisa' : 'marketplaceecommerce';
                  let aux = {'roter_externa': 'integracaomarketplaceecommerce', 'id': objeto.codigo, 'roter_interna': rota_interna}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(() => {
                        if (this.itsOnFilter) {
                              this.getPesquisa(this.request_pesquisa)
                        }else{
                              this.requestDados()
                        }
                        this.is_deletando = false;
                  }).catch((error_retorno)=> {
                        this.is_deletando = false;
                        this.is_in_DeletModal = false;
                        this.showError(error_retorno)
                  })
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        if (this.itsOnFilter) {
                              this.getPesquisa(this.request_pesquisa)
                        }else{
                              this.requestDados()
                        }
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        if (this.itsOnFilter) {
                              this.getPesquisa(this.request_pesquisa)
                        }else{
                              this.requestDados()
                        }
                  }
            },
            async requestDados(){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'marketplaceecommerce',
                        'roter_externa': 'integracaomarketplaceecommerce',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.dado_paginado.body = store.getters.getMarketplaceEcommerce;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getMarketplaceEcommerceLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista';
                        this.dado_parametro = this.dado_paginado;
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            ordenaMarketplaceEcommerce(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
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
                  const rota_interna = this.itsOnFilter ? 'marketplaceecommerce_pesquisa' : 'marketplaceecommerce';
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': rota_interna,
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            },
            filtraMarketplaceEcommerce(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarMarketplaceEcommerce(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
                  this.pagina_atual = 1;
                  this.requestDados()
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  this.request_pesquisa = request;
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'marketplaceecommerce_pesquisa',
                        'roter_externa': 'integracaomarketplaceecommerce',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc&`+this.request_pesquisa,
                        'pagina_atual': this.pagina_atual,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        if(this.ITEM_PAGINA_MAX > 0){
                              this.NUMERO_PAGINA = Math.ceil(store.getters.getMarketplaceEcommerce_pesquisaLength / this.ITEM_PAGINA_MAX);
                        }else{
                              this.NUMERO_PAGINA = 1;
                        }
                        this.dado_pesquisa.body = store.getters.getMarketplaceEcommerce_pesquisa;
                        this.lista_estado = 'Lista'
                        this.dado_parametro = this.dado_pesquisa
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            quantidadeItens(args: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = args;
                  if (this.itsOnEmpresa) {
                        this.request_empresa(this.id_empresa)
                  }else{
                        this.requestDados()
                  }
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErroServer(){
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
                  :lateral="'mark_ecom'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <BuscaEmpresaComponent 
                              :inRequest="inRequestEmpresa"
                              @id_empresa="(arg)=> request_empresa(arg)"
                              @Erro_fetch="(arg)=> showError(arg)"
                        />
                        <CriarBotaoComponent @criar="adicionarNewmarketplaceecommerce"/>
                        <MarketplaceEcommerceComponent
                              :is_deletando="is_deletando"
                              :header_info="dado_paginado.header"

                              :ITEM_PAGINA_MAX="ITEM_PAGINA_MAX"
                              :NUMERO_PAGINA="NUMERO_PAGINA"
                              :pagina_atual="pagina_atual"
                              :dado="dado_parametro"
                              :itsOnFilter="itsOnFilter"
                              :lista_estado="lista_estado"
      
                              @deletar="(arg : any) => deletar(arg)"
      
                              @filtraMarketplaceEcommerce="filtraMarketplaceEcommerce"
                              @closefiltrarMarketplaceEcommerce="closefiltrarMarketplaceEcommerce"
                              @ordenaMarketplaceEcommerce="(arg : any) => ordenaMarketplaceEcommerce(arg)"
                              @quantidadeItens="(args: number)=> quantidadeItens(args)"
                              @avancaPagina="avancaPagina" 
                              @recuarPagina="recuarPagina"
                              @getPesquisa="(args: string) => {
                                                pagina_atual = 1
                                                getPesquisa(args)
                                          }"

                              :is_in_DeletModal="is_in_DeletModal"
                              @fecharModalDelet="()=> is_in_DeletModal = false"
                              @abrirModalDelet="()=> is_in_DeletModal = true"
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
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>