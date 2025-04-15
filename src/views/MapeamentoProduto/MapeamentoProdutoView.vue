<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import CriarBotaoComponent from '@/components/util/Botoes/CriarBotaoComponent.vue'
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';
import store from '@/store';
import MapeamentoProdutoComponent from '@/components/conteudos/MapeamentoProdutoComponent.vue';
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
                  dado_canais:[{}],
                  dado_empresa_selected:{},
                  canal_selected:{},
                  escolheu_empresa: false,
                  erros_pesquisa: [''],
                  filtro_erp: '',
                  filtro_site: '',
                  request_pesquisa: '',

                  is_in_DeletModal:false,
                  is_deletando: false,
                  disable_botao_delet: false
            }
      },
      components:{
            NavbarComplet,
            MapeamentoProdutoComponent,
            CriarBotaoComponent,
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
                  this.is_deletando =this.is_in_DeletModal = this.disable_botao_delet = true;
                  const rota_interna = this.itsOnFilter ? 'mapeamentoproduto_pesquisa' : 'mapeamentoproduto';
                  let aux = {'roter_externa': 'mapeamentoproduto', 'id': objeto.codigo, 'roter_interna': rota_interna}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(() => {
                        this.is_deletando = false;
                        this.is_in_DeletModal = true;
                        this.disable_botao_delet = false;
                        if (this.itsOnFilter) {
                              this.getPesquisa_filtrada(this.request_pesquisa);
                        }else{
                              this.requestDados();
                        }
                  }).catch((error_retorno)=> {
                        this.showError(error_retorno)
                        this.is_deletando = false;
                        this.is_in_DeletModal = false;
                        this.disable_botao_delet = false;
                  })
            },
            select_pag(value: number){
                  this.pagina_atual = value;
                  if (this.itsOnFilter) {
                        this.getPesquisa_filtrada(this.request_pesquisa);
                  }else{
                        this.requestDados();
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
                        'roter_interna': 'mapeamentoproduto',
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
                  
                  const rota_interna = this.itsOnFilter ? 'mapeamentoproduto_pesquisa' : 'mapeamentoproduto';
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': rota_interna,
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
                  this.is_in_DeletModal = false;
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
                        'roter_interna': 'mapeamentoproduto_pesquisa',
                        'roter_externa': 'mapeamentoproduto',
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
            changeItemPagina(quantidade: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = quantidade;
                  if (this.itsOnFilter) {
                        this.getPesquisa_filtrada(this.request_pesquisa)
                  }else{
                        this.requestDados()
                  }
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
            },
            canal_toString(item: any){
                  return{
                        title : item['ambienteCanalAlias' as keyof typeof item],
                        value : item
                  }
            }
      }
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'map_pro'"
                  :user_type="auth_type"
            />
            <v-col class="v-col-12 v-col-md-10">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :time_duration="10"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <!-- Pesquisa Card -->
                        <v-row no-gutters>
                              <v-col class="v-col-1"></v-col>
                              <v-col class="col-10 pt-10">
                                    <!-- Empresa Select -->
                                    <v-col class="v-col-12" v-if="auth_type != 'ROLE_USER'">
                                          <EmpresaSelectComponent
                                                :is_required="true"
                                                :have_erro="erros_pesquisa.findIndex((x) => x =='empresa') != -1"
                                                :mensagem_erro="'Selecione a empresa antes da busca.'"
                                                @empresa_escolhida="(arg: object)=> dado_empresa_selected = arg"
                                                @erro_fetch="(ret)=> showError(ret)"
                                          /> 
                                    </v-col>
                                    <!-- Canal Select -->
                                    <v-col class="col-12">
                                          <v-select
                                                v-model="canal_selected"
                                                :items="dado_canais"
                                                label="*Canal de venda"
                                                :item-props="canal_toString"
                                                :loading="inRequestCanal"
                                                :no-data-text="dado_canais ? 'Nenhum Canal de Venda encontrado' : 'Selecione primeiro a Empresa'"
                                                :error-messages="erros_pesquisa.indexOf('canal') != -1 ? 'Informe a Canal antes da busca.' : undefined"
                                          density="compact" variant="outlined"/>
                                    </v-col>
                                    <!-- Filtros -->
                                    <v-divider> Filtros </v-divider>
                                    <!-- Produto Erp -->
                                    <v-col class="v-col-12">
                                          <v-text-field
                                                v-model="filtro_erp"
                                                label="Produto Erp"
                                          density="compact" variant="outlined"/>
                                    </v-col>
                                    <!-- Produto Site -->
                                    <v-col class="v-col-12">
                                          <v-text-field
                                                v-model="filtro_site"
                                                label="Produto Site"
                                          density="compact" variant="outlined"/>
                                    </v-col>
                                    <!-- Ação -->
                                    <v-col class="v-col-12">
                                          <v-btn
                                                color="info"
                                                @click="requestDados"
                                                prepend-icon="mdi-magnify"
                                                text="Pesquisar"
                                                :disabled="inRequestPesquisa"
                                          />
                                    </v-col>
                              </v-col>
                              <v-col class="v-col-1"></v-col>
                        </v-row>
      
                        <CriarBotaoComponent class="pl-4" @criar="adicionarMapeamentoProduto"/>
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
                              @ordenaMapeamentoProduto="(arg: any)=> ordenaMapeamentoProduto(arg)"
                              @filtraMapeamentoProduto="filtraMapeamentoProduto"
                              @quantidadeItens="(value: number)=> changeItemPagina(value)"
                              @select_pag="(value: number)=> select_pag(value)" 
                              
                              :disable_botao_delet="disable_botao_delet"
                              :showDeletModal="is_in_DeletModal"
                              @fecharModal="is_in_DeletModal = false"
                              @abrirModal="is_in_DeletModal = true"
                        />
                  </span>
                  <span v-else>
                        <ErroResponseComponent
                              :error_msg="fetch_error_msg"
                              @voltar="have_fetch_error = false"
                        />
                  </span>
            </v-col>
            <VersaoMaximisada />
      </v-row>
</template>