<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import store from '@/store';
import regra_mapeamento from '@/services/regras_negocio/regras_mapeamentoprodutos';
import fetch_ from '@/services/fetch/requisicao';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  mapeamentoproduto:{
                        empresa: {},
                        canal: {},
                        empresa_codigo: -1,
                        canal_codigo: -1,
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  mapeamentoproduto_old:{
                        empresa: {},
                        canal: {},
                        empresa_codigo: -1,
                        canal_codigo: -1,
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  empresa_request:[{}],
                  canal_request:[{}],
                  inRequestEmpresa: false,
                  inRequestCanal: false,
                  edit_mapProd_request: false,
                  alert_mensag: '<código do produto>.<código da variação>.<código da cor>.<código do acabamento>',
                  errors: [] as Array<string>,
                  editado: false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            EmpresaSelectComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent
      },
      mounted() {
            const rota_id = (this.$route.params['id'] || '-1') as string;
            if(store.getters.getMapeamentoProdutoLength){
                  store.dispatch('getMapeamentoProdutosID', rota_id)
                  .then((value) => {
                        if(this.auth_type != 'ROLE_USER'){
                              fetch_.getDado_ID('/empresa', value.empresaCodigo)
                              .then((empresa)=>{
                                    this.mapeamentoproduto.empresa = this.mapeamentoproduto_old.empresa = empresa.data;
                                    this.mapeamentoproduto.empresa_codigo = this.mapeamentoproduto_old.empresa_codigo = empresa.data.codigo;
                                    fetch_.getDado(`/integracaomarketplaceecommerce/?filtro=empresa.codigo==${value.empresaCodigo}`)
                                    .then((canal)=>{
                                          canal.data.forEach((dado: object)=>{
                                                if (dado['ambienteCanalCodigo' as keyof typeof dado] == value.canalCodigo) {
                                                      this.mapeamentoproduto.canal_codigo = this.mapeamentoproduto_old.canal_codigo = canal.data.codigo;
                                                      this.mapeamentoproduto.canal = this.mapeamentoproduto_old.canal = dado;
                                                }
                                          })
                                    }).catch((error_retorno)=> this.showError(error_retorno))
                              }).catch((error_retorno)=> this.showError(error_retorno))
                        }
                        if(this.auth_type == 'ROLE_USER'){
                              this.mapeamentoproduto.empresa_codigo = this.mapeamentoproduto_old.empresa_codigo = value.empresaCodigo;
                              this.mapeamentoproduto.canal_codigo = this.mapeamentoproduto_old.canal_codigo = value.canalCodigo;      
                        }
                        this.mapeamentoproduto.produtoErp = this.mapeamentoproduto_old.produtoErp = value.produtoErp;
                        this.mapeamentoproduto.produtoSite = this.mapeamentoproduto_old.produtoSite = value.produtoSite;
                        this.mapeamentoproduto.produtoPai = this.mapeamentoproduto_old.produtoPai = value.produtoPaiSite;
                  
                  }).catch((error_retorno)=> this.showError(error_retorno))
            }else{
                  Promise.resolve(fetch_.getDado_ID('/mapeamentoproduto', rota_id))
                  .then((value) => {
                        if(this.auth_type != 'ROLE_USER'){
                              fetch_.getDado_ID('/empresa', value.data.empresaCodigo)
                              .then((empresa)=>{
                                    this.mapeamentoproduto.empresa = this.mapeamentoproduto_old.empresa = empresa.data;
                                    this.mapeamentoproduto.empresa_codigo = this.mapeamentoproduto_old.empresa_codigo = empresa.data.codigo;
                                    fetch_.getDado(`/integracaomarketplaceecommerce/?filtro=empresa.codigo==${value.data.empresaCodigo}`)
                                    .then((canal)=>{
                                          canal.data.forEach((dado: object)=>{
                                                if (dado['ambienteCanalCodigo' as keyof typeof dado] == value.data.canalCodigo) {
                                                      this.mapeamentoproduto.canal_codigo = this.mapeamentoproduto_old.canal_codigo = canal.data.codigo;
                                                      this.mapeamentoproduto.canal = this.mapeamentoproduto_old.canal = dado;
                                                }
                                          })
                                    }).catch((error_retorno)=> this.showError(error_retorno))
                              }).catch((error_retorno)=> this.showError(error_retorno))
                        }
                        if(this.auth_type == 'ROLE_USER'){
                              this.mapeamentoproduto.empresa_codigo = this.mapeamentoproduto_old.empresa_codigo = value.data.empresaCodigo;
                              this.mapeamentoproduto.canal_codigo = this.mapeamentoproduto_old.canal_codigo = value.data.canalCodigo;      
                        }
                        this.mapeamentoproduto.produtoErp = this.mapeamentoproduto_old.produtoErp = value.data.produtoErp;
                        this.mapeamentoproduto.produtoSite = this.mapeamentoproduto_old.produtoSite = value.data.produtoSite;
                        this.mapeamentoproduto.produtoPai = this.mapeamentoproduto_old.produtoPai = value.data.produtoPaiSite;
                        console.log('Map > ', value.data)
                  }).catch((error_retorno)=> this.showError(error_retorno));
            }
            if(this.auth_type != 'ROLE_USER'){
                  this.inRequestEmpresa = true;
                  Promise.resolve(fetch_.getDado('/empresa')).then(
                        (empresas)=>{
                              this.empresa_request = empresas.data;
                              this.inRequestEmpresa = false;
                  }).catch((error_retorno)=> this.showError(error_retorno))
            }
            this.inRequestCanal = true;
            Promise.resolve(fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC`)).then(
                  (canal)=>{
                        this.canal_request = canal.data;
                        canal.data.forEach((dado: object)=>{
                              if (dado['ambienteCanalCodigo' as keyof typeof dado] == this.mapeamentoproduto.canal_codigo) {
                                    this.mapeamentoproduto.canal = this.mapeamentoproduto_old.canal = dado;
                              }
                        })
                        this.inRequestCanal = false;
            }).catch((error_retorno)=> this.showError(error_retorno))
      },
      methods:{
            async editRequest(){
                  this.edit_mapProd_request = true;
                  const id = (this.$route.params['id'] || '-1') as string;
                  this.errors = [];
                  regra_mapeamento._edit(this.mapeamentoproduto_old ,this.mapeamentoproduto, this.errors)
                  if(this.errors.length == 0){
                        const aux = {
                              canalCodigo: (this.mapeamentoproduto.canal['ambienteCanalCodigo' as keyof typeof this.mapeamentoproduto.canal] || this.mapeamentoproduto.canal_codigo),
                              empresaCodigo: (this.mapeamentoproduto.empresa['codigo' as keyof typeof this.mapeamentoproduto.empresa] || this.mapeamentoproduto.empresa_codigo),
                              produtoErp: this.mapeamentoproduto.produtoErp,
                              produtoPaiSite: this.mapeamentoproduto.produtoPai,
                              produtoSite: this.mapeamentoproduto.produtoSite
                        }
                        
                        store.dispatch('setDadosID_notCodigo', {'roter_externa': 'mapeamentoproduto','id': id, 'new_dado': aux, 'roter_interna': 'mapeamentoproduto'})
                        .then(()=> {
                              this.edit_mapProd_request = false;
                              this.editado = true;
                              this.mapeamentoproduto_old.canal = this.mapeamentoproduto.canal
                              this.mapeamentoproduto_old.empresa = this.mapeamentoproduto.empresa
                              this.mapeamentoproduto_old.produtoErp = this.mapeamentoproduto.produtoErp
                              this.mapeamentoproduto_old.produtoPai = this.mapeamentoproduto.produtoPai
                              this.mapeamentoproduto_old.produtoSite = this.mapeamentoproduto.produtoSite
                              delete this.mapeamentoproduto['codigo' as keyof typeof this.mapeamentoproduto]
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.edit_mapProd_request = false;
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
                  this.edit_mapProd_request = false;
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
                                    <v-form @submit.prevent="editRequest()" novalidate>
                                          <v-row no-gutters>
                                                <!-- Empresa -->
                                                <v-col class="v-col-12" v-if="auth_type == 'ROLE_ADMIN'">
                                                      <EmpresaSelectComponent 
                                                            :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                            :is_required="true"
                                                            :valor_inicial="Object.keys(mapeamentoproduto_old.empresa).length ? mapeamentoproduto_old.empresa : undefined"
                                                            :is_focused="true"
                                                            @empresa_escolhida="(arg: object)=> mapeamentoproduto.empresa = arg"
                                                            @Erro_fetch="(arg: object)=> $emit('erro_fetch', arg)"
                                                      />
                                                </v-col>
                                                <!-- Canal de Venda -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            variant="outlined"
                                                            v-model="mapeamentoproduto.canal"
                                                            :items="canal_request"
                                                            :loading="inRequestCanal"
                                                            label="*Canal de Venda"
                                                            :item-props="canal_toString"
                                                            :error-messages="fetch_error_msg['canal' as keyof typeof fetch_error_msg]"
                                                      />
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
                                                            variant="outlined"
                                                            v-model="mapeamentoproduto.produtoSite"
                                                            label="*Produto Site"
                                                            :error-messages="fetch_error_msg['produtoSite' as keyof typeof fetch_error_msg]"
                                                      />
                                                </v-col>
                                                <!-- Produto Pai Site -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            variant="outlined"
                                                            v-model="mapeamentoproduto.produtoPai"
                                                            label="Produto Pai Site"
                                                      />
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
                                                                        :mensagem="'Produto alterado com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="editado = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="success"
                                                                        prepend-icon="mdi mdi-square-edit-outline"
                                                                        text="Editar"
                                                                        @click="editRequest"
                                                                        :disabled="edit_mapProd_request || editado"/>
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="error"
                                                                        prepend-icon="mdi mdi-trash-can"
                                                                        text="Cancelar"
                                                                        @click="voltarMapeamentoProduto()"
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