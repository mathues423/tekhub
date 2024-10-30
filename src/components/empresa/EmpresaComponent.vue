<script lang="ts">
import router from '@/router';
import fetch_ from '../../services/fetch/requisicao';
import ListaComponent from '../lista/ListaComponent.vue';
import { defineComponent } from "vue";
/* eslint-disable */
export default defineComponent({
      data(){
            return {
                  data_fetch: {
                        dados:[''],
                        tradutor:{
                              header:[''],
                              header_to_dados:['']
                        }
                  }
            }
      },

      components:{
            ListaComponent,
      },

      async mounted(){
            const dados_aux = await fetch_.getDado('/empresa');
            const tradutor_aux = {
                  header:['Código', 'Código Tek', 'Razão social', 'CNPJ', 'Verção API', 'Ações'],
                  header_to_dados:['codigo', 'codigoTek', 'descricao', 'cnpj', 'versaoApiTek', 'buttons']
            }
            this.data_fetch = {dados: dados_aux, tradutor: tradutor_aux};
      },
      methods:{
            newEmpresa(){
                  router.push('/empresas/0')
            }
      }
})
</script>
<!-- Falta colocar tratamento de erro -->
<template>
      <div class="row">
            <div class="col-12 botao">
                  <button class="btn" @click="newEmpresa()"> 
                        <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                              </svg>
                        </span>
                        Adicionar
                  </button>
            </div>
            <div class="col-12">
                  <ListaComponent :nome_rota_edicao="'empresas_edicao'" :dados="data_fetch.dados" :tradutor="data_fetch.tradutor" />
            </div>
      </div>
</template>

<style scoped>
.botao{
      padding-top: 10px;
      padding-bottom: 10px;
}

.botao > button{
      background-color: var(--bs-blue);
      color: var(--bs-white);
}
.botao > button:hover{
      background-color: var(--bs-blue);
      opacity: 0.85;
      color: var(--bs-white);
}
</style>