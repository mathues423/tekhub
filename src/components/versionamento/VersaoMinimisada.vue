<script lang="ts" setup>
// eslint-disable-next-line
      import { APPCONFIG } from "../constants/Config.js";
</script>

<template>
      <div style="margin-top: auto; margin-bottom: auto;">
            <span class="versao_txt">v{{APPCONFIG.versao}}</span>
      </div>
</template>

<style lang="css" scoped>
.versao_txt{
      color: var(--bs-white); 
      position: absolute; 
      bottom: 15px; 
      right: 30px;
}
</style>