<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
      name: 'FiltroComponent',
      data() {
          return{
            operacoes: [
                  {nome: 'IGUAL', opc: '=='},
                  {nome: 'DIFERENTE', opc: '!='},
                  {nome: 'MAIOR QUE', opc: '>'},
                  {nome: 'MENOR QUE', opc: '<'},
                  {nome: 'MAIOR ou IGUAL', opc: '>='},
                  {nome: 'MENOR ou IGUAL', opc: '<='},
                  {nome: 'CONTEM', opc: '=~'},
                  {nome: 'NÂO CONTEM', opc: '!~'}
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
                  type: Object as PropType<{campo: {key_body:string, config_filtro:Array<object>, filtro:{tipo_filtro: string}}, operacao: {opc: string}, valor: string}>,
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
                        return this.dados_usuario;
                  },
                  set(novoValor : string){
                        this.$emit("update:retorno_dados", novoValor);
                  }
            },
      
      },
      emits:['deletar', 'update:retorno_dados']
})
</script>

<template>
      <!-- Dados {{ dados_usuario }} <br> -->
      <div :class="['w-25 my-1',{'invalido' : errors.campo}]">
            <div class="input-group">
                  <div class="input-group-prepend">
                        <div class="input-group-text">Campo</div>
                  </div>
                  <select class="custom-select" v-model="retorno_dados['campo' as keyof typeof retorno_dados]" required>
                        <option selected disabled value=""> Selecione o campo</option>
                        <option v-for="header in getDadosFiltraveis" :key="header" :value="header"> {{ header['header' as keyof typeof header] }}</option>
                  </select>
            </div>
      </div>
      <div :class="['w-25 my-1',{'invalido' : errors.operacao}]" v-show="dados_usuario.campo.filtro.tipo_filtro == 'all'">
            <div class="input-group" style="border-color: red; border: 2px">
                  <div class="input-group-prepend" style="padding-left: 10px;">
                        <div class="input-group-text">Operação</div>
                  </div>
                  <select class="custom-select" v-model="retorno_dados['operacao' as keyof typeof retorno_dados]" required>
                        <option selected disabled value=""> Selecione o campo</option>
                        <option v-for="operacao in operacoes" :key="operacao.nome" :value="operacao"> {{ operacao.nome }}</option>
                  </select>
            </div>
      </div>
      <div class="w-50 my-1" v-show="dados_usuario.campo.filtro.tipo_filtro == ('all' as string)" style="padding-left: 10px;">
            <input type="text" placeholder="Valor" :class="['form-control',{'imput_value' : errors.valor} , {'imput_value_incompativel' : errors.valor_incompativel && !errors.valor}]" v-model="retorno_dados['valor' as keyof typeof retorno_dados]" required>
      </div>
      <div class="w-50 my-1 row" v-show="dados_usuario.campo.filtro.tipo_filtro == ('pre' as string)"> 
            <div class="custom-control custom-checkbox col" v-for="(item, index) in dados_usuario.campo.config_filtro" :key="index">
                  <input type="checkbox" :class="['custom-control-input', {'imput_value' : errors.valor}]" :id="'check'+index" v-model="retorno_dados['campo' as keyof typeof retorno_dados]['config_filtro'][index]['isChecked']">
                  <label class="custom-control-label" :for="'check'+index">{{ item['text' as keyof typeof item] }}</label>
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
      box-shadow: 0 0 0 .25rem rgba(var(--bs-warning-rgb), .25);
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