<script lang="ts">
import EmpresaComponent from '@/components/empresa/EmpresaComponent.vue';
import NavbarComplet from '../components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '../components/versionamento/VersaoMaximisada.vue';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
      data(){
            return{
                  dados_lista_empresa: store.getters.getEmpresas as Array<object>
            }
      },
      components:{
            NavbarComplet,
            EmpresaComponent,
            VersaoMaximisada,
      },
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'empresas'"/>
            <div class="col-10" id="content">
                  <EmpresaComponent 
                  :dados_lista="dados_lista_empresa"/>
            </div>
            <VersaoMaximisada />
      </div>
</template>

<style scoped>
#content{
      background-color: var(--bs-white);
      color: var(--bs-gray-600);
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>