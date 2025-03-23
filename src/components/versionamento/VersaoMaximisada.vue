<script lang="ts" setup>
      import { APPCONFIG } from "@/components/constants/Config";
</script>

<template>
      <v-col class="v-col-12 versao_txt" align="center">
            <v-sheet color="light-blue-lighten-5" class="h-100" max-height="38" elevation="24">
                  Tek-System {{APPCONFIG.ano}} - Versão {{APPCONFIG.versao}}
            </v-sheet>
      </v-col>
</template>

<style scoped>
.versao_txt{
      font-size: 25px;
}
</style>