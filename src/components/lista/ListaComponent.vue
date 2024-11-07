<script lang="ts">
import EdicaoExclusaoComponent from './EdicaoExclusaoComponent.vue';

export default {
      components:{
            EdicaoExclusaoComponent,
      },
      props:{
            tradutor:{
                  header: {
                        type: [String],
                        require: true
                  },
                  header_to_dados: {
                        type: [String],
                        require: true
                  }
            },
            nome_rota_para_edicao: {
                  type: String,
                  require: true
            },
            nome_rota_interna: {
                  type: String,
                  require: true
            },
            nome_rota_externa: {
                  type: String,
                  require: true
            },
            dados: {
                  type: Array,
                  require: true
            }
      }
}
</script>

<template>
<table class="table">
      <thead class="table-primary">
            <tr>
                  <th v-for="header in tradutor.header" :key="header" scope="col">
                        {{ header.title }}
                  </th>
            </tr>
      </thead>
      <tbody>
            <tr v-for="dado in dados" :key="dado">
                  <th v-for="(traduzido, index) in tradutor.header_to_dados" :key="traduzido" :class="`${index === 0  ? 'important' : 'not_important'}`">
                        <span v-if="tradutor.header_to_dados[index] != 'buttons'">
                              {{ dado[traduzido] }}
                        </span>
                        <span v-else>
                              <EdicaoExclusaoComponent 
                              :nome_rota_interna="nome_rota_interna"
                              :nome_rota_externa="nome_rota_externa"
                              :nome_rota_para_edicao="nome_rota_para_edicao" 
                              :id_="dado['codigo']"/>
                        </span>
                  </th>
            </tr>
      </tbody>
</table>
</template>

<style scoped>
.important{
      color: var(--bs-dark);
}

.not_important{
      color: var(--bs-gray-800);
}
</style>