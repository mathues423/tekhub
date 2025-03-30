<script lang="ts">
import { defineComponent } from 'vue';
import user from './services/login/requisicao';

export default defineComponent({
  data(){
    return{
      tema: 'light',
    }
  },
  async mounted(){
    // if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    //   this.tema = 'dark';
    // }else{
    //   this.tema = 'light';
    // }
    await user.getToken();
  }
})


</script>

<template>
  <v-app :theme="`${tema}`">
    <v-main>
      <router-view id="conteudo" class="row"/>
    </v-main>
  </v-app>
</template>

<style>

/* #conteudo.row{
  height: 100vh;
}
#conteudo.row>div#content{
  min-height: 100vh;
} */
:root{
  --white: #fff;
  --black: #000;
  --light-blue:#0595e9;
  --light-blue2:#005281;
  --dark-blue:#002140;
}
</style>
