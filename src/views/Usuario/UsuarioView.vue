<script lang="ts">
import UsuarioComponent from '@/components/conteudos/UsuarioComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
      components:{
            NavbarComplet,
            VersaoMaximisada,
            UsuarioComponent,
            CriarBotaoComponent
      },
      methods:{
            adicionarNewusuario(){
                  router.push('/usuarios/0');
            },
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'usuario'"/>
            <div class="col-12 col-lg-10" id="content">
                  <CriarBotaoComponent @criar="adicionarNewusuario"/>
                  <UsuarioComponent />
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