<script lang="ts" setup>
      import { APPCONFIG } from "@/components/constants/Config";
</script>

<template>
      <div class="col-12 versao_txt">
            <div style="text-align: center;">
                  <span>Tek-System {{APPCONFIG.ano}} - Versão {{APPCONFIG.versao}}</span>
            </div>
      </div>
</template>

<style scoped>
.versao_txt{
      color: var(--bs-gray-600);
      background-color: var(--bs-white);
      font-size: 25px;
      padding: 10px;
}
</style>