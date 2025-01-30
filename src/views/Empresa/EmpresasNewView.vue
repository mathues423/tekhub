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
import TimeMensageComponent from '@/components/mensagem/TimeMensageComponent.vue';

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
                  errors: [] as Array<string>
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageComponent
      },
      methods:{
            async criacaoRequest(){
                  this.new_empresa_request = true;
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  empresa._add(this.empresa, this.errors)
                  if(this.errors.length == 0){
                        store.dispatch('putDados', {'roter_externa': 'empresa', 'dado': this.empresa, 'roter_interna': 'empresas'})
                        .then(()=> this.voltarEmpresa())
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
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'empresas'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error || fetch_error_msg['data' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageComponent v-if="fetch_error_msg['data' as keyof typeof fetch_error_msg]"
                              :mensagem="'Houve algum erro no servidor'"
                              @fechar_erro="voltarErroServer"
                        />
                        <div class="row">
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                          <!-- Razao -->
                                          <div class="col-2 form_text">
                                                *Razão social:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="empresa.descricao" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Razão social.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='razao') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- CNPJ -->
                                          <div class="col-2 form_text">
                                                *CNPJ:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="empresa.cnpj" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o CNPJ.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='cnpj') != -1}]"
                                                />
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o CNPJ valido.'"
                                                :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='400') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Codigo -->
                                          <div class="col-2 form_text">
                                                *Codigo na Tek-System:
                                          </div>
                                          <div class="col-8">
                                                <input type="number" class="form-control" v-model="empresa.codigoTek" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe um Codigo numerico.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='codigo') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Versao -->
                                          <div class="col-2 form_text">
                                                *Verção API:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="empresa.versaoApiTek" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Verção API.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='api') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
      
                                          <div style="margin-top: 16px;" class="col-12">
                                                <button class="btn btn-primary col-2" :disabled="new_empresa_request">
                                                      <span>Criar</span>
                                                </button>
                                                <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarEmpresa()">
                                                      <span>Voltar</span>
                                                </button>
                                          </div>
                                    </form>
                              </div>
                              <div class="col-3"></div>
                        </div>
                  </span>
                  <span v-else>
                        <ErroResponseComponent 
                              :error_msg="fetch_error_msg"
                              @voltar="()=> voltarErro"
                        />
                  </span>
            </div>
            <VersaoMaximisada />
      </div>
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