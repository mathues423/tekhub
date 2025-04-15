<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            icone:{
                  type: String,
                  defaut: undefined
            },
            is_disabled:{
                  type: Boolean,
                  defaut: false
            }
      }
})
</script>

<template>
      <v-btn  
            text="Voltar"
            @click="$emit('voltar')"
            :prepend-icon="icone"
            :disabled="is_disabled"
            :loading="is_disabled"
      />
</template>