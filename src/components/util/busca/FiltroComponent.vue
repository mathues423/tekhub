<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
      name: 'FiltroComponent',
      data() {
          return{
            escolha: this.dados_usuario,
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
            ]
          }
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
                        operacao: {opc: string, nome: string}, valor: string}>,
                  required: true
            },
            errors:{
                  type: Object as PropType<{campo: boolean, operacao: boolean, valor: boolean, valor_incompativel: boolean}>,
                  required: true
            }
      },
      computed:{
            getDadosFiltraveis: function(): object{
                  return this.dado_header.filter( (value : {isfiltrable: boolean}) => {
                        return value.isfiltrable
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
            'escolha.campo.filtro.tipo_obj'(){
                  if(this.escolha.campo.filtro.tipo_obj == 'String'){
                        this.escolha.operacao = {'nome': 'CONTEM', 'opc': '=~'};
                  }
                  if(this.escolha.campo.filtro.tipo_obj == 'Number'){
                        this.escolha.operacao = {'nome': 'IGUAL', 'opc': '=='};
                  }
            }
      },
      emits:['deletar', 'update:retorno_dados']
})
</script>

<template>
      <div :class="['col-lg-3 col-sm-12 my-1',{'invalido' : errors.campo}]">
            <div class="input-group">
                  <div class="input-group-prepend">
                        <div class="input-group-text">Campo</div>
                  </div>
                  <select class="custom-select" v-model="escolha['campo' as keyof typeof escolha]" required autofocus>
                        <option selected disabled :value="{}"> Selecione o campo</option>
                        <option v-for="header in getDadosFiltraveis" :key="header" :value="header"> {{ header['header' as keyof typeof header] }}</option>
                  </select>
            </div>
      </div>
      <button class="input-group-text btn btn-danger" @click="$emit('deletar')" v-if="escolha['campo' as keyof typeof escolha]['key_body' as keyof typeof Object] == ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
      </button>
      <div :class="['col-lg-3 col-sm-12 my-1',{'invalido' : errors.operacao}]" v-show="escolha.campo.filtro.tipo_filtro == 'all'">
            <div class="input-group" style="border-color: red; border: 2px">
                  <div class="input-group-prepend"   >
                        <div class="input-group-text">Operação</div>
                  </div>
                  <span v-show="escolha.campo.filtro.tipo_obj == 'Number'">
                        <select class="custom-select" v-model="escolha['operacao' as keyof typeof escolha]" required>
                              <option v-for="operacao in operacoes_num" :key="operacao.nome" :value="operacao" :selected="operacao.opc == '=='">
                                    {{ operacao.nome }} 
                              </option>
                        </select>
                  </span>
                  <span v-show="escolha.campo.filtro.tipo_obj == 'String'">
                        <select class="custom-select" v-model="escolha['operacao' as keyof typeof escolha]" required>
                              <option v-for="operacao in operacoes_str" :key="operacao.nome" :value="operacao" :selected="operacao.opc == '=~'">
                                    {{ operacao.nome }}
                              </option>     
                        </select>
                  </span>
            </div>
      </div>
      <div class="col-lg-6 col-sm-12 my-1" v-if="escolha.campo.filtro.tipo_filtro == ('all' as string)">
            <div class="input-group">
                  <input type="text" placeholder="Valor" aria-describedby="trash_cond" :class="['form-control',{'imput_value' : errors.valor} , {'imput_value_incompativel' : errors.valor_incompativel && !errors.valor}]" v-model="retorno_dados['valor' as keyof typeof retorno_dados]" required autofocus>
                  <div class="input-group-prepend">
                        <button class="input-group-text btn btn-danger" @click="$emit('deletar')">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                              </svg>
                        </button>
                  </div>
            </div>
      </div>
      <div class="col-lg-9 col-sm-12 my-1 row" v-if="escolha.campo.filtro.tipo_filtro == ('pre' as string)"> 
            <div class="custom-control custom-checkbox col" v-for="(item, index) in escolha.campo.config_filtro" :key="index">
                  <input type="checkbox" :class="['custom-control-input', {'imput_value' : errors.valor}]" :id="'check'+index" v-model="retorno_dados['campo' as keyof typeof retorno_dados]['config_filtro'][index]['isChecked']">
                  <label class="custom-control-label" :for="'check'+index">{{ item['text' as keyof typeof item] }}</label>
            </div>
            <div class="col">
                  <button class="input-group-text btn btn-danger" @click="$emit('deletar')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                  </button>
            </div>
      </div>
</template>

<style scoped>
.invalido > div.input-group > select, .invalido > select{
      border-color: var(--bs-form-invalid-border-color);
}
.invalido > div.input-group > div.input-group-prepend > div.input-group-text{
      background-color: rgba(var(--bs-danger-rgb), .25);
      border-color: var(--bs-form-invalid-border-color);
}
.invalido > div.input-group > select:focus, .invalido > select:focus{
      border-color: var(--bs-form-invalid-border-color);
      box-shadow: 0 0 0 .25rem rgba(var(--bs-danger-rgb), .25);
}
.imput_value{
      border-color: var(--bs-form-invalid-border-color);
      padding-right: calc(1.5em + .75rem);
      background-image: url('https://www.svgrepo.com/show/15343/warning-sign.svg');
      background-repeat: no-repeat;
      background-position: right calc(.375em + .1875rem) center;
      background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
.imput_value:focus{
      border-color: var(--bs-form-invalid-border-color);
      box-shadow: 0 0 0 .25rem rgba(var(--bs-danger-rgb), .25);
}
.imput_value_incompativel{
      border-color: var(--bs-warning-border-subtle);
      padding-right: calc(1.5em + .75rem);
      background-image: url('https://www.svgrepo.com/show/146315/warning-signal.svg');
      background-repeat: no-repeat;
      background-position: right calc(.375em + .1875rem) center;
      background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
.imput_value_incompativel:focus{
      border-color: var(--bs-warning-border-subtle);
      box-shadow: 0 0 0 .25rem rgba(var(--bs-warning-rgb), 0.25);
}
.custom-select{
      background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
      background-size: 8px 10px;
      padding: .375rem .75rem .375rem .75rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #495057;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: inline-block;
      
}
</style>