<script setup lang="ts">
/* eslint-disable */
const props = defineProps({
  mensagem: {
    type: String,
    required: true
  }
})
</script>

<template>
<span class="alert">
      {{ mensagem }}
</span>
</template>

<style scoped>
.desativada{
      display: none;
}
.ativada{
      display: block;
}
</style>
