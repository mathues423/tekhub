<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/LoaderListaComponent.vue';
import FiltroPaiComponent from '../util/busca/FiltroPaiComponent.vue';


export default defineComponent({
      template: '#Ambi_comp',
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
                        'filtro':{'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Canal', 'key_body': 'canalAlias',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Ambiente', 'key_body': 'ambiente',
                        'filtro':{'tipo_obj': 'String', 'tipo_filtro': 'pre'},
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

                        {'header': 'Canal', 'key_body': 'canalAlias',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ambiente', 'key_body': 'ambiente',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            LoaderListaComponent,
            FiltroPaiComponent,
            ListaComponent
      },
      async mounted() {
            if(store.getters.getAmbientes != undefined){
                  this.lista_estado = 'Lista'
                  this.dado_paginado.body = await store.getters.getAmbientes
                  store.dispatch('getPaginas', 'ambientes').then((value) => this.pagina_atual = value)
                  this.NUMERO_PAGINA = Math.ceil(await store.getters.getAmbientesLength / this.ITEM_PAGINA_MAX);
            }else{
                  this.requestDados()
            }
      },
      methods:{
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'ambiente', 'id': objeto.codigo, 'roter_interna': 'ambientes'}
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
                        'roter_interna': 'ambientes',
                        'roter_externa': 'ambiente',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual
                        })
                  .then(() => {
                        this.dado_paginado.body = store.getters.getAmbientes;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getAmbientesLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista'
                  })
            },
            filtraAmbiente(){
                  this.itsOnFilter = true;
                  this.lista_estado = 'Vazio'
            },
            closefiltrarAmbiente(){
                  this.itsOnFilter = false;
                  this.lista_estado = 'Lista'
            },
            getPesquisa(request: string){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'ambientes_pesquisa',
                        'roter_externa': 'ambiente',
                        'request': request+`&pagina=1&porPagina=0&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': 1
                        })
                  .then(() => {
                        this.dado_pesquisa.body = store.getters.getAmbientes_pesquisa;
                       this.lista_estado = 'Lista'
                  })
            }
      },
})
</script>

<template id="Ambi_comp">
      <div class="row">
            <FiltroPaiComponent 
                  :itsOnFilter="itsOnFilter"
                  :header="dado_paginado.header"
                  @pesquisa_request="(args: string) => getPesquisa(args)"
                  @close_pesquisa="closefiltrarAmbiente"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <!-- Lista Ambientes Pesquisa -->
            <ListaComponent v-if="lista_estado == 'Lista' && itsOnFilter"
                  :dados="dado_pesquisa"
                  :pagina="1"
                  :pagina_max="1"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
            />
            <!-- Lista Ambientes -->
            <ListaComponent  v-if="lista_estado == 'Lista' && !itsOnFilter"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'ambientes'"
                  :ModalContent_Remocao="[
                        {'nome': 'Canal', 'key': 'canalAlias'},
                        {'nome': 'Ambiente', 'key': 'ambiente'},
                        {'nome': 'URL', 'key': 'url'},
                        {'nome': 'Verção', 'key': 'versao'},
                  ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => {return null}"
                  @filtrarDadoPai="filtraAmbiente"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>