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
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      this.tema = 'dark';
    }else{
      this.tema = 'light';
    }
    await user.getToken();
  }
})


</script>

<template>
  <v-app :theme="`${tema}`">
    <v-main>
      <router-view id="template"/>
    </v-main>
  </v-app>
</template>

<style>

#template.row{
  height: 100vh;
}
#template.row>div#content{
  min-height: calc(100vh - calc( 78px + 50px));
}
:root{
  --light-blue:#0595e9;
  --dark-blue:#002140;
  --black: #000;
}
</style>
