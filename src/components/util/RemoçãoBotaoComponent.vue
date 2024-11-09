<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            dado:{
                  type: Object,
            }
      },
      methods:{
            delet_alert(){
                  this.$emit('deletarModal', this.dado)
            }
      }
})
</script>

<template>
      <button type="button" class="btn delete btn-danger" @click="delet_alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
      </button>
</template>

<style lang="css" scoped>
.delet{
      --bs-btn-color: #ffffff;
      --bs-btn-bg: #e04b4b;
      --bs-btn-border-color: #333;
      --bs-btn-hover-color: #000000;
      --bs-btn-hover-bg: #e04b4b;

      --bs-btn-hover-border-color: #000;
      --bs-btn-focus-shadow-rgb: 220, 53, 69;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #6d6566;
      --bs-btn-active-border-color: #000;
      
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #dc3545;
      --bs-btn-disabled-border-color: #dc3545;
      --bs-btn-disabled-bg: transparent;
      --bs-gradient: none; 
}
</style>