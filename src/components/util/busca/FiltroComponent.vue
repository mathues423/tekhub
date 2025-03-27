<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
export default defineComponent({
      name: 'FiltroComponent',
      data() {
          return{
            escolha: this.dados_usuario,
            escolha_campo: this.dados_usuario.campo['header' as keyof typeof this.dados_usuario.campo],
            escolha_opc: 'IGUAL',
            escolha_valor_str: '',
            escolha_valor_num: -1,
            operacoes_str: [
                  {nome: 'IGUAL', opc: '=='},
                  // {nome: 'DIFERENTE', opc: '!='},
                  // {nome: 'MAIOR QUE', opc: '>'},
                  // {nome: 'MENOR QUE', opc: '<'},
                  // {nome: 'MAIOR ou IGUAL', opc: '>='},
                  // {nome: 'MENOR ou IGUAL', opc: '<='},
                  {nome: 'CONTEM', opc: '=~'},
                  {nome: 'NÂO CONTEM', opc: '!~'}
            ],
            operacoes_num: [
                  {nome: 'IGUAL', opc: '=='},
                  // {nome: 'DIFERENTE', opc: '!='},
                  // {nome: 'MAIOR QUE', opc: '>'},
                  // {nome: 'MENOR QUE', opc: '<'},
                  {nome: 'MAIOR ou IGUAL', opc: '>='},
                  {nome: 'MENOR ou IGUAL', opc: '<='},
                  // {nome: 'CONTEM', opc: '=~'},
                  // {nome: 'NÂO CONTEM', opc: '!~'}
            ],
            cabecalho_filtrado: {},
          }
      },
      components:{
            VNumberInput
      },
      mounted() {
            this.escolha.operacao = {nome: 'IGUAL', opc: '=='};
      },
      props:{
            index:{
                  type: Number,
                  required: false
            },
            dado_header:{
                  type: Object,
                  required: true
            },
            dados_usuario:{
                  type: Object as PropType<{
                        campo: {
                              key_body:string,
                              config_filtro:Array<object>,
                              filtro:{tipo_obj: string, tipo_filtro: string}
                        },
                        operacao: {opc: string, nome: string}, 
                        valor: string
                  }>,
                  required: true
            },
            errors:{
                  type: Object as PropType<{campo: boolean, operacao: boolean, valor: boolean, valor_incompativel: boolean}>,
                  required: true
            }
      },
      computed:{
            getDadosFiltraveis: function(): Array<object>{
                  return this.dado_header.filter( (value : {isfiltrable: boolean}) => {
                        return value.isfiltrable;
                  })
            },
            retorno_dados :{
                  get(): object{
                        return this.escolha;
                  },
                  set(novoValor : string){
                        this.$emit("update:retorno_dados", novoValor);
                  }
            },
      },
      watch:{
            'escolha_campo'(){
                  this.getDadosFiltraveis.forEach((item: any) => {
                        if(item.header == this.escolha_campo){
                              this.escolha.campo = item;
                              if(this.escolha.valor != null){
                                    if(item.filtro.tipo_obj == 'String'){
                                         this.escolha_valor_str = '';
                                         this.escolha.valor = this.escolha_valor_str;
                                    }
                                    if(item.filtro.tipo_obj == 'Number'){
                                          this.escolha_valor_num = 0;
                                          this.escolha.valor = this.escolha_valor_num.toString();
                                    }
                              }
                        }
                  })
            },
            'escolha_opc'(){
                  if(this.escolha.campo.filtro.tipo_obj == 'String'){
                        this.operacoes_str.forEach((item: any) => {
                              if(item.nome == this.escolha_opc){
                                    this.escolha.operacao = item;
                                    // if(this.escolha.valor != null){
                                    //       this.escolha_valor_str = '';
                                    //       this.escolha.valor = this.escolha_valor_str;
                                    // }
                              }
                        })
                  }
                  if(this.escolha.campo.filtro.tipo_obj == 'Number'){
                        this.operacoes_num.forEach((item: any) => {
                              if(item.nome == this.escolha_opc){
                                    this.escolha.operacao = item;
                                    // if(this.escolha.valor != null){
                                    //       this.escolha_valor_num = 0;
                                    //       this.escolha.valor = this.escolha_valor_num.toString();
                                    // }
                              }
                        })
                  }
            },
            'escolha_valor_str'(N){
                  this.escolha.valor = N as string;
            },
            'escolha_valor_num'(N){
                  this.escolha.valor = N as string;
            },
      },
      emits:['deletar', 'update:retorno_dados']
})
</script>

<template>
      <v-row no-gutters>
            <v-col class="v-col-6 v-col-md-4 pr-2">
                  <v-select 
                        v-model="escolha_campo" 
                        :items="getDadosFiltraveis"
                        :item-title="'header'"
                        label="Campo" 
                        :error-messages="errors.campo ? 'Campo inválido' : ''"
                        no-data-text="Não há campos disponíveis"
                  density="compact" variant="outlined" />
            </v-col>
            <v-col class="v-col-6 v-col-md-4 pl-2">
                  <v-select 
                        v-model="escolha_opc"
                        :items="escolha.campo.filtro.tipo_obj == 'String' ? operacoes_str : operacoes_num"
                        :item-title="'nome'"
                        label="Operação"
                        :error-messages="errors.operacao ? 'Operação inválida' : ''"
                        no-data-text="Não há operações disponíveis"
                        density="compact" variant="outlined" />
            </v-col>
            <v-col class="v-col-12 v-col-md-4 px-0 px-md-2">
                  <v-text-field v-if="escolha.campo.filtro.tipo_obj == 'String'" 
                  v-model="escolha_valor_str"
                  label="Valor"
                  :error-messages="errors.valor ? 'Informe o valor' : ''"
                  density="compact" variant="outlined" />

                  <v-number-input v-if="escolha.campo.filtro.tipo_obj == 'Number'"
                        v-model="escolha_valor_num"
                        label="Valor"
                        :precision="0"
                        :error-messages="(errors.valor ? ' Informe o valor' : '') + (errors.valor_incompativel ? ' Valor incompatível' : '')"
                  controlVariant="hidden" density="compact" variant="outlined" focused />   
            </v-col>
      </v-row>
</template>