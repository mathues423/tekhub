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
      watch:{
            data_inicio(){
                  if (this.data_final == '') {
                        return
                  }
                  const data_inicio_aux = new Date(this.data_inicio)
                  const data_final_aux = new Date(this.data_final)
                  let data_aux;
                  if (data_final_aux.getTime() < data_inicio_aux.getTime()) {
                        data_aux = this.data_final;
                        this.data_final = this.data_inicio
                        this.data_inicio = data_aux
                  }
            },
            data_final(){
                  if (this.data_inicio == '') {
                        return
                  }
                  const data_inicio_aux = new Date(this.data_inicio)
                  const data_final_aux = new Date(this.data_final)
                  let data_aux;
                  if (data_final_aux.getTime() < data_inicio_aux.getTime()) {
                        data_aux = this.data_final;
                        this.data_final = this.data_inicio
                        this.data_inicio = data_aux
                  }
            }
      },
      methods:{
            buscar(){
                  let request_aux = ''
                  let r_empresa = ''
                  let r_data_inicio = ''
                  let r_data_final= ''

                  const data_inicio_aux = new Date(this.data_inicio)
                  const data_final_aux = new Date(this.data_final)
                  
                  
                  this.empresa_erro = this.data_final_erro = this.data_inicio_erro = false;
                  if(Object.keys(this.empresa_select).length == 0)
                        this.empresa_erro = true
                  else
                        r_empresa = `&empresa=${this.empresa_select['codigo' as keyof typeof this.empresa_select]}`
                  
                  if(this.data_inicio == '')
                        this.data_inicio_erro = true
                  else{
                        r_data_inicio = `&dataInicial=${data_inicio_aux.getUTCFullYear()}-${data_inicio_aux.getUTCMonth()+1}-${data_inicio_aux.getUTCDate()}`
                        r_data_inicio += ` ${data_inicio_aux.getUTCHours()}:${data_inicio_aux.getUTCMinutes()}:${data_inicio_aux.getUTCSeconds()}`
                  }
                  if(this.data_final == '')
                        this.data_final_erro = true
                  else{
                        r_data_final = `&dataFinal=${data_final_aux.getUTCFullYear()}-${data_final_aux.getUTCMonth()+1}-${data_final_aux.getUTCDate()}`
                        r_data_final += ` ${data_final_aux.getUTCHours()}:${data_final_aux.getUTCMinutes()}:${data_final_aux.getUTCSeconds()}`
                  }

                  request_aux += r_empresa+r_data_inicio+r_data_final
                  if (!this.empresa_erro && !this.data_inicio_erro && !this.data_final_erro ) {
                        this.$emit('request_filtro', request_aux);
                  }
                  
            },
            escolha_empresa(empresa: object){
                  this.empresa_erro = false;
                  this.empresa_select = empresa
            }
      },
      emits:['request_filtro', 'erro_fetch']
})
</script>

<template>
      <div class="row">
            <div class="col-md-4 col-sm-12 my-1">
                  <EmpresaSelectComponent 
                        :valor_inicial="{}"
                        :have_erro="empresa_erro"
                        @empresa_escolhida="(args: object)=> escolha_empresa(args)"
                        @erro_fetch="(arg)=> $emit('erro_fetch', arg)"
                  />
            </div>
            <div class="col-md-6 col row my-1">
                  <div :class="['col-6', {'invalido': data_inicio_erro}]">
                        <input class="form-control" type="datetime-local" v-model="data_inicio"/>
                  </div>
                  <div :class="['col-6', {'invalido': data_final_erro}]">
                        <!-- datetime-local -->
                        <input class="form-control" type="datetime-local" v-model="data_final"/>
                  </div>
            </div>
            <div class="col-md-2 my-1">
                  <button class="w-100 btn btn-primary" @click="buscar">
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
</style>