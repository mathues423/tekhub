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
            empresa_select(codigo_empresa){
                  this.empresa_request.forEach((empresa)=>{
                        if(empresa['codigo' as keyof typeof empresa] == codigo_empresa){
                              this.$emit('empresa_escolhida', empresa)
                        }
                  })
            },
            valor_inicial(empresa_new){
                  this.empresa_select = empresa_new
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
      emits:['empresa_escolhida', 'erro_fetch']
})
</script>

<template>
      <v-select
            v-model="empresa_select"
            :items="empresa_request"
            :label="is_required ? '*Empresa' : 'Empresa'"
            item-title="descricao"
            item-value="codigo"
            :loading="!requested"
            :error-messages="have_erro ? 'Houve um erro ao buscar as empresas' : ''"
      density="compact" variant="outlined" :focused="is_focused"/>
</template>