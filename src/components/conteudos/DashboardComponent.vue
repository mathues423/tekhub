<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      template: '#Dash_comp',
      data() {
            return{
                  teste: {},
                  auth: '',
                  is_user: false,
                  estados_tabela: ['close','close','close','close','close','close','close','close','close']
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
      methods:{
            changeState(id: number){
                  this.estados_tabela[id] == 'close' ? this.estados_tabela[id] = 'open' : this.estados_tabela[id] = 'close';
            }
      },
      emits:['erro_fetch']
})
</script>

<template id="Dash_comp">
      <div class="row">
            <div v-if="is_user" class="col-12 row">
                  <div class="col-lg-1"></div>
                  <div class="col-12 col-lg-10 modal-conteiner" style="margin-top: 10px;">
                        <!-- Titulo -->
                        <span>
                              <div class="modal-header">
                                    <h4>Dúvidas frequentes</h4>
                              </div>
                              <div class="modal-footer">
                                    Abaixo seguem as dúvidas mais comuns no processo de envio de uma tabela de frete. Clique em " > " para abrir as dúvidas.
                              </div>
                        </span>

                        <!-- Documentação completa -->
                        <span>
                              <div class="modal-body-header" @click="changeState(0)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[0]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[0]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Existe uma DOCUMENTAÇÃO COMPLETA DE UTILIZAÇÃO ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[0]=='open'">
                                    <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1Jt1sFvtxSuKxedMz4wrZJHB28ER-5D17ybhBZLDa7oc/edit?usp=sharing">
                                          CLIQUE AQUI PARA VER A DOCUMENTAÇÃO COMPLETA DA TEKAPI
                                    </a>
                              </div>
                        </span>

                        <!-- Tabela de envio -->
                        <span>
                              <div class="modal-body-header" @click="changeState(1)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[1]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[1]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Como obter um modelo de tabela para envio ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[1]=='open'">
                                    <a href="https://www.teksystem.com.br/site/wp-content/uploads/2019/05/modelodetabela.csv">
                                          CLIQUE AQUI PARA BAIXAR O MODELO
                                    </a>
                              </div>
                        </span>

                        <!-- Tabela de Frete -->
                        <span>
                              <div class="modal-body-header" @click="changeState(2)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[2]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[2]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Exemplo de tabela de frete com muitos dados
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[2]=='open'">
                                    <a href="https://www.teksystem.com.br/site/wp-content/uploads/2019/05/modelo-grande.csv">
                                          CLIQUE AQUI PARA BAIXAR O EXEMPLO
                                    </a>
                              </div>
                        </span>

                        <!-- Tabela de Frete como funciona -->
                        <span>
                              <div class="modal-body-header" @click="changeState(3)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[3]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[3]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Como a tabela de frete funciona?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[3]=='open'">
                                    A tabela trabalha com faixas de cep e faixas de peso; O programa efetua uma consulta cujo critério é a faixa de cep de A até B e o peso D ATÉ E, sendo A e B ceps distintos e D e E pesos em Kg. 
                                    Deve-se repetir a faixa de cep para cada faixa de peso até chegar no máximo de peso que a transportadora entrega.
                                    Não utilize faixas de cep concorrentes na mesma faixa de peso, pois em caso de dois preços de entrega para a mesma transportadora o sistema considera como erro.
                              </div>
                        </span>

                        <!-- Envio Tabela Frete -->
                        <span>
                              <div class="modal-body-header" @click="changeState(4)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[4]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[4]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Se eu não seguir o modelo consigo enviar a tabela de frete ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[4]=='open'">
                                    Não! Somente com um modelo é possivel enviar a tabela de frete.
                              </div>
                        </span>

                        <!-- Tipos de dados permitidos -->
                        <span>
                              <div class="modal-body-header" @click="changeState(5)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[5]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[5]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Quais tipos de dados são permitidos na tabela ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[5]=='open'">
                                    CEP de: Somente números, sem pontuação e traço. Exemplo: 36500-067 torna-se 36500067 <br>
                                    Peso(kg)> : Somente números. No lugar de vírgula utilize pontos (Padrão americano). Exemplo: 23,4 torna-se 23.4 <br>
                                    Preço do frete: Somente números. No lugar de vírgula utilize pontos (Padrão americano). Exemplo: 10,5 torna-se 10.5 <br>
                                    Tipo de Frete: Textos, sem caracteres especiais. Evite criar textos com mais de 80 caracteres. Exemplo de texto correto: TRANSPORTADORA TRADICIONAL até 7 dias úteis
                              </div>
                        </span>
                        
                        <!-- Modo de envio -->
                        <span>
                              <div class="modal-body-header" @click="changeState(6)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[6]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[6]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Como enviar a tabela de frete nesse sistema ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[6]=='open'">
                                    Escolha o tipo de frete no qual sua empresa tem acesso. Após a seleção deste envie o arquivo tipo .csv e clique em salvar.
                              </div>
                        </span>

                        <!-- Tipo de arquivo -->
                        <span>
                              <div class="modal-body-header" @click="changeState(7)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[7]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[7]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Qual tipo de arquivo deve ser usado na tabela de frete ?
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[7]=='open'">
                                    A tabela de frete deve ser do tipo .csv, caso contrário NÃO será aceita. Não envie arquivos .xls, .xlsx pois não irá funcionar...Você pode até organizar sua tabela no modelo do excel, mas no final deverá converte-la para .CSV.
                              </div>
                        </span>
                        
                        <!-- Correios -->
                        <span>
                              <div class="modal-body-header" @click="changeState(8)" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" :display="estados_tabela[8]=='close' ? 'inline' : 'none'">
                                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :display="estados_tabela[8]=='close' ? 'none' : 'inline'">
                                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    Identificador Externo para Correios
                              </div>
                              <div class="modal-footer" v-if="estados_tabela[8]=='open'">
                                    PAC: 41106 <br>
                                    SEDEX: 40010
                              </div>
                        </span>
                  </div>
                  <div class="col-lg-1"></div>

            </div>
            
            <div v-else class="col-12">
                  {{teste}}
            </div>
      </div>
</template>

<style scoped>
.modal-container{
      background-color: var(--bs-white);
      margin-top: 25px;
      width: min(500px, 75%);
}
.modal-header{
      background-color: var(--bs-white);
      color: var(--bs-dark);
      font-size: 20px;
      padding: 5px;
      border: 2px solid var(--bs-gray);
      border-radius: 4px;
      /* justify-content: center; */
}

.modal-body-header{
      background-color: var(--bs-white);
      color: var(--bs-dark);
      font-size: 14px;
      padding: 5px;
      border: 2px solid var(--bs-gray);
      border-radius: 4px;
}
.modal-footer{
      font-size: 14px;
      padding: 10px;
      justify-content:left;
      border: solid var(--bs-gray);
      border-width: 0px 1px 1px 1px;
      border-radius: 3px;
}
</style>