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
                              campo: this.opc_default ? this.opc_default : this.header[0],
                              // {'key_body': '', config_filtro: [{}], filtro:{tipo_obj: '', tipo_filtro: ''}}
                              operacao: {opc: '', nome: ''},
                              valor: ''
                        }, erros: [], error_obj: {campo: false, operacao: false, valor: false, valor_incompativel: false}
                  }]
            }
      },
      watch:{
            'opc_default'(valueNew, valueOld){
                  this.filhos[this.filhos.length - 1].opcs.campo = valueNew;
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
            },
            opc_default:{
                  type: Object,
                  default: undefined
            }
      },
      components:{
            FiltroComponent
      },
      methods:{
            adiciona_condicao(){
                  const newId = this.filhos.length ? this.filhos[this.filhos.length - 1].id + 1 : 1;
                  this.filhos.push({id: newId, componete: FiltroComponent, opcs:{campo: this.opc_default ? this.opc_default : this.header[0], operacao: {opc: '', nome: ''}, valor: ''}, erros: [], error_obj:{campo: false, operacao: false, valor: false, valor_incompativel: false}});
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
                  if (!have_error) {
                        this.$emit('pesquisa_request', aux);
                  }
            }
      },
      emits: ['pesquisa_request', 'close_pesquisa']
})
</script>

<template>
<div>
      <v-row v-if="itsOnFilter" class="px-5">
            <v-col class="v-col-12">
                  <v-form>
                        <v-row v-for="(item, index) in filhos" :key="item.id" no-gutters>
                              <v-col class="v-col-12 pb-2" v-show="index >= 1"> 
                                    <v-divider> AND </v-divider>
                              </v-col>
                              <v-col :class="['v-col-12', index == 0 ? 'pt-4' : 'pt-2']">
                                    <FiltroComponent
                                          :index="index"
                                          :dado_header="header"
                                          :errors="item.error_obj"
                                          v-model:dados_usuario="item.opcs"
                                          @deletar="remove_condicao(index)" 
                                    />
                              </v-col>
                        </v-row>
                  </v-form>
            </v-col>
            <v-col class="v-col-12 mb-5">
                  <v-row style="text-align: center;">
                        <v-col class="v-col">
                              <v-btn color="" @click="adiciona_condicao"><v-icon>mdi mdi-plus</v-icon></v-btn>
                        </v-col>
                        <v-col class="v-col">
                              <v-btn color="info" @click="gerar_request" type="submit"> Pesquisar </v-btn>
                        </v-col>
                        <v-col class="v-col">
                              <v-btn color="error" @click="$emit('close_pesquisa')"> Fechar </v-btn>
                        </v-col>
                  </v-row>
            </v-col>
      </v-row>
</div>
</template>