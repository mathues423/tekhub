<script lang="ts">
import { defineComponent } from 'vue'
import EmpresaSelectComponent from './selects/EmpresaSelectComponent.vue';
import DataSelectComponent from './selects/DataSelectComponent.vue';

export default defineComponent({
      data() {
            return{
                  empresa_select:{},
                  empresa_erro: false,

                  data_inicio: '',
                  data_inicial: undefined as object | undefined,
                  data_inicio_erro:false,

                  data_final: '',
                  data_final_erro:false,

                  select_data_ini: false
            }
      },
      components:{
            // EmpresaSelectComponent,
            DataSelectComponent
      },
      mounted() {
          this.select_data_ini = false
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
                        r_data_inicio += `${data_inicio_aux.getUTCHours()}:${data_inicio_aux.getUTCMinutes()}:${data_inicio_aux.getUTCSeconds()}`
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

      <v-row no-gutters>
            <v-col class="v-col-12 v-col-md-4 px-2">
                  <!-- <EmpresaSelectComponent 
                        :have_erro="empresa_erro"
                        @empresa_escolhida="(args: object)=> escolha_empresa(args)"
                        @erro_fetch="(arg)=> $emit('erro_fetch', arg)"
                  /> -->
            </v-col>
            <!-- datetime-local -->
            <v-col class="v-col-md-6 v-col v-row px-2">
                  <v-col class="v-col-6">
                        <DataSelectComponent 
                              :is_in_select_date_prop="select_data_ini"
                              texto_select="Data Inicial"
                              @saida="(arg: object | undefined)=> {data_inicial = arg}"
                              @isOpen="(arg)=> select_data_ini = arg"
                        />
                        <br> TESA {{ data_inicial }}
                  </v-col>
                  <v-col class="v-col-6">
                        {{ select_data_ini }}
                  </v-col>
            </v-col>
            <v-col class="v-col v-col-md-2 px-2">
                  <v-btn
                        color="info"
                        @click="buscar"
                  ><v-icon>mdi mdi-magnify</v-icon></v-btn>
            </v-col>
      </v-row>
</template>