<script lang="ts">
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import CriarBotao from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
      components:{
            NavbarComplet,
            CriarBotao,
            // DashboardComponent,
            VersaoMaximisada,
      },
      methods:{
            adicionarNewcanal(){
                  router.push('/dashboard');
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'canais'"/>
            <div class="col-10" id="content">
                  <CriarBotao @criar="adicionarNewcanal" />
                  Canais content
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