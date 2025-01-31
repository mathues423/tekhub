<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import regra_marketplace from '@/services/regras_negocio/regras_merketplaceecommerce';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageComponent from '@/components/mensagem/TimeMensageComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  market_request:{},
                  marketplaceecommerce_new:{
                              empresaCodigo: -1,

                              ambienteCodigo: -1,

                              usuario: "",
                              
                              senha: "",

                              token: "",

                              appClienteId: "",

                              appClienteSecret: "",

                              urlRedirecionamento: "",
                              
                              webserviceApi: "",

                              variacaoPrincipal: "",

                              transformaVariacaoEmProdutoSimples: false,

                              modoDebug: false,

                              versaoEcommerce: "",

                              usuarioApiCodigo: -1,

                              atributosDefault: "",
                  },
                  empresas_select:{},
                  erro_empresa: false,

                  ambiente_aux:{},
                  ambiente_select:{},
                  inRequestAmbiente:false,
                  new_markEcom_request:false,
                  usuario_select:{},
                  usuarioApi_aux:{},
                  errors: [] as Array<string>
            }
      },
      watch:{
            empresas_select(empresa_new){
                  this.marketplaceecommerce_new.empresaCodigo = empresa_new.codigo;
                  Promise.resolve(fetch_.getDado(`/usuario/?filtro=empresa.codigo==${empresa_new.codigo}`))
                  .then((usuario)=>{
                        this.usuario_select = usuario.data
                  }).catch((error_retorno)=> this.showError(error_retorno))
            },
            ambiente_aux(ambiente_new){
                  this.marketplaceecommerce_new.ambienteCodigo = ambiente_new.codigo;
            },
            usuarioApi_aux(usuario_new){
                  this.marketplaceecommerce_new.usuarioApiCodigo = usuario_new.codigo;
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            LoaderSkeleton,
            EmpresaSelectComponent,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageComponent
      },
      mounted(){
            this.inRequestAmbiente = true;
            Promise.resolve(fetch_.getDado('/ambiente'))
                  .then((arg)=>{
                        this.inRequestAmbiente = false;
                        this.ambiente_select = arg.data;
            }).catch((error_retorno)=> this.showError(error_retorno))
      },
      methods:{
            async criacaoRequest(){
                  this.new_markEcom_request = true;
                  this.errors = [];
                  regra_marketplace._add(this.marketplaceecommerce_new, this.errors)
                  
                  if(this.errors.length == 0){
                        Promise.resolve(
                              store.dispatch('putDados', {'roter_externa': 'integracaomarketplaceecommerce/', 'dado': this.marketplaceecommerce_new, 'roter_interna': 'marketplaceecommerce'})
                              .then(()=> this.voltarMarktplaceEcommerce())
                        ).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.new_markEcom_request = false;
                  }
                  
            },
            voltarMarktplaceEcommerce(){
                  router.push('/integracoesmarketplacesecommerces');
            },
            showPassword(){
                  if(document.querySelector('#integra_pass')?.getAttribute('type') == 'password'){
                        document.querySelector('#integra_pass')?.setAttribute('type', 'text');
                        document.querySelector('#eyeclose')?.setAttribute('display','none');
                        document.querySelector('#eyeopen')?.setAttribute('display','inline');
                  }else{
                        document.querySelector('#integra_pass')?.setAttribute('type', 'password');
                        document.querySelector('#eyeclose')?.setAttribute('display','inline'); 
                        document.querySelector('#eyeopen')?.setAttribute('display','none');
                  }
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.new_markEcom_request = false;
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
                  :lateral="'mark_ecom'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <div class="row">
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                          <!-- Empresa -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Empresa:
                                          </div>
                                          <div class="col-8">
                                                <EmpresaSelectComponent 
                                                      :valor_inicial="{}"
                                                      :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                      @empresa_escolhida="(arg: object)=> empresas_select = arg"
                                                />
                                                <ErroFormComponent
                                                      :mensagem="'Informe a empresa'"
                                                      :class="['my-1 alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='empresa') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Ambiente -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Ambiente:
                                          </div>
                                          <div class="col-8">
                                                <LoaderSkeleton v-if="inRequestAmbiente"
                                                      :tipo_loader="'select'"
                                                />
                                                <select class="custom-select w-100" v-model="ambiente_aux" required v-if="!inRequestAmbiente">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="ambiente in ambiente_select" :key="ambiente" :value="ambiente"> {{ ambiente['canalAlias' as keyof typeof ambiente] }} | {{ ambiente['canalTipo' as keyof typeof ambiente] }}</option>
                                                </select>
                                                <ErroFormComponent
                                                      :mensagem="'Informe a ambiente'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='ambiente') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Usuario -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Usuario:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.usuario">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Senha -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Senha:
                                          </div>
                                          <div class="col-8">
                                                <div class="input-group">
                                                      <input type="password" id="integra_pass" class="form-control" v-model="marketplaceecommerce_new.senha">
                                                      <span class="input-group-text">
                                                            <button type="button" class="btn" @click="showPassword()">
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill visible" viewBox="0 0 16 16" display="inline" id="eyeclose">
                                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                                  </svg>
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" display="none" id="eyeopen">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                                  </svg>
                                                            </button>
                                                      </span>
                                                </div>
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Token -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Token:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.token">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- ClienteId -->
                                          <div class="col-4 col-lg-2 form_text">
                                                ClienteId:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.appClienteId">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- ClienteSecret -->
                                          <div class="col-4 col-lg-2 form_text">
                                                ClienteSecret:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.appClienteSecret">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- URL redirecionamento -->
                                          <div class="col-4 col-lg-2 form_text">
                                                URL redirecionamento:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.urlRedirecionamento">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Webservice Api -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Webservice Api:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.webserviceApi">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Variação Principal -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Variação Principal:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.variacaoPrincipal">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Det. em Produto Simpres -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Det. em Produto Simpres:
                                          </div>
                                          <div class="col-8">
                                                <div class="form-check form-switch">
                                                      <input style="height: 1.75em; width: 3.5em;" class="form-check-input" type="checkbox" role="switch" v-model="marketplaceecommerce_new.transformaVariacaoEmProdutoSimples" aria-checked="mixed">
                                                </div>
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Modo Dbug -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Modo Dbug:
                                          </div>
                                          <div class="col-8">
                                                <div class="form-check form-switch">
                                                      <input style="height: 1.75em; width: 3.5em;" class="form-check-input" type="checkbox" role="switch" v-model="marketplaceecommerce_new.modoDebug" aria-checked="mixed">
                                                </div>
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Versão -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Versão:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="marketplaceecommerce_new.versaoEcommerce">
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Usuário Api -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Usuário Api:
                                          </div>
                                          <div class="col-8">
                                                <select class="custom-select w-100" v-model="usuarioApi_aux" required>
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="usuario in usuario_select" :key="usuario" :value="usuario"> {{ usuario['email' as keyof typeof usuario] }}</option>
                                                </select>
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Atributos defaut(json) -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Atributos defaut(json):
                                          </div>
                                          <div class="col-8">
                                                <textarea type="text" class="form-control" v-model="marketplaceecommerce_new.atributosDefault"></textarea>
                                          </div>
      
                                          <!-- Botões -->
                                          <div style="margin-top: 16px;" class="col-12">
                                                <button class="btn btn-primary col-4 col-lg-2" :disabled="inRequestAmbiente || new_markEcom_request" >
                                                      <span>Criar</span>
                                                </button>
                                                <button class="btn btn-light col-4 col-lg-2" style="margin-left: 24px;" @click="voltarMarktplaceEcommerce()">
                                                      <span>Voltar</span>
                                                </button>
                                          </div>
                                    </form>
                              </div>
                              <div class="col"></div>
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
      align-content: center;
}
.input-group-text{
      padding: 0;
}
.custom-select{
      background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
      background-size: 8px 10px;
      padding: .375rem .75rem .375rem .75rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #495057;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: inline-block;
      
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>