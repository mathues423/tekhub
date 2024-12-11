<script lang="ts">
import MarketplaceEcommerceComponent from '@/components/conteudos/MarketplaceEcommerceComponent.vue';
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue'
import BuscaEmpresaComponent from '@/components/util/BuscaEmpresaComponent.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
      data(){
            return {
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
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
                              'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':true},

                              {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
                              'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                              'isfiltrable': true, 'isordenable':false},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable':false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_pesquisa:{
                        header:[
                              {'header': 'Código', 'key_body': 'codigo',
                              'isfiltrable': false, 'isordenable':false},

                              {'header': 'Canal', 'key_body': 'ambienteCanalAlias',
                              'isfiltrable': false, 'isordenable':false},

                              {'header': 'Código da Empresa', 'key_body': 'empresaCodigo',
                              'isfiltrable': false, 'isordenable':false},

                              {'header': 'Descrição da Empresa', 'key_body': 'empresaDescricao',
                              'isfiltrable': false, 'isordenable':false},

                              {'header': 'Ações', 'key_body': 'button',
                              'isfiltrable': false, 'isordenable':false}
                        ],
                        body: [] as Array<object>
                  },
                  dado_parametro:{
                        header: [] as Array<object>,
                        body: [] as Array<object>
                  },
                  inRequestEmpresa: false
            }
      },
      components:{
            NavbarComplet,
            MarketplaceEcommerceComponent,
            CriarBotaoComponent,
            VersaoMaximisada,
            BuscaEmpresaComponent
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
                  })
            },
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'integracaomarketplaceecommerce', 'id': objeto.codigo, 'roter_interna': 'marketplaceecommerce'}
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
                  })
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
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': 'marketplaceecommerce',
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
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'empresas_pesquisa',
                        'roter_externa': 'empresa',
                        'request': request+`&pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': 1,
                        'item_page': this.ITEM_PAGINA_MAX
                  }).then(() => {
                        this.dado_pesquisa.body = store.getters.getMarketplaceEcommerce_pesquisa;
                       this.lista_estado = 'Lista'
                  })
            },
            quantidadeItens(args: number){
                  this.pagina_atual = 1;
                  this.ITEM_PAGINA_MAX = args;
                  if (this.itsOnEmpresa) {
                        this.request_empresa(this.id_empresa)
                  }else{
                        this.requestDados()
                  }
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'mark_ecom'"/>
            <div class="col-10" id="content">
                  <BuscaEmpresaComponent 
                        :inRequest="inRequestEmpresa"
                        @id_empresa="(arg)=> request_empresa(arg)"
                  />
                  <CriarBotaoComponent @criar="adicionarNewmarketplaceecommerce"/>
                  <MarketplaceEcommerceComponent 
                        :ITEM_PAGINA_MAX="ITEM_PAGINA_MAX"
                        :NUMERO_PAGINA="NUMERO_PAGINA"
                        :dado="dado_parametro"
                        :its-on-filter="itsOnFilter"
                        :lista_estado="lista_estado"
                        :pagina_atual="pagina_atual"
                        
                        @deletar="(arg : any) => deletar(arg)"

                        @filtraMarketplaceEcommerce="filtraMarketplaceEcommerce"
                        @closefiltrarMarketplaceEcommerce="closefiltrarMarketplaceEcommerce"

                        @ordenaMarketplaceEcommerce="(arg : any) => ordenaMarketplaceEcommerce(arg)"
                        @quantidadeItens="(args: number)=> quantidadeItens(args)"
                        @avancaPagina="avancaPagina" 
                        @recuarPagina="recuarPagina"
                  />
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