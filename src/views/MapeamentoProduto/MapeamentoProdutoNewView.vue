<script lang="ts">
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

export default defineComponent({
      data(){
            return {
                  mapeamentoproduto:{
                        empresa: {},
                        canal: {},
                        produtoErp: '',
                        produtoSite: '',
                        produtoPai: ''
                  },
                  canal_request:{},
                  inRequestCanal: false,
                  escolheu_empresa:false,
                  alert_mensag: '<código do produto>.<código da variação>.<código da cor>.<código do acabamento>',
                  errors: [] as Array<string>
            }
      },
      watch:{
            'mapeamentoproduto.empresa'(newD){
                  this.inRequestCanal = true;
                  Promise.resolve(fetch_.getDado(`/integracaomarketplaceecommerce/?pagina=1&porPagina=0&ordenacao=codigo&direcao=ASC&filtro=empresa.codigo==${newD.codigo}`)).then(
                        (canal)=>{
                              this.canal_request = canal.data;
                              this.inRequestCanal = false;
                              this.escolheu_empresa = true;
                  })
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            LoaderSkeleton,
            EmpresaSelectComponent,
            ErroFormComponent
      },
      methods:{
            async criacaoRequest(){
                  regra_mapeamento._add(this.mapeamentoproduto, this.errors)
                  if(this.errors.length == 0){
                        const aux = {
                              canalCodigo: this.mapeamentoproduto.canal['codigo' as keyof typeof this.mapeamentoproduto.canal],
                              empresaCodigo: this.mapeamentoproduto.empresa['codigo' as keyof typeof this.mapeamentoproduto.empresa],
                              produtoErp: this.mapeamentoproduto.produtoErp,
                              produtoPaiSite: this.mapeamentoproduto.produtoPai,
                              produtoSite: this.mapeamentoproduto.produtoSite,
                        }
                        Promise.resolve(
                              store.dispatch('putDados', {'roter_externa': 'mapeamentoprodudo/', 'dado': aux, 'roter_interna': 'mapeamentoprodudo'})
                              .then(()=> this.voltarMapeamentoProduto())
                        ).catch((error)=> {
                              this.errors?.push('400')
                              console.warn(error) 
                        })
                  }
                  
            },
            voltarMapeamentoProduto(){
                  router.push('/mapeamentoprodutos');
            },
            compObject(old_obj: object, new_ob: object): boolean {
                  const chave_old = Object.keys(old_obj),
                        chave_new = Object.keys(new_ob);
                  if (chave_old.length != chave_new.length) {
                        return true;
                  }
                  const saoDiferentes = chave_old.some((chave) => {
                              return old_obj[chave as keyof typeof old_obj] !== new_ob[chave as keyof typeof new_ob];
                        });
            
                  return !saoDiferentes
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'map_pro'"/>
            <div class="col-12 col-lg-10" id="content">
                  <div class="row">
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                    <!-- Empresa -->
                                    <div class="col-2 form_text">
                                          *Empresa:
                                    </div>
                                    <div class="col-8">
                                          <EmpresaSelectComponent
                                                :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                @empresa_escolhida="(arg: object)=> mapeamentoproduto.empresa = arg"
                                          />
                                          <ErroFormComponent
                                                :mensagem="'Por favor informe a Empresa.'"
                                                :class="['my-1 alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='empresa') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Canal -->
                                    <div class="col-2 form_text">
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
                                          <button class="btn btn-primary col-2">
                                                <span>Criar</span>
                                          </button>
                                          <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarMapeamentoProduto()">
                                                <span>Voltar</span>
                                          </button>
                                    </div>
                              </form>
                        </div>
                        <div class="col-3"></div>
                  </div>
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