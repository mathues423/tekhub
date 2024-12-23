<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      props:{
            mensagem: {
              type: String,
              required: true
            }
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
.alert{
      margin-top: 5px;
      padding: 5px;
}
</style>
