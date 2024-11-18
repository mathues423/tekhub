<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/LoaderListaComponent.vue';


export default defineComponent({
      template: '#Ambi_comp',
      data() {
          return {
            lista_estado: 'Loader',
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'filtro':{'on': false, 'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Canal', 'key_body': 'canalAlias',
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Ambiente', 'key_body': 'ambiente',
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'pre'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            LoaderListaComponent,
            ListaComponent
      },
      mounted() {
            this.requestDados()
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
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`
                        })
                  .then(() => {
                        this.dado_paginado.body = store.getters.getAmbientes;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getAmbientesLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista'
                  })
            },
      },
})
</script>

<template id="Ambi_comp">
      <div class="row">
            <!-- Duvida se ediçaõ seria um modal tbm ou so uma div msm -->
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <ListaComponent  v-if="lista_estado == 'Lista'"
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
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
                  />
      </div>
</template>

<style scoped>

</style>