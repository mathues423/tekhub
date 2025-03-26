<script lang="ts">
import { defineComponent } from 'vue'
import EmpresaSelectComponent from './selects/EmpresaSelectComponent.vue';

export default defineComponent({
      name: 'FiltroEmpresaComponent',
      data() {
          return{
            empresa_select: {},
            empresa_request: {},
            isEscolhido: false,
          }
      },
      components:{
            EmpresaSelectComponent
      },
      props:{
            inRequest:{
                  type: Boolean,
                  required: true
            }
      },
      methods:{
            returna_id_empresa(id: number){
                  if(id != undefined){
                        this.$emit('id_empresa', id);
                  }
            },
            abilitaBusca(empresa: object){
                  this.empresa_select = empresa;
                  this.isEscolhido = true;
            }
      },
      emits:['id_empresa', 'erro_fetch']
})
</script>

<template>
      <v-row class="mt-2">
            <v-col class="v-col-10 v-col-md-8">
                  <EmpresaSelectComponent 
                        :have_erro="false"
                        @empresa_escolhida="(arg: object)=> abilitaBusca(arg)"
                        @Erro_fetch="(arg: object)=> $emit('erro_fetch', arg)"
                  />
            </v-col>
            <v-col class="v-col-2 v-col-md-4">
                  <v-btn color="info" @click="returna_id_empresa(empresa_select['codigo' as keyof typeof empresa_select])" :disabled="inRequest || !isEscolhido">
                        <v-icon>mdi mdi-magnify</v-icon>
                  </v-btn>
            </v-col>
      </v-row>
</template>