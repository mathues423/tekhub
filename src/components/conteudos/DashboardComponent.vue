<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent, ref } from 'vue';


export default defineComponent({
      template: '#Dash_comp',
      data() {
            return{
                  teste: {},
                  auth: '',
                  is_user: false,
                  tabela_dashboard: ref(['TITLE'])
            }
      },
      mounted() {
            if (this.user_type != 'ROLE_USER') {
                  Promise.resolve(fetch_.getDado('/atualizacaoecommerce/pendentes'))
                  .then((ret)=> {
                        this.teste = ret
                  }).catch((error_retorno)=> this.$emit('erro_fetch', error_retorno))
            }else{
                  this.is_user = true
            }
      },
      props:{
            user_type:{
                  type: String,
                  required: true
            }
      },
      emits:['erro_fetch']
})
</script>

<template id="Dash_comp">
<v-row no-gutters>
      <v-col class="v-col-12 pl-2" v-if="is_user">
            <!-- Titulo -->
            <div class="text-h5">Dúvidas frequentes</div>
            <div class="text-body-1">
                  Abaixo seguem as dúvidas mais comuns no processo de envio de uma tabela de frete. Clique em "<span><v-icon icon="mdi-chevron-down"/></span>" para abrir as dúvidas.
            </div>
            <v-list v-model:opened="tabela_dashboard" :activatable="true" base-color="table_dashboar_active" active-class="item_opened" class='mx-2'>
                  <!-- Documentação completa -->
                  <v-list-group value="DOC_COMP">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0"
                                    v-bind="props"
                              >
                              Existe uma DOCUMENTAÇÃO COMPLETA DE UTILIZAÇÃO ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('DOC_COMP')"
                              style="color: var(--text-herf)!important;" 
                              class="text-decoration-underline"
                              href="https://docs.google.com/document/d/1Jt1sFvtxSuKxedMz4wrZJHB28ER-5D17ybhBZLDa7oc/edit?usp=sharing" 
                        >
                        CLIQUE AQUI PARA VER A DOCUMENTAÇÃO COMPLETA DA TEKAPI
                        </v-list-item>
                  </v-list-group>
                  <!-- Tabela de envio -->
                  <v-list-group value="TAB_ENVIO">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Como obter um modelo de tabela para envio ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              class="text-decoration-underline"
                              style="color: var(--text-herf)!important;"
                              :active="tabela_dashboard.includes('TAB_ENVIO')"
                              href="https://www.teksystem.com.br/site/wp-content/uploads/2019/05/modelodetabela.csv"
                        >
                        CLIQUE AQUI PARA BAIXAR O MODELO
                        </v-list-item>
                  </v-list-group>
                  <!-- Tabela de Frete -->
                  <v-list-group value="TAB_FRETE">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Exemplo de tabela de frete com muitos dados
                              </v-list-item>
                        </template>
                        <v-list-item 
                              class="text-decoration-underline"
                              style="color: var(--text-herf)!important;"
                              :active="tabela_dashboard.includes('TAB_FRETE')"
                              href="https://www.teksystem.com.br/site/wp-content/uploads/2019/05/modelo-grande.csv"
                        >
                        CLIQUE AQUI PARA BAIXAR O EXEMPLO
                        </v-list-item>
                  </v-list-group>
                  <!-- Tabela de Frete como funciona -->
                  <v-list-group value="TAB_FRETE_FUNC">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Como a tabela de frete funciona?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('TAB_FRETE_FUNC')"
                        >
                        A tabela trabalha com faixas de cep e faixas de peso; O programa efetua uma consulta cujo critério é a faixa de cep de A até B e o peso D ATÉ E, sendo A e B ceps distintos e D e E pesos em Kg. Deve-se repetir a faixa de cep para cada faixa de peso até chegar no máximo de peso que a transportadora entrega. Não utilize faixas de cep concorrentes na mesma faixa de peso, pois em caso de dois preços de entrega para a mesma transportadora o sistema considera como erro.
                        </v-list-item>
                  </v-list-group>
                  <!-- Envio Tabela Frete -->
                  <v-list-group value="ENVIO_TAB_FRETE">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Se eu não seguir o modelo consigo enviar a tabela de frete ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('ENVIO_TAB_FRETE')"
                        >
                        Não! Somente com um modelo é possivel enviar a tabela de frete.
                        </v-list-item>
                  </v-list-group>
                  <!-- Tipos de dados permitidos -->
                  <v-list-group value="TIPOS_DADOS">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Quais tipos de dados são permitidos na tabela ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('TIPOS_DADOS')"
                        >
                              CEP de: Somente números, sem pontuação e traço. Exemplo: 36500-067 torna-se 36500067 <br>
                              Peso(kg)> : Somente números. No lugar de vírgula utilize pontos (Padrão americano). Exemplo: 23,4 torna-se 23.4 <br>
                              Preço do frete: Somente números. No lugar de vírgula utilize pontos (Padrão americano). Exemplo: 10,5 torna-se 10.5 <br>
                              Tipo de Frete: Textos, sem caracteres especiais. Evite criar textos com mais de 80 caracteres. Exemplo de texto correto: TRANSPORTADORA TRADICIONAL até 7 dias úteis
                        </v-list-item>
                  </v-list-group>
                  <!-- Modo de envio -->
                  <v-list-group value="MODO_ENVIO">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Como enviar a tabela de frete nesse sistema ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('MODO_ENVIO')"
                        >
                        Escolha o tipo de frete no qual sua empresa tem acesso. Após a seleção deste envie o arquivo tipo .csv e clique em salvar.
                        </v-list-item>
                  </v-list-group>
                  <!-- Tipo de arquivo -->
                  <v-list-group value="TIPO_ARQUIVO">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Qual tipo de arquivo deve ser usado na tabela de frete ?
                              </v-list-item>
                        </template>
                        <v-list-item 
                              height="auto"
                              :active="tabela_dashboard.includes('TIPO_ARQUIVO')"
                        >
                        A tabela de frete deve ser do tipo .csv, caso contrário NÃO será aceita. Não envie arquivos .xls, .xlsx pois não irá funcionar...Você pode até organizar sua tabela no modelo do excel, mas no final deverá converte-la para .CSV.
                        </v-list-item>
                  </v-list-group>
                  <!-- Correios -->
                  <v-list-group value="CORREIOS">
                        <template v-slot:activator="{ props }">
                              <v-list-item
                                    class="mb-0 mt-2"
                                    v-bind="props"
                              >
                              Identificador Externo para Correios
                              </v-list-item>
                        </template>
                        <v-list-item 
                              :active="tabela_dashboard.includes('CORREIOS')"
                        >
                        PAC: 41106 SEDEX: 40010
                        </v-list-item>
                  </v-list-group>
            </v-list>
      </v-col>
      <v-col class="v-col-12 pl-2" v-else>
            {{teste}}
      </v-col>
</v-row>
</template>

<style scoped>
:root{
      --text-herf: #000;
}
.item_opened{
      --text-herf: blue;
      background-color: #f5f5f5;
}
/* @media (prefers-color-scheme: dark){
      .item_opened{
            --text-herf: #0000af;
            background-color: #5f5f5f;
      }
} */
</style>