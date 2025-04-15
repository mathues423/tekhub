<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import regra_marketplace from '@/services/regras_negocio/regras_merketplaceecommerce';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';
import VoltarBotaoComponent from '@/components/util/Botoes/VoltarBotaoComponent.vue';
import AdiçãoBotaoComponent from '@/components/util/Botoes/AdiçãoBotaoComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  market_request:[{}],
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
                  ambiente_select:[{}],
                  inRequestAmbiente:false,
                  new_markEcom_request:false,
                  usuario_select:[{}],
                  usuarioApi_aux:{},
                  errors: [] as Array<string>,
                  criando: false,
                  is_show_password: true
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
            EmpresaSelectComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent,
            AdiçãoBotaoComponent, VoltarBotaoComponent
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
                        store.dispatch('postDados', {'roter_externa': 'integracaomarketplaceecommerce/', 'dado': this.marketplaceecommerce_new, 'roter_interna': 'marketplaceecommerce'})
                        .then(()=> {
                              this.new_markEcom_request = false;
                              this.criando = true;
                        }).catch((error_retorno)=> this.showError(error_retorno))
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
            },
            ambiente_select_props(item: any){
                  return{
                        title : item['canalAlias' as keyof typeof item],
                        value : item
                  }
            },
            usuario_select_props(item: any){
                  return{
                        title : item['email' as keyof typeof item],
                        value : item
                  }
            },
      }
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'mark_ecom'"
                  :user_type="auth_type"
            />
            <v-col class="v-col-12 v-col-md-10 pt-10">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :time_duration="10"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <v-row no-gutters>
                              <v-col class="v-col-1"></v-col>
                              <v-col class="v-col-10">
                                    <v-form @submit.prevent="criacaoRequest()" novalidate>
                                          <v-row no-gutters>
                                                <!-- Empresa -->
                                                <v-col class="v-col-12">
                                                      <EmpresaSelectComponent
                                                            :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                            :is_required="true"
                                                            @empresa_escolhida="(arg: object)=> empresas_select = arg"
                                                            @Erro_fetch="(arg: object)=> $emit('erro_fetch', arg)"
                                                      />
                                                </v-col>
                                                <!-- Ambiente -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            v-model="ambiente_aux"
                                                            label="*Ambiente:"
                                                            :items="ambiente_select"
                                                            :item-props="ambiente_select_props"
                                                            :loading="inRequestAmbiente"
                                                            :error-messages="errors.findIndex((x) => x =='ambiente') != -1 ? 'Informe o ambiente' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Usuario -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Usuario:"
                                                            v-model="marketplaceecommerce_new.usuario"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Senha -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Senha:"
                                                            v-model="marketplaceecommerce_new.senha"
                                                            :append-inner-icon="is_show_password ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off-outline'"
                                                            @click:append-inner="is_show_password = !is_show_password"
                                                            :type="is_show_password ? 'text' : 'password'"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Token -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Token:"
                                                            v-model="marketplaceecommerce_new.token"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- ClientId -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="ClientId:"
                                                            v-model="marketplaceecommerce_new.appClienteId"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- ClientSecret -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="ClientSecret:"
                                                            v-model="marketplaceecommerce_new.appClienteSecret"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- UrlRedirecionamento -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Url redirecionamento:"
                                                            v-model="marketplaceecommerce_new.urlRedirecionamento"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- WebServiceApi -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="WebService Api:"
                                                            v-model="marketplaceecommerce_new.webserviceApi"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- VariacaoPrincipal -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Variacao Principal:"
                                                            v-model="marketplaceecommerce_new.variacaoPrincipal"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Det. Produto Simples -->
                                                <v-col class="v-col-12">
                                                      <v-switch 
                                                            color="info"
                                                            label="Det. Produto Simples"
                                                            v-model="marketplaceecommerce_new.transformaVariacaoEmProdutoSimples"
                                                      />
                                                </v-col>
                                                <!-- Modo Debug -->
                                                <v-col class="v-col-12">
                                                      <v-switch 
                                                            color="info"
                                                            label="Modo Debug"
                                                            v-model="marketplaceecommerce_new.modoDebug"
                                                      />
                                                </v-col>
                                                <!-- Versao -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Versão:"
                                                            v-model="marketplaceecommerce_new.versaoEcommerce"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- UsuarioApi -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            label="Usuário Api:"
                                                            v-model="usuarioApi_aux"
                                                            :items="usuario_select"
                                                            :item-props="usuario_select_props"
                                                            :loading="inRequestAmbiente"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Atributos Default -->
                                                <v-col class="v-col-12">
                                                      <v-textarea
                                                            v-model="marketplaceecommerce_new.atributosDefault"
                                                            label="Atributos default(json):"
                                                            auto-grow
                                                      density="compact" variant="outlined"/>
                                                 </v-col>
                                                <!-- Ação -->
                                                <v-col class="col-12">
                                                      <v-row no-gutters>
                                                            <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || criando) ? 'd-flex' : 'd-none']">
                                                                  <TimeMensageFormReturnComponent v-if="criando"
                                                                        :mensagem="'Marketplace Ecommerce alterado com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="criando = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <AdiçãoBotaoComponent
                                                                        :icone="'mdi mdi-database-plus'"
                                                                        :is_disabled="new_markEcom_request || criando"
                                                                        @criar="criacaoRequest"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <VoltarBotaoComponent
                                                                        :icone="'mdi mdi-arrow-left'"
                                                                        @voltar="voltarMarktplaceEcommerce()"
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
                              @voltar="voltarErro"
                        />
                  </span>
            </v-col>
            <VersaoMaximisada />
      </v-row>
</template>