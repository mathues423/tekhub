<script lang="ts">
import { defineComponent } from 'vue'
import EmpresaSelectComponent from './inputs/EmpresaSelectComponent.vue';
import DataSelectComponent from './inputs/DataSelectComponent.vue';

export default defineComponent({
      data() {
            return{
                  empresa_select:{},
                  empresa_erro: false,
                  
                  data_inicial_aux: undefined as Date | undefined,
                  data_final_aux: undefined as Date | undefined,

                  data_inicial: undefined as object | undefined,
                  data_final: undefined as object | undefined,

                  data_inicial_erro: false,
                  data_final_erro: false,

                  select_data_ini: false,
                  select_data_fin: false,

                  disabled_fin_select: true
            }
      },
      components:{
            EmpresaSelectComponent,
            DataSelectComponent
      },
      mounted() {
          this.select_data_ini = false
          this.select_data_fin = false
      },
      watch:{
            data_inicial:{
                  handler(){
                        if(this.data_inicial != undefined && this.data_final != undefined){
                              if(this.verifica_tempo() || this.verifica_data()){
                                    const inicio = new Date(
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object],
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object] - 1,
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object],
                                    )
                                    const final = new Date(
                                          this.data_final['data' as keyof typeof this.data_final]['ano' as keyof typeof Object],
                                          this.data_final['data' as keyof typeof this.data_final]['mes' as keyof typeof Object] - 1,
                                          this.data_final['data' as keyof typeof this.data_final]['dia' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['hora' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['minuto' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['segundo' as keyof typeof Object]
                                    )

                                    this.data_inicial_aux = undefined
                                    this.data_final_aux = undefined
                                    this.data_inicial_aux = final
                                    this.data_final_aux = inicio
                              }
                        }
                  },
                  deep: true
            },
            data_final:{
                  handler(){
                        if(this.data_inicial != undefined && this.data_final != undefined){
                              if(this.verifica_tempo() || this.verifica_data()){
                                    const inicio = new Date(
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object],
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object] - 1,
                                          this.data_inicial['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object],
                                          this.data_inicial['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object],
                                    )
                                    const final = new Date(
                                          this.data_final['data' as keyof typeof this.data_final]['ano' as keyof typeof Object],
                                          this.data_final['data' as keyof typeof this.data_final]['mes' as keyof typeof Object] - 1,
                                          this.data_final['data' as keyof typeof this.data_final]['dia' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['hora' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['minuto' as keyof typeof Object],
                                          this.data_final['tempo' as keyof typeof this.data_final]['segundo' as keyof typeof Object]
                                    )

                                    this.data_inicial_aux = undefined
                                    this.data_final_aux = undefined
                                    this.data_inicial_aux = final
                                    this.data_final_aux = inicio
                              }
                        }
                  },
                  deep: true
            }
      },
      methods:{
            verifica_data(){
                  if(this.data_inicial != undefined && this.data_final != undefined)
                        if(this.data_inicial['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object] > this.data_final['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object]){
                              return true
                        }else if(this.data_inicial['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object] == this.data_final['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object]){
                              if(this.data_inicial['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object] > this.data_final['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object]){
                                    return true
                              }else if(this.data_inicial['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object] == this.data_final['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object]){
                                    if(this.data_inicial['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object] > this.data_final['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object]){
                                          return true
                                    }
                              }
                        }
                  return false
            },
            verifica_tempo(){
                  if(this.data_inicial != undefined && this.data_final != undefined)
                        if(this.data_inicial['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object] > this.data_final['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object]){
                              return true
                        }else if(this.data_inicial['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object] == this.data_final['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object]){
                              if(this.data_inicial['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object] > this.data_final['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object]){
                                    return true
                              }else if(this.data_inicial['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object] == this.data_final['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object]){
                                    if(this.data_inicial['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object] > this.data_final['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object]){
                                          return true
                                    }
                              } 
                        }
                  return false
            },
            buscar(){
                  this.data_final_erro = this.data_inicial_erro = this.empresa_erro = false;
                  if(Object.keys(this.empresa_select).length == 0){
                        this.empresa_erro = true
                  }
                  let data_inicio_request = '';
                  if(this.data_inicial == undefined){
                        this.data_inicial_erro = true
                  }else{
                        data_inicio_request = `&dataInicial=${this.data_inicial['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object]}-${this.data_inicial['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object]}-${this.data_inicial['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object]}`+
                        ` ${this.data_inicial['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object]}:${this.data_inicial['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object]}:${this.data_inicial['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object]}`
                  }
                  let data_final_request = '';
                  if(this.data_final == undefined){
                        this.data_final_erro = true
                  }else{
                        data_final_request = `&dataFinal=${this.data_final['data' as keyof typeof this.data_inicial]['ano' as keyof typeof Object]}-${this.data_final['data' as keyof typeof this.data_inicial]['mes' as keyof typeof Object]}-${this.data_final['data' as keyof typeof this.data_inicial]['dia' as keyof typeof Object]}`+
                        ` ${this.data_final['tempo' as keyof typeof this.data_inicial]['hora' as keyof typeof Object]}:${this.data_final['tempo' as keyof typeof this.data_inicial]['minuto' as keyof typeof Object]}:${this.data_final['tempo' as keyof typeof this.data_inicial]['segundo' as keyof typeof Object]}`
                  }
                  if(this.data_final_erro || this.data_inicial_erro || this.empresa_erro){
                        return
                  }

                  const empresa_request = `&empresa=${this.empresa_select['codigo' as keyof typeof this.empresa_select]}`
                  
                  this.$emit('request_filtro', empresa_request + data_inicio_request + data_final_request)
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
                  <EmpresaSelectComponent 
                        :have_erro="empresa_erro"
                        @empresa_escolhida="(args: object)=> escolha_empresa(args)"
                        @erro_fetch="(arg: any)=> $emit('erro_fetch', arg)"
                  />
            </v-col>
            <!-- datetime-local -->
            <v-col class="v-col-12 v-col-md-8 v-row px-2">
                  <v-col class="v-col-6 v-col-md-5">
                        <DataSelectComponent 
                              :is_in_select_date_prop="select_data_ini"
                              :date_aux="data_inicial_aux"
                              texto_select="Data Inicial"
                              :erro_verify="data_inicial_erro"
                              erro_mensagem="Selecione a data inicial"
                              @saida="(arg: object | undefined)=> {data_inicial = arg}"
                              @isOpen="(arg)=> {
                                    select_data_ini = arg
                                    disabled_fin_select = false
                              }"
                        />
                  </v-col>
                  <v-col class="v-col-6 v-col-md-5">
                        <DataSelectComponent 
                              :is_in_select_date_prop="select_data_fin"
                              :is_disabled="disabled_fin_select"
                              :date_aux="data_final_aux"
                              texto_select="Data Final"
                              :erro_verify="data_final_erro"
                              erro_mensagem="Selecione a data final"
                              @saida="(arg: object | undefined)=> {data_final = arg}"
                              @isOpen="(arg)=> select_data_fin = arg"
                        />
                  </v-col>
                  <v-col class="v-col px-2">
                        <v-btn
                              color="info"
                              @click="buscar"
                        ><v-icon>mdi mdi-magnify</v-icon></v-btn>
                  </v-col>
            </v-col>
      </v-row>
</template>