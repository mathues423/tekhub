<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue'

export default defineComponent({
      name: 'EmpresaSelectComponent',
      data() {
          return{
            empresa_select: this.valor_inicial ? this.valor_inicial : undefined,
            empresa_request: [{}],
            requested: false,
          }
      },
      props:{
            have_erro:{
                  type: Boolean,
                  required: true
            },
            mensagem_erro:{
                  type: String,
                  default: 'Houve um erro ao buscar as empresas'
            },
            valor_inicial:{
                  type: Object,
                  default: undefined
            },
            is_focused:{
                  type: Boolean,
                  default: undefined
            },
            is_required:{
                  type: Boolean,
                  default: false
            }
      },
      watch:{
            valor_inicial(empresa_new){
                  this.empresa_select = empresa_new
            },
            empresa_select(empresa_new){
                  this.$emit('empresa_escolhida', empresa_new)
            }
      },
      mounted() {
          this.requested = false;
          Promise.resolve(fetch_.getDado('/empresa'))
          .then((arg)=>{
            this.empresa_request = arg.data;
            this.requested = true;
            }).catch((error_retorno)=> this.$emit('erro_fetch', error_retorno))
      },
      methods:{
            empresa_select_props(item: any){
                  return{
                        title : item['descricao' as keyof typeof item],
                        value : item
                  }
            }
      },
      emits:['empresa_escolhida', 'erro_fetch']
})
</script>

<template>
      <v-select
            v-model="empresa_select"
            :items="empresa_request"
            :label="is_required ? '*Empresa' : 'Empresa'"
            :item-props="empresa_select_props"
            :loading="!requested"
            :error-messages="have_erro ? mensagem_erro : undefined"
      density="compact" variant="outlined" :focused="is_focused"/>

      <!-- <v-combobox
            v-model="empresa_name"
            :items="empresa_request"
            auto-select-first="exact"
            :label="is_required ? '*Empresa' : 'Empresa'"
            :item-props="empresa_select_props"
            :loading="!requested"
            :error-messages="have_erro ? mensagem_erro : undefined" 
      density="compact" variant="outlined" :focused="is_focused"/> -->
</template>