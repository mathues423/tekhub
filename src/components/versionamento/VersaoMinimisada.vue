<script lang="ts" setup>
      import { APPCONFIG } from "../constants/Config";
</script>

<template>
      <div style="margin-top: auto; margin-bottom: auto;">
            <span class="versao_txt">v{{APPCONFIG.versao}}</span>
      </div>
</template>

<style lang="css" scoped>
.versao_txt{
      color: var(--white); 
      position: absolute; 
      bottom: 5px; 
      right: 30px;
}
</style>