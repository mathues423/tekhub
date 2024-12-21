<script lang="ts">
import AmbienteComponent from '@/components/conteudos/AmbienteComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
      components:{
            NavbarComplet,
            AmbienteComponent,
            VersaoMaximisada,
            CriarBotaoComponent
      },
      methods:{
            adicionarNewambiente(){
                  router.push('/ambientes/0');
            },
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'ambiente'"/>
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <CriarBotaoComponent @criar="adicionarNewambiente"/>
                  <AmbienteComponent />
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