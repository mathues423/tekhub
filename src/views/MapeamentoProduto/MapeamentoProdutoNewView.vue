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
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';

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
                  canal_request:{},
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
            LoaderSkeleton,
            EmpresaSelectComponent,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent
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
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'map_pro'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :time_duration="10"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <div class="row">
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                          <!-- Empresa -->
                                          <div class="col-4 col-lg-2 form_text" v-if="auth_type != 'ROLE_USER'">
                                                *Empresa:
                                          </div>
                                          <div class="col-8" v-if="auth_type != 'ROLE_USER'">
                                                <EmpresaSelectComponent
                                                      :valor_inicial="{}"
                                                      :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                      @empresa_escolhida="(arg: object)=> mapeamentoproduto.empresa = arg"
                                                />
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe a Empresa.'"
                                                      :class="['my-1 alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='empresa') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2" v-if="auth_type != 'ROLE_USER'"></div>
                                          <!-- Canal -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Canal de Venda:
                                          </div>
                                          <div class="col-8">
                                                <div v-show="inRequestCanal || !escolheu_empresa">
                                                      <LoaderSkeleton 
                                                            :tipo_loader="'select'"
                                                      />
                                                </div>
                                                <select class="custom-select w-100" v-model="mapeamentoproduto.canal" required v-show="!inRequestCanal && escolheu_empresa">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="canal in canal_request" :key="canal" :value="canal"> {{ canal['ambienteCanalAlias' as keyof typeof canal] }}</option>
                                                </select>
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe a Canal.'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canal') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- ProdutoERP -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Produto Erp:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoErp" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Erp.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoErp') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- ProdutoSite -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Produto Site:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoSite" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Site.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoSite') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- ProdutoPai -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Produto Pai:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoPai" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Pai.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoPai') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          
                                          <div class="my-2 col alert alert-warning">
                                                <div style="color:black;"> Máscara do Produto ERP </div>
                                                <span>{{ alert_mensag }}</span>
                                          </div>
      
                                          <div style="margin-top: 16px;" class="col-12">
                                                <TimeMensageFormReturnComponent v-if="criando"
                                                      :mensagem="'Produto criado com sucesso'"
                                                      :time_duration="5"
                                                      @fechar_mensagem="criando = false"
                                                />
                                                <button class="btn btn-primary col-4 col-lg-2" :disabled="new_mapeamento_request || criando">
                                                      <span>Criar</span>
                                                </button>
                                                <button class="btn btn-light col-4 col-lg-2" style="margin-left: 24px;" @click="voltarMapeamentoProduto()">
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
                              @voltar="voltarErro"
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