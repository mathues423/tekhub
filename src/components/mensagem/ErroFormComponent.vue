<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      props:{
            mensagem: {
              type: String,
              required: true
            },
            tipo_mesnsagem: {
              type: String,
              required: true
            },
      }
})
</script>

<template>
      <v-alert
            class="pa-1"
            title="ERRO"
            border="start"
            border-color="deep-red accent-4"
            icon="mdi-alert-circle"
            type="error"
            :text="mensagem"
      >
      </v-alert>
</template>

<style scoped>
.desativada{
      display: none;
}
.ativada{
      display: flex;
}
</style>
