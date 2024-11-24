<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
      props:{
            nome_rota_para_edicao:{
                  type: String,
                  required: true
            },
            id_item:{
                  type: Number,
                  required: true
            }
      },
      methods:{
            edit(rota_edit: string, id: number){
                  if (rota_edit != '' && id != -1) {
                        router.push('/'+rota_edit+'/'+id);
                  }
            }
      }
})
</script>

<template>
      <button class="btn edit" @click="edit((nome_rota_para_edicao || ''),(id_item || -1))"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
      </button>
</template>

<style lang="css" scoped>
.edit{
      --bs-btn-color: #333;
      --bs-btn-border-color: #333;
      --bs-btn-hover-color: #222;
      --bs-btn-hover-bg: #c2dfc8;

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