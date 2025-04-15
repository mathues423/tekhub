<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import store from '@/store';
import regra_mapeamento from '@/services/regras_negocio/regras_mapeamentoprodutos';
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
                  mapeamentoproduto:{
                        empresa: {} as Record<string, any>,
                        canal: {},
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  usuarios: {},
                  empresa_codigo: -1,
                  new_mapeamento_request: false,
                  canal_request: undefined,
                  inRequestCanal: false,
                  escolheu_empresa:false,
                  alert_mensag: '<código do produto>.<código da variação>.<código da cor>.<código do acabamento>',
                  errors: [] as Array<string>,
                  criando: false
            }
      },
      watch:{
            'mapeamentoproduto.empresa'(newD){
                  if(this.auth_type == 'ROLE_ADMIN'){
                        this.inRequestCanal = true;
                        Promise.resolve(fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC&filtro=empresa.codigo==${newD.codigo}`)).then(
                              (canal)=>{
                                    this.canal_request = canal.data;
                                    this.inRequestCanal = false;
                                    this.escolheu_empresa = true;
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }
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
            if(this.auth_type == 'ROLE_USER'){
                  fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC`)
                  .then((user)=>{
                        this.usuarios = user.data;
                        user.data.forEach((value: any, index: number) => {
                              if( index == 0){
                                    this.empresa_codigo = parseInt(value.empresaCodigo);
                                    this.mapeamentoproduto.empresa.codigo = value.empresaCodigo;
                              }
                        })
                        fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC&filtro=empresa.codigo==${this.empresa_codigo}`)
                        .then((canal)=>{
                              this.canal_request = canal.data;
                              this.inRequestCanal = false;
                              this.escolheu_empresa = true;
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }).catch((error_retorno)=> this.showError(error_retorno))
            }
      },
      methods:{
            async criacaoRequest(){
                  this.new_mapeamento_request = true;
                  regra_mapeamento._add(this.mapeamentoproduto, this.errors, this.auth_type);
                  if(this.errors.length == 0){
                        let aux: {
                              canalCodigo: number,
                              empresaCodigo?: number,
                              produtoErp: string,
                              produtoSite: string
                              produtoPaiSite?: string,
                        }={   
                              empresaCodigo: this.mapeamentoproduto.empresa['codigo' as keyof typeof this.mapeamentoproduto.empresa],
                              canalCodigo: this.mapeamentoproduto.canal['ambienteCanalCodigo' as keyof typeof this.mapeamentoproduto.canal],
                              produtoErp: this.mapeamentoproduto.produtoErp,
                              produtoSite: this.mapeamentoproduto.produtoSite,
                              produtoPaiSite: this.mapeamentoproduto.produtoPai,
                        }

                        if (this.auth_type == 'ROLE_USER'){
                              delete aux.empresaCodigo;
                        }
                        if(this.mapeamentoproduto.produtoPai == ''){
                              delete aux.produtoPaiSite;
                        }
                        Promise.resolve(
                              store.dispatch('postDados', {'roter_externa': 'mapeamentoproduto/', 'dado': aux, 'roter_interna': 'mapeamentoproduto'})
                              .then((ret)=> {
                                    this.new_mapeamento_request = false;
                                    this.criando = true;
                              })
                        ).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.new_mapeamento_request = false;
                  }
            },
            voltarMapeamentoProduto(){
                  router.push('/mapeamentoprodutos');
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.new_mapeamento_request = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            },
            canal_toString(item: any){
                  return{
                        title : item['ambienteCanalAlias' as keyof typeof item],
                        value : item
                  }
            }
      }
})
</script>

<template>
            <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'map_pro'"
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
                                    <v-form @submit.prevent="criacaoRequest()" novalidate>
                                          <v-row no-gutters>
                                                <!-- Empresa -->
                                                <v-col class="v-col-12" v-if="auth_type == 'ROLE_ADMIN'">
                                                      <EmpresaSelectComponent 
                                                            :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                            :is_required="true"
                                                            :is_focused="true"
                                                            @empresa_escolhida="(arg: object)=> mapeamentoproduto.empresa = arg"
                                                            @Erro_fetch="(arg: object)=> $emit('erro_fetch', arg)"
                                                      />
                                                </v-col>
                                                <!-- Canal de Venda -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            v-model="mapeamentoproduto.canal"
                                                            :items="canal_request"
                                                            :loading="inRequestCanal"
                                                            label="*Canal de Venda"
                                                            :item-props="canal_toString"
                                                            :no-data-text="canal_request ? 'Nenhum Canal de Venda encontrado' : 'Selecione primeiro a Empresa'"
                                                            :error-messages="fetch_error_msg['canal' as keyof typeof fetch_error_msg]"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Produto Erp -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            variant="outlined"
                                                            v-model="mapeamentoproduto.produtoErp"
                                                            label="*Produto Erp"
                                                            :error-messages="fetch_error_msg['produtoErp' as keyof typeof fetch_error_msg]"
                                                      />
                                                </v-col>
                                                <!-- Produto Site -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            v-model="mapeamentoproduto.produtoSite"
                                                            label="*Produto Site"
                                                            :error-messages="fetch_error_msg['produtoSite' as keyof typeof fetch_error_msg]"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Produto Pai Site -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            v-model="mapeamentoproduto.produtoPai"
                                                            label="Produto Pai Site"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Ação -->
                                                <v-col class="col-12">
                                                      <v-row no-gutters>
                                                            <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || criando) ? 'd-flex' : 'd-none']">
                                                                  <TimeMensageFormReturnComponent v-if="criando"
                                                                        :mensagem="'Produto criado com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="criando = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <AdiçãoBotaoComponent
                                                                        :icone="'mdi mdi-square-edit-outline'"
                                                                        :is_disabled="new_mapeamento_request || criando"
                                                                        @criar="criacaoRequest"     
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <VoltarBotaoComponent
                                                                        :icone="'mdi mdi-arrow-left'"
                                                                        @voltar="voltarMapeamentoProduto()"
                                                                  />
                                                            </v-col>
                                                      </v-row>
                                                </v-col>
                                                <!-- Info -->
                                                <v-col class="v-col-12 pt-2 pb-5">
                                                      <v-alert
                                                            class="pa-1"
                                                            title="Máscara do Produto ERP"
                                                            :border="true"
                                                            type="warning"
                                                            :text="alert_mensag"
                                                      />
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