<script lang="ts">
import NavbarComplet from '../components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';

export default{
      components: {
            NavbarComplet,
            VersaoMaximisada
      }
}
</script>

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <div class="row">
      <NavbarComplet />
      conteudo
      <VersaoMaximisada />
    </div>
    <div class="row" >
      sdsa
    </div>
</template>

<style scoped>

</style>