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
                  data_final_erro:false,

                  is_in_select_date: false
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
            },
            changeStateDialog(){
                  this.is_in_select_date != this.is_in_select_date;
            }
      },
      emits:['request_filtro', 'erro_fetch']
})
</script>

<template>
<v-dialog v-model="is_in_select_date" max-width="350" transition="dialog-top-transition">
      <v-date-picker
            title="Selecione a data para a pesquisa"
            header="Escolha a data"
            multiple="range"
            minWidth="350"
      />
      <v-btn 
            variant="tonal"
            class="w-100"
            color="red-darken-4"
            :text="`Fechar`"
            @click="is_in_select_date = false"/>
</v-dialog>
      <v-row no-gutters>
            <v-col class="v-col-12 v-col-md-4 px-2">
                  <EmpresaSelectComponent 
                        :have_erro="empresa_erro"
                        @empresa_escolhida="(args: object)=> escolha_empresa(args)"
                        @erro_fetch="(arg)=> $emit('erro_fetch', arg)"
                  />
            </v-col>
            <!-- datetime-local -->
            <v-col class="v-col-md-6 v-col v-row px-2">
                  <!-- <v-btn
                        color="error"
                        @click="is_in_select_date = true"
                  >X</v-btn> -->
                  <v-col class="v-col-6">
                        <v-sheet :color="data_inicio_erro ? 'error': undefined">
                              <input class="form-control" type="datetime-local" v-model="data_inicio"/>
                        </v-sheet>
                  </v-col>
                  <v-col class="v-col-6">
                        <v-sheet :color="data_final_erro ? 'error': undefined">
                              <input class="form-control" type="datetime-local" v-model="data_final"/>
                        </v-sheet>
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