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
            color="success" 
            text="Criar"
            @click="$emit('criar')"
            :prepend-icon="icone"
            :disabled="is_disabled"
            :loading="is_disabled"
      />
</template>