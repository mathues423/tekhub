<script lang="ts">
import { defineComponent } from 'vue';
import ListaComponent from '../util/lista/ListaComponent.vue';
import store from '@/store';


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
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Código Tek', 'key_body': 'codigoTek',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Razão Social', 'key_body': 'descricao',
                        'ordem':{'on': false,'tipo_obj': 'String', 'tipo_ordenacao': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'CNPJ', 'key_body': 'cnpj',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': true}, //Ascendente => true | Descendente => false
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Versão API', 'key_body': 'versaoApiTek',
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
                  let aux = {'roter_externa': 'empresa', 'id': objeto.codigo, 'roter_interna': 'empresas'}
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
            ordenaEmpresa(title: {ordem: {tipo_ordenacao : boolean, on: boolean}}){
                  this.dado_paginado.header.forEach(
                        (valor) => {
                              if(valor.ordem?.on != undefined){
                                    valor.ordem.on = false;
                              }
                        })
                  title.ordem.tipo_ordenacao = !title.ordem.tipo_ordenacao;
                  title.ordem.on = true;
                  this.$emit('ordenaEmpresaView', title);
                  this.atualizarDadoPaginado();
            }
      },
      emits: ['ordenaEmpresaView']
})
</script>

<template id="Empre_comp">
      <div class="row">
            <!-- "codigoTek" "descricao""cnpj""versaoApiTek" Para empresa -->
            
            <!-- Duvida se ediçaõ seria um modal tbm ou so uma div msm -->
            <ListaComponent
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'empresas'"
                  
                  :ModalContent_Edicao="[]" 

                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                        ]"
                  @deletarDadoPai="(arg) => deletar(arg)"
                  @ordenarDadoPai="(arg) => ordenaEmpresa(arg)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
                  />
      </div>
</template>

<style scoped>

</style>