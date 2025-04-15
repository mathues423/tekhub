<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import { defineComponent } from 'vue';
import empresa from '@/services/regras_negocio/regras_empresa';
import store from '@/store';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';
import fetch_ from '@/services/fetch/requisicao';
import VoltarBotaoComponent from '@/components/util/Botoes/VoltarBotaoComponent.vue';
import EdiçãoBotaoComponent from '@/components/util/Botoes/EdiçãoBotaoComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  edit_empresa_request: false,
                  empresa:{
                        descricao: '',
                        cnpj: '',
                        codigoTek: '',
                        versaoApiTek: '',
                        integracoes: []
                  },
                  old_empresa: {
                        descricao: '',
                        cnpj: '',
                        codigoTek: '',
                        versaoApiTek: '',
                        integracoes: []
                  },
                  errors: [],
                  editado:false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent,
            EdiçãoBotaoComponent, VoltarBotaoComponent
      },
      methods:{
            async editRequest(){
                  this.edit_empresa_request = true;
                  this.errors = [];
                  const id = (this.$route.params['id'] || '-1') as string;
                  empresa._edit(this.old_empresa, this.empresa, this.errors)
                  if (this.errors.length == 0) {
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'empresa', 'id': id, 'roter_interna': 'empresas', 'new_dado': this.empresa}))
                        .then(()=> {
                                    this.edit_empresa_request = false;
                                    this.editado = true;
                                    this.old_empresa.cnpj = this.empresa.cnpj
                                    this.old_empresa.codigoTek = this.empresa.codigoTek
                                    this.old_empresa.descricao = this.empresa.descricao
                                    this.old_empresa.integracoes = this.empresa.integracoes
                                    this.old_empresa.versaoApiTek = this.empresa.versaoApiTek
                                    delete this.empresa['codigo' as keyof typeof this.empresa]
                              }).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.edit_empresa_request = false;
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
                  this.edit_empresa_request = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            }
      },
      async mounted(){
            const rota_id = (this.$route.params['id'] || '-1') as string;
            if(store.getters.getEmpresasLength){
                  Promise.resolve(store.dispatch('getEmpresasID', rota_id))
                  .then((value) => {
                        this.old_empresa.descricao = this.empresa.descricao = value.descricao;
                        this.old_empresa.cnpj = this.empresa.cnpj = value.cnpj;
                        this.old_empresa.codigoTek = this.empresa.codigoTek = value.codigoTek;
                        this.old_empresa.versaoApiTek = this.empresa.versaoApiTek = value.versaoApiTek;
                        this.old_empresa.integracoes = this.empresa.integracoes = value.integracoes;
                  }).catch((error_retorno)=> this.showError(error_retorno));
            }else{
                  Promise.resolve(fetch_.getDado_ID('/empresa', rota_id))
                  .then((value) => {
                        this.old_empresa.descricao = this.empresa.descricao = value.data.descricao;
                        this.old_empresa.cnpj = this.empresa.cnpj = value.data.cnpj;
                        this.old_empresa.codigoTek = this.empresa.codigoTek = value.data.codigoTek;
                        this.old_empresa.versaoApiTek = this.empresa.versaoApiTek = value.data.versaoApiTek;
                        this.old_empresa.integracoes = this.empresa.integracoes = value.data.integracoes;
                  }).catch((error_retorno)=> this.showError(error_retorno));
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
                                    <v-form @submit.prevent="editRequest">
                                          <v-row no-gutters>
                                                <!-- Razao -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*Razão social:"
                                                            v-model="empresa.descricao"
                                                            :error-messages="errors.findIndex((x) => x =='razao') != -1 ? 'Por favor informe a Razão social.': undefined"
                                                      density="compact" variant="outlined" required/>
            
                                                </v-col>
                                                <!-- CNPJ -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*CNPJ"
                                                            v-model="empresa.cnpj"
                                                            :error-messages="(errors.findIndex((x) => x =='cnpj') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Codigo -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*Codigo na Tek-System:"
                                                            v-model="empresa.codigoTek"
                                                            :error-messages="(errors.findIndex((x) => x =='codigo') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Versao -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*Verção API:"
                                                            v-model="empresa.versaoApiTek"
                                                            :error-messages="(errors.findIndex((x) => x =='api') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Ação -->
                                                <v-col class="col-12">
                                                      <v-row no-gutters>
                                                            <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || editado) ? 'd-flex' : 'd-none']">
                                                                  <ErroFormComponent
                                                                        :mensagem="'Edite antes de salvar'"
                                                                        :class="['desativada py-3',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                                  />
                                                                  <TimeMensageFormReturnComponent v-if="editado"
                                                                        :mensagem="'Empresa alterado com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="editado = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <EdiçãoBotaoComponent
                                                                        :is_disabled="edit_empresa_request || editado"
                                                                        :icone="'mdi mdi-square-edit-outline'"
                                                                        @editar="editRequest"
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