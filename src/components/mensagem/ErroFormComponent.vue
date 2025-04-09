<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
      props:{
            mensagem: {
              type: String,
              required: true
            },
            tipo_mesnsagem: {
              type: String as PropType<'error' | 'warning'>,
              default: 'warning'
            },
      }
})
</script>

<template>
      <v-alert
            class="pa-1"
            :title="tipo_mesnsagem == 'error' ? 'ERRO' : 'AVISO'"
            border="start"
            icon="mdi-alert-circle"
            :type="tipo_mesnsagem"
            :text="mensagem"
      />
</template>

<style scoped>
.desativada{
      display: none;
}
.ativada{
      display: flex;
}
</style>
