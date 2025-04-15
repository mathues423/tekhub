<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import empresa from '@/services/regras_negocio/regras_empresa';
import store from '@/store';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';
import VoltarBotaoComponent from '@/components/util/Botoes/VoltarBotaoComponent.vue';
import AdiçãoBotaoComponent from '@/components/util/Botoes/AdiçãoBotaoComponent.vue';
import TextoEntradaComponent from '@/components/util/inputs/TextoEntradaComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  new_empresa_request: false,
                  empresa:{
                        descricao: '',
                        cnpj: '',
                        codigoTek: '',
                        versaoApiTek: '',
                        integracoes: []
                  },
                  errors: [] as Array<string>,
                  criando: false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent,
            TextoEntradaComponent,
            AdiçãoBotaoComponent, VoltarBotaoComponent
      },
      methods:{
            async criacaoRequest(){
                  this.new_empresa_request = true;
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  empresa._add(this.empresa, this.errors)
                  if(this.errors.length == 0){
                        store.dispatch('postDados', {'roter_externa': 'empresa', 'dado': this.empresa, 'roter_interna': 'empresas'})
                        .then(()=>{
                              this.new_empresa_request = false;
                              this.criando = true;
                        })
                        .catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.new_empresa_request = false;
                  }
                  
            },
            voltarEmpresa(){
                  router.push('/empresas');
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.new_empresa_request = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            }
            
      }
})
</script>

<template>
<v-row no-gutters>
      <NavbarComplet 
            :have_erro="have_fetch_error"
            :lateral="'empresas'"
            :user_type="auth_type"
      />
      <v-col class="v-col-12 v-col-md-10">
            <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                  <!-- ERRO no servidor mensagem -->
                  <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                        :time_duration="10"
                        :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                        @fechar_erro="voltarErroServer"
                  />
                  <v-row no-gutters>
                        <v-col class="v-col-1"></v-col>
                        <v-col class="v-col-10 pt-10">
                              <v-form @submit.prevent="criacaoRequest">
                                    <v-row no-gutters>
                                          <!-- Razao -->
                                          <v-col class="v-col-12">
                                                <TextoEntradaComponent 
                                                      :texto_label="'Razão social'"
                                                      :error-messages="errors.findIndex((x) => x =='razao') != -1 ? 'Por favor informe a Razão social.': undefined"
                                                      @update:dado="empresa.descricao = $event"
                                                :obrigatorio="true"/>
                                          </v-col>
                                          <!-- CNPJ -->
                                           <!-- ### Codigo para maskara fazer -->
                                          <v-col class="v-col-12">
                                                <TextoEntradaComponent 
                                                      :texto_label="'CNPJ'"
                                                      placeholder="86.682.093/0001-05"
                                                      :error-messages="(errors.findIndex((x) => x =='cnpj') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                      @update:dado="empresa.cnpj = $event"
                                                :obrigatorio="true"/>
                                          </v-col>
                                          <!-- Codigo -->
                                          <v-col class="v-col-12">
                                                <TextoEntradaComponent 
                                                      :texto_label="'Codigo na Tek-System'"
                                                      type="number"
                                                      :error-messages="errors.findIndex((x) => x =='codigo') != -1 ? 'Por favor informe o codigo identificador que sera usado na Tek-System.': undefined"
                                                      @update:dado="empresa.codigoTek = $event"
                                                :obrigatorio="true"/>
                                          </v-col>
                                          <!-- Versao -->
                                          <v-col class="v-col-12">
                                                <TextoEntradaComponent 
                                                      :texto_label="'Verção API'"
                                                      placeholder="V 1.0.0"
                                                      :error-messages="errors.findIndex((x) => x =='api') != -1 ? 'Por favor informe a verção da api usada.': undefined"
                                                      @update:dado="empresa.versaoApiTek = $event"
                                                :obrigatorio="true"/>
                                          </v-col>
                                          <!-- Ação -->
                                          <v-col class="col-12">
                                                <v-row no-gutters>
                                                      <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || criando) ? 'd-flex' : 'd-none']">
                                                            <TimeMensageFormReturnComponent v-if="criando"
                                                                  :mensagem="'Empresa criada com sucesso'"
                                                                  :time_duration="5"
                                                                  @fechar_mensagem="criando = false"
                                                            />
                                                      </v-col>
                                                      <v-col class="v-col-6 py-3" align-self="center">
                                                            <AdiçãoBotaoComponent
                                                                  :icone="'mdi mdi-store-plus'"
                                                                  :is_disabled="new_empresa_request || criando"
                                                                  @criar="criacaoRequest"
                                                            />
                                                      </v-col>
                                                      <v-col class="v-col-6 py-3" align-self="center">
                                                            <VoltarBotaoComponent
                                                                  :icone="'mdi mdi-arrow-left'"
                                                                  @voltar="voltarEmpresa()"
                                                            />
                                                      </v-col>
                                                </v-row>
                                          </v-col>
                                    </v-row>
                              </v-form>
                        </v-col>
                        <v-col class="v-col-1"></v-col>
                  </v-row>
            </span>
            <span v-else>
                  <ErroResponseComponent 
                        :error_msg="fetch_error_msg"
                        @voltar="have_fetch_error = false"
                  />
            </span>
      </v-col>
      <VersaoMaximisada />
</v-row>
</template>