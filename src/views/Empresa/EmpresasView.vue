<script lang="ts">

import EmpresaComponent from "@/components/conteudos/EmpresaComponent.vue";
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotao from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
      components:{
            NavbarComplet,
            CriarBotao,
            EmpresaComponent,
            VersaoMaximisada,
      },
      methods:{
            adicionarNewempresa(){
                  router.push('/empresas/0');
            },
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'empresas'"/>
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <CriarBotao @criar="adicionarNewempresa" />
                  <EmpresaComponent />
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