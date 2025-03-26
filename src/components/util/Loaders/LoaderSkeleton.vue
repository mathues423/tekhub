<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            tipo_loader:{
                  type: String,
                  required: true
            },
            
      },
})
</script>

<template>
      <div class="w-100" v-if="tipo_loader == 'txt'">
            <div class="th_content"></div>
      </div>

</template>

<style lang="css" scoped>
@keyframes th_content-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.th_content{
      animation: th_content-loading 1s linear infinite alternate;
      height: 0.7rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
}
</style>