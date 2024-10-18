<script lang="ts">
// import { Options, Vue } from "vue-class-component";
import NavbarComplet from '../components/navbars/NavbarComplet.vue';

export default{
      components: {
            NavbarComplet
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
  </div>

</template>

<style scoped>

</style>