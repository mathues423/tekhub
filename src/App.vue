<script lang="ts">
import user from './services/login/requisicao';

export default{
  mounted(){
    user.getToken()
  }
}

</script>

<template>
  <router-view/>
</template>

<style>

body { 
  /* White teme */
  background-color: var(--dark-blue);
  color: var(--bs-black);
  background-image: url("assets/imagens/logo-tek-hub-branca.png");
  background-size: cover;
  background-position: right;
  background-repeat: repeat-x;
  background-blend-mode: overlay;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  width: 100%;
}
/* Dark teme */
/* @media (prefers-color-scheme: dark) {
  body{
    background-color: var(--dark-blue);
    color: var(--bs-white);
    background-image: url("assets/imagens/logo-tek-hub-fundo-transparente.png");
  }
} */

/* Themes */
:root{
  --light-blue:#0595e9;
  --dark-blue:#002140;
}
</style>
