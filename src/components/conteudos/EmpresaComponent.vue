<script lang="ts">
import { defineComponent } from 'vue';
import ListaComponent from '../util/lista/ListaComponent.vue';


export default defineComponent({
      template: '#Empre_comp',
      data() {
          return {
            ITEM_PAGINA_MAX : 2,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'ordem':{'on': false, 'tipo': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},
                        {'header': 'Código Tek', 'key_body': 'codigoTek',
                        'ordem':{'on': false, 'tipo': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},
                        {'header': 'Razão Social', 'key_body': 'descricao',
                        'ordem':{'on': false, 'tipo': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},
                        {'header': 'CNPJ', 'key_body': 'cnpj',
                        'ordem':{'on': false, 'tipo': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},
                        {'header': 'Versão API', 'key_body': 'versaoApiTek',
                        'ordem':{'on': false, 'tipo': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},
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
      created() {
            let aux = this.dados_lista as Array<object>;
            if (Object.keys(aux).length) {
                  this.NUMERO_PAGINA = Math.ceil(Object.keys(aux).length / this.ITEM_PAGINA_MAX);
            }
            this.atualizarDadoPaginado();
      },
      methods:{
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
            }
      }
})
</script>

<template id="Empre_comp">
      <div class="row">
            <ListaComponent
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" />
      </div>
</template>

<style scoped>

</style>