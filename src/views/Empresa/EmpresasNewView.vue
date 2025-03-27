<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import empresa from '@/services/regras_negocio/regras_empresa';
import store from '@/store';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';

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
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent
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
                                                <v-text-field
                                                      variant="outlined"
                                                      label="*Razão social:"
                                                      placeholder="Razão social"
                                                      v-model="empresa.descricao"
                                                      :error-messages="errors.findIndex((x) => x =='razao') != -1 ? 'Por favor informe a Razão social.': undefined"
                                                required/>
      
                                          </v-col>
                                          <!-- CNPJ -->
                                           <!-- ### Codigo para maskara fazer -->
                                          <v-col class="v-col-12">
                                                <v-text-field
                                                      variant="outlined"
                                                      label="*CNPJ"
                                                      placeholder="86.682.093/0001-05"
                                                      v-model="empresa.cnpj"
                                                      :error-messages="(errors.findIndex((x) => x =='cnpj') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                required/>
                                          </v-col>
                                          <!-- Codigo -->
                                          <v-col class="v-col-12">
                                                <v-text-field
                                                      variant="outlined"
                                                      label="*Codigo na Tek-System:"
                                                      placeholder="1"
                                                      v-model="empresa.codigoTek"
                                                      :error-messages="(errors.findIndex((x) => x =='codigo') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                required/>
                                          </v-col>
                                          <!-- Versao -->
                                          <v-col class="v-col-12">
                                                <v-text-field
                                                      variant="outlined"
                                                      label="*Verção API:"
                                                      placeholder="V 1.0.0"
                                                      v-model="empresa.versaoApiTek"
                                                      :error-messages="(errors.findIndex((x) => x =='api') != -1 ? 'Por favor informe o CNPJ.': undefined) || (errors.findIndex((x) => x =='400') != -1 ? 'Por favor informe o CNPJ valido.': undefined)"
                                                required/>
                                          </v-col>
                                          <!-- Ação -->
                                          <v-col class="col-12">
                                                <v-row no-gutters>
                                                      <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || editado) ? 'd-flex' : 'd-none']">
                                                            <ErroFormComponent
                                                                  :mensagem="'Edite antes de salvar'"
                                                                  :class="['desativada py-3',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                            />
                                                            <TimeMensageFormReturnComponent v-if="criando"
                                                                  :mensagem="'Empresa criada com sucesso'"
                                                                  :time_duration="5"
                                                                  @fechar_mensagem="criando = false"
                                                            />
                                                      </v-col>
                                                      <v-col class="v-col-6 py-3" align-self="center">
                                                            <v-btn
                                                                  color="success"
                                                                  prepend-icon="mdi mdi-store-plus"
                                                                  text="Criar"
                                                                  @click="criacaoRequest"
                                                                  :disabled="new_empresa_request || criando"/>
                                                      </v-col>
                                                      <v-col class="v-col-6 py-3" align-self="center">
                                                            <v-btn
                                                                  color="error"
                                                                  prepend-icon="mdi mdi-trash-can"
                                                                  text="Cancelar"
                                                                  @click="voltarEmpresa()"
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

<style scoped>
#content{
      background-color: var(--bs-white);
      color: var(--bs-gray-600);
      padding-top: 24px;
}

.form_text{
      font-size: 14px;
      color: var(--bs-black);
      text-align: right;
}
.form_content > div{
      padding-top: 10px;
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>