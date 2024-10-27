<script lang="ts">
import fetch_ from '../../services/fetch/requisicao';
import ListaComponent from '../lista/ListaComponent.vue';

export default{
      data : () => ({
            data_fetch: {
                  dados: [],
                  tradutor:{
                        header:[],
                        header_to_dados:[]
                  }
            }
      }),

      components:{
            ListaComponent,
      },

      async mounted(){
            const dados_aux = await fetch_.requisicao_empresa();
            const tradutor_aux = {
                  header:['Código', 'Código Tek', 'Razão social', 'CNPJ', 'Verção API', 'Ações'],
                  header_to_dados:['codigo', 'codigoTek', 'descricao', 'cnpj', 'versaoApiTek', 'buttons']
            }

            this.data_fetch = {dados: dados_aux, tradutor: tradutor_aux};
            console.log(this.data_fetch);
      }
}
</script>
<!-- Falta colocar tratamento de erro -->
<template>
      <ListaComponent :dados="data_fetch.dados" :tradutor="data_fetch.tradutor" />
</template>

<style scoped>
</style>