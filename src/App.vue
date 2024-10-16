<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <HomeView />
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

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
}
/* Dark teme */
@media (prefers-color-scheme: dark) {
  body{
    background-color: var(--dark-blue);
    color: --bs-white;
    background-image: url("assets/imagens/logo-tek-hub-fundo-transparente.png");
    background-size: cover;
    background-position: right;
    background-repeat: repeat-x;
    background-blend-mode: overlay;
  }
}

/* Themes */
:root{
  --light-blue:#0595e9;
  --dark-blue:#002140;
}
</style>
