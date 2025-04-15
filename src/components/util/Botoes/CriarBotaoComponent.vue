<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      methods:{
            addDado(){
                  this.$emit('criar');
            }
      }
})
</script>

<template>
      <div class="mt-2 mb-4">
            <v-btn prepend-icon="mdi mdi-plus-circle-outline" variant="outlined" color="info" @click="addDado()">Adicionar</v-btn>
      </div>
</template>