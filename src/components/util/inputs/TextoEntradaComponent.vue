<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      data(){
            return{
                  dado: undefined,
            }
      },
      props:{
            texto_label:{
                  type: String,
                  required: true
            },
            obrigatorio:{
                  type: Boolean,
                  defaut: false
            },
            dado_inicial:{
                  type: String,
                  defaut: undefined
            }
      },
      watch:{
            dado(novo_dado){
                  this.$emit('update:dado', novo_dado);
            },
            dado_inicial(novo_dado){
                  this.dado = novo_dado;
            }
      },
      emits:['update:dado']
})
</script>

<template>
      <v-text-field
            v-model="dado"
            :label="obrigatorio ? '*'+texto_label+':' : texto_label+':'"
      density="compact" variant="outlined"/>
</template>