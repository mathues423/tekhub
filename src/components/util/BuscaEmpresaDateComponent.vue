<script lang="ts">
import { defineComponent } from 'vue'
import EmpresaSelectComponent from './selects/EmpresaSelectComponent.vue';

export default defineComponent({
      data() {
            return{
                  empresa_select:{},
                  empresa_erro: false,

                  data_inicio: '',
                  data_inicio_erro:false,

                  data_final: '',
                  data_final_erro:false
            }
      },
      components:{
            EmpresaSelectComponent,
      },
      // watch:{ // Recursivo Erro
      //       data_inicio(){
      //             if (this.data_final == '') {
      //                   return
      //             }
      //             const data_inicio_aux = new Date(this.data_inicio)
      //             const data_final_aux = new Date(this.data_final)
      //             let data_aux;
      //             if (data_final_aux.getTime() < data_inicio_aux.getTime()) {
      //                   data_aux = this.data_final;
      //                   this.data_final = this.data_inicio
      //                   this.data_inicio = data_aux
      //             }else{
      //                   data_aux = this.data_inicio;
      //                   this.data_inicio = this.data_final
      //                   this.data_final = data_aux
      //             }
      //       },
      //       data_final(){
      //             if (this.data_inicio == '') {
      //                   return
      //             }
      //             const data_inicio_aux = new Date(this.data_inicio)
      //             const data_final_aux = new Date(this.data_final)
      //             let data_aux;
      //             if (data_final_aux.getTime() < data_inicio_aux.getTime()) {
      //                   data_aux = this.data_final;
      //                   this.data_final = this.data_inicio
      //                   this.data_inicio = data_aux
      //             }else{
      //                   data_aux = this.data_inicio;
      //                   this.data_inicio = this.data_final
      //                   this.data_final = data_aux
      //             }
      //       }
      // },
      methods:{
            buscar(){
                  let request_aux = ''
                  let r_empresa = ''
                  let r_data_inicio = ''
                  let r_data_final= ''

                  const data_inicio_aux = new Date(this.data_inicio)
                  const data_final_aux = new Date(this.data_final)
                  let data_aux;
                  console.log('Inicio ', data_inicio_aux);
                  console.log('Final ', data_final_aux);
                  console.log('IF ', data_final_aux.getTime() < data_inicio_aux.getTime());
                  
                  if (data_final_aux.getTime() < data_inicio_aux.getTime()) {
                        data_aux = this.data_final;
                        this.data_final = this.data_inicio
                        this.data_inicio = data_aux
                  }
                  
                  this.empresa_erro = this.data_final_erro = this.data_inicio_erro = false;
                  if(Object.keys(this.empresa_select).length == 0)
                        this.empresa_erro = true
                  else
                        r_empresa = `&empresa=${this.empresa_select['codigo' as keyof typeof this.empresa_select]}`
                  if(this.data_inicio == '')
                        this.data_inicio_erro = true
                  else
                        r_data_inicio = `&dataInicio=${this.data_inicio} 20:07:19`
                  if(this.data_final == '')
                        this.data_final_erro = true
                  else
                        r_data_final = `&dataFinal=${this.data_final} 20:07:19`

                  request_aux += `?ordenacao=datahora&direcao=ASC&pagina=1&porPagina=10`+r_empresa+r_data_inicio+r_data_final
                  if (!this.empresa_erro && !this.data_inicio_erro && !this.data_final_erro ) {
                        this.$emit('request_filtro', request_aux);
                  }
                  
            },
            escolha_empresa(empresa: object){
                  this.empresa_erro = false;
                  this.empresa_select = empresa
            }
      },
      emits:['request_filtro']
})
</script>

<template>
      <div class="row my-1">
            <div class="col-4">
                  <EmpresaSelectComponent 
                        :have_erro="empresa_erro"
                        @empresa_escolhida="(args: object)=> escolha_empresa(args)"
                  />
            </div>
            <div class="col-5 row">
                  <div :class="['col', {'invalido': data_inicio_erro}]">
                        <input class="form-control" type="date" v-model="data_inicio"/>
                  </div>
                  <div :class="['col', {'invalido': data_final_erro}]">
                        <input class="form-control" type="date" v-model="data_final"/>
                  </div>
            </div>
            <div class="col">
                  <button class="btn btn-primary" @click="buscar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                  </button>
            </div>
      </div>
</template>

<style scoped>
.invalido > input{
      border-color: var(--bs-form-invalid-border-color);
}
.invalido > input:focus{
      border-color: var(--bs-form-invalid-border-color);
      box-shadow: 0 0 0 .25rem rgba(var(--bs-danger-rgb), .25);
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
      width: 100%;
}
</style>