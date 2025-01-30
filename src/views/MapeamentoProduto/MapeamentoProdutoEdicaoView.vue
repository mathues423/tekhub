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
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageComponent from '@/components/mensagem/TimeMensageComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  mapeamentoproduto:{
                        empresa: {},
                        canal: {},
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  mapeamentoproduto_old:{
                        empresa: {},
                        canal: {},
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  empresa_request:{},
                  canal_request:{},
                  inRequestEmpresa: false,
                  inRequestCanal: false,
                  edit_mapProd_request: false,
                  alert_mensag: '<código do produto>.<código da variação>.<código da cor>.<código do acabamento>',
                  errors: [] as Array<string>
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            LoaderSkeleton,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageComponent
      },
      mounted() {
            const rota_id = (this.$route.params['id'] || '-1') as string;
            Promise.resolve(store.dispatch('getMapeamentoProdutosID', rota_id))
            .then((value) => {
                  Promise.resolve(fetch_.getDado_ID('/empresa', value.empresaCodigo))
                  .then((empresa)=>{
                        this.mapeamentoproduto.empresa = this.mapeamentoproduto_old.empresa = empresa.data;
                        Promise.resolve(fetch_.getDado(`/integracaomarketplaceecommerce/?filtro=empresa.codigo==${value.empresaCodigo}`))
                        .then((canal)=>{
                              canal.data.forEach((dado: object)=>{
                                    if (dado['ambienteCanalCodigo' as keyof typeof dado] == value.canalCodigo) {
                                          this.mapeamentoproduto.canal = this.mapeamentoproduto_old.canal = dado;
                                    }
                              })
                              this.inRequestCanal = false;
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }).catch((error_retorno)=> this.showError(error_retorno))


                  this.mapeamentoproduto.produtoErp = this.mapeamentoproduto_old.produtoErp = value.produtoErp;
                  this.mapeamentoproduto.produtoSite = this.mapeamentoproduto_old.produtoSite = value.produtoSite;
                  this.mapeamentoproduto.produtoPai = this.mapeamentoproduto_old.produtoPai = value.produtoPaiSite;
            }).catch((error_retorno)=> this.showError(error_retorno));

            this.inRequestEmpresa = true;
            Promise.resolve(fetch_.getDado('/empresa')).then(
                  (empresas)=>{
                        this.empresa_request = empresas.data;
                        this.inRequestEmpresa = false;
            }).catch((error_retorno)=> this.showError(error_retorno))
            this.inRequestCanal = true;
            Promise.resolve(fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC`)).then(
                  (canal)=>{
                        this.canal_request = canal.data;
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
                              canalCodigo: this.mapeamentoproduto.canal['ambienteCanalCodigo' as keyof typeof this.mapeamentoproduto.canal],
                              empresaCodigo: this.mapeamentoproduto.empresa['codigo' as keyof typeof this.mapeamentoproduto.empresa],
                              produtoErp: this.mapeamentoproduto.produtoErp,
                              produtoPaiSite: this.mapeamentoproduto.produtoPai,
                              produtoSite: this.mapeamentoproduto.produtoSite,
                        }
                        Promise.resolve(
                              store.dispatch('setDadosID_notCodigo', {'roter_externa': 'mapeamentoprodudo','id': id, 'new_dado': aux, 'roter_interna': 'mapeamentoprodudo'})
                              .then(()=> this.voltarMapeamentoProduto())
                        ).catch((error_retorno)=> this.showError(error_retorno))
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
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <span v-if="!have_fetch_error || fetch_error_msg['data' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageComponent v-if="fetch_error_msg['data' as keyof typeof fetch_error_msg]"
                              :mensagem="'Houve algum erro no servidor'"
                              @fechar_erro="voltarErroServer"
                        />
                        <div class="row">
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="editRequest()" class="row form_content" novalidate>
                                          <!-- Empresa -->
                                          <div class="col-2 form_text">
                                                *Empresa:
                                          </div>
                                          <div class="col-8">
                                                <div v-show="inRequestEmpresa">
                                                      <LoaderSkeleton 
                                                            :tipo_loader="'select'"
                                                      />
                                                </div>
                                                <select class="custom-select w-100" v-model="mapeamentoproduto.empresa" required v-show="!inRequestEmpresa">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="empresa in empresa_request" :key="empresa" :value="empresa"> {{ empresa['descricao' as keyof typeof empresa] }}</option>
                                                </select>
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe a Empresa.'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='empresa') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Canal -->
                                          <div class="col-2 form_text">
                                                *Canal de Venda:
                                          </div>
                                          <div class="col-8">
                                                <div v-show="inRequestCanal">
                                                      <LoaderSkeleton 
                                                            :tipo_loader="'select'"
                                                      />
                                                </div>
                                                <select class="custom-select w-100" v-model="mapeamentoproduto.canal" required v-show="!inRequestCanal">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="canal in canal_request" :key="canal" :value="canal"> {{ canal['ambienteCanalAlias' as keyof typeof canal] }}</option>
                                                </select>
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe a Canal.'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canal') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- ProdutoERP -->
                                          <div class="col-2 form_text">
                                                *Produto Erp:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoErp" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Erp.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoErp') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- ProdutoSite -->
                                          <div class="col-2 form_text">
                                                *Produto Site:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoSite" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Site.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoSite') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- ProdutoPai -->
                                          <div class="col-2 form_text">
                                                Produto Pai:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="mapeamentoproduto.produtoPai" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Produto Pai.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='produtoPai') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          
                                          <div class="my-2 col alert alert-warning">
                                                <div style="color:black;"> Máscara do Produto ERP </div>
                                                <span>{{ alert_mensag }}</span>
                                          </div>
      
                                          <div style="margin-top: 16px;" class="col-12">
                                                <ErroFormComponent
                                                :mensagem="'Edite antes de salvar.'"
                                                :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                />
                                                <button class="btn btn-primary col-2" :disabled="inRequestCanal || inRequestEmpresa || edit_mapProd_request">
                                                      <span>Editar</span>
                                                </button>
                                                <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarMapeamentoProduto()">
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
                  {{ mapeamentoproduto.canal }} <br><br>
                  {{ mapeamentoproduto.empresa }}<br><br>
                  <br><br>
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