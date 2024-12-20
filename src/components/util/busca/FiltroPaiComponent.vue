<script lang="ts">
import { defineComponent } from 'vue';
import FiltroComponent from './FiltroComponent.vue';
import filtro from './regras_filtro';

export default defineComponent({
      data() {
            return {
                  request: 'filtro=',
                  filhos: [{id:0 , componete: FiltroComponent,
                        opcs:{
                              campo: {key_body: '', config_filtro:[{}], filtro:{tipo_obj: '', tipo_filtro: ''}},
                              operacao: {opc: '', nome: ''},
                              valor: ''
                        }, erros: [], error_obj: {campo: false, operacao: false, valor: false, valor_incompativel: false}
                  }]
            }
      },
      props:{
            header:{
                  type: Object,
                  required: true
            },
            itsOnFilter:{
                  type: Boolean,
                  required: true
            }
      },
      components:{
            FiltroComponent
      },
      methods:{
            adiciona_condicao(){
                  const newId = this.filhos.length ? this.filhos[this.filhos.length - 1].id + 1 : 1;
                  this.filhos.push({id: newId, componete: FiltroComponent, opcs:{campo: {key_body: '', config_filtro:[{}], filtro:{tipo_obj: '', tipo_filtro: ''}}, operacao: {opc: '', nome: ''}, valor: ''}, erros: [], error_obj:{campo: false, operacao: false, valor: false, valor_incompativel: false}});
            },
            remove_condicao(index: number){
                  this.filhos.splice(index, 1);
            },
            gerar_request(){
                  let aux = this.request;
                  let have_error = false;
                  for (let index = 0; index < this.filhos.length; index++) {
                        this.filhos[index].erros = []
                        this.filhos[index].error_obj = filtro._verifica({
                              campo: this.filhos[index].opcs.campo,
                              operacao: this.filhos[index].opcs.operacao,
                              valor: this.filhos[index].opcs.valor
                        }, this.filhos[index].erros)

                        if (this.filhos[index].erros.length != 0 ) {
                              have_error = true;
                        }else{
                              if (index >= 1) {
                                    aux += '&filtro='
                              }
                              if (this.filhos[index].opcs.campo.filtro.tipo_filtro == 'all') {
                                    aux += `${this.filhos[index].opcs.campo.key_body}${this.filhos[index].opcs.operacao.opc}${this.filhos[index].opcs.valor}`
                              }else{
                                    for (const element of this.filhos[index].opcs.campo.config_filtro) {//Ver com ele como é a request 
                                          if(element['isChecked' as keyof typeof element])
                                                aux += `${this.filhos[index].opcs.campo.key_body}==${element['key' as keyof typeof element]}`
                                    }
                              }
                        }
                  }
                  console.log('Algum erro', have_error);
                  if (!have_error) {
                        this.$emit('pesquisa_request', aux);
                  }
            }
      },
      emits: ['pesquisa_request', 'close_pesquisa']
})
</script>

<template>
      <div class="col-12" v-if="itsOnFilter">
            <form>
                  <div class="form-row align-items-center" v-for="(item, index) in filhos" :key="item.id">
                        <div class="col-12 my-3" v-show="index >= 1"> AND </div>
                        <FiltroComponent
                              :index="index"
                              :dado_header="header"
                              :errors="item.error_obj"
                              v-model:dados_usuario="item.opcs"
                              @deletar="remove_condicao(index)" />
                  </div>
            </form>
            <div class="row my-3" style="text-align: center;">
                  <div class="col">
                        <button class="btn btn-light add" @click="adiciona_condicao"> + </button>
                  </div>
                  <div class="col">
                        <button class="btn btn-primary" @click="gerar_request" type="submit"> Pesquisar </button>
                  </div>
                  <div class="col">
                        <button class="btn btn-danger" @click="$emit('close_pesquisa')"> Close</button>
                  </div>
                  <div class="col-9"></div>
            </div>
      </div>
</template>


<style lang="css" scoped>
.form-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
}
.add{
      border-radius: 100%;
      border: 2px solid var(--bs-black);
}
</style>