<script lang="ts">
import { defineComponent } from 'vue';
import ListaComponent from '../util/lista/ListaComponent.vue';
import store from '@/store';


export default defineComponent({
      template: '#Canl_comp',
      data() {
          return {
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Descrição', 'key_body': 'descricao',
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Alias', 'key_body': 'alias',
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'TIPO', 'key_body': 'tipo',
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Canal associado', 'key_body': 'button',
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            ListaComponent
      },
      props:{
            dados_lista:{
                  type: Array,
                  require: true
            }
      },
      mounted() {
            this.dado_paginado.body = this.dados_lista as Array<object>;
            if (Object.keys(this.dado_paginado.body).length) {
                  this.NUMERO_PAGINA = Math.ceil(Object.keys(this.dado_paginado.body).length / this.ITEM_PAGINA_MAX);
            }
            this.atualizarDadoPaginado();
      },
      methods:{
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'canal', 'id': objeto.codigo, 'roter_interna': 'canais'}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => this.atualizarDadoPaginado()
                  ).catch((error)=> { console.warn(error) })
            },
            avancaPagina(){
                  this.pagina_atual++;
                  this.atualizarDadoPaginado();
            },
            recuarPagina(){
                  this.pagina_atual--;
                  this.atualizarDadoPaginado();
            },
            atualizarDadoPaginado(){
                  this.dado_paginado.body = this.dados_lista?.filter(
                  (value, index) => {
                        if(this.ITEM_PAGINA_MAX *(this.pagina_atual - 1) <= index &&
                        index <  this.ITEM_PAGINA_MAX *this.pagina_atual){
                              return value
                              }
                  }) as Array<object>
            },
      },
})
</script>

<template id="Canl_comp">
      <div class="row">
            <!-- "codigoTek" "descricao""cnpj""versaoApiTek" Para empresa -->
            <!-- Duvida se ediçaõ seria um modal tbm ou so uma div msm -->
            <ListaComponent
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'canais'"
                  
                  :ModalContent_Edicao="[]" 

                  :ModalContent_Remocao="[
                        {'nome': 'Descrição', 'key': 'descricao'},
                        {'nome': 'Alias', 'key': 'alias'},
                        {'nome': 'TIPO', 'key': 'tipo'},
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