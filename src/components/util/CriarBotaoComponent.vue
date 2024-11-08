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
      <div class="botao">
            <button class="btn" 
                  @click="addDado()"> 
                  <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                        </svg>
                  </span>
                  Adicionar
            </button>
      </div>
</template>

<style scoped>
.botao{
      padding-top: 10px;
      padding-bottom: 10px;
}

.botao > button{
      background-color: var(--bs-blue);
      color: var(--bs-white);
}
.botao > button:hover{
      background-color: var(--bs-blue);
      opacity: 0.85;
      color: var(--bs-white);
}
</style>