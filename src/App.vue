<script setup lang="ts">
import HomeView from './views/HomeView.vue';
import { APPCONFIG } from '../src/components/constants/Config'; 
</script>

<template>
  <!-- Navegaçao do site -->
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <HomeView />
  <span style="color: rgb(255, 255, 255); position: absolute; bottom: 15px; right: 15px;">v{{ APPCONFIG.versao }}</span>
</template>

<style>

body { 
  /* White teme */
  background-color: var(--light-blue);
  color: --bs-black;
  background-image: url("assets/imagens/logo-tek-hub-branca.png");
  background-size: cover;
  background-position: right;
  background-repeat: repeat-x;
  background-blend-mode: overlay;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  width: 100%;
}
/* Dark teme */
@media (prefers-color-scheme: dark) {
  body{
    background-color: var(--dark-blue);
    color: --bs-white;
    background-image: url("assets/imagens/logo-tek-hub-fundo-transparente.png");
  }
}

/* Themes */
:root{
  --light-blue:#0595e9;
  --dark-blue:#002140;
}
</style>
