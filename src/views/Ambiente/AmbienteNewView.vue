<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import ambiente from '@/services/regras_negocio/regras_ambientes';
import store from '@/store';
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
                  ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  ambientes: [{name: 'Homologação', value: 'HOMOLOGACAO'}, {name: 'Produção', value: 'PRODUCAO'}],
                  status_aux: false,
                  requested: false,
                  canais_requested: [] as Array<object>,
                  new_ambiente_request: false,
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
            this.requested = false;
            Promise.resolve(fetch_.getDado('/canal')).then(
                  (args)=>  {
                        this.canais_requested = args.data;
                        this.requested = true;
                  }
            ).catch((error_retorno)=> this.showError(error_retorno))
      },
      methods:{
            async criacaoRequest(){
                  this.new_ambiente_request = true;
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  if (this.status_aux) {
                        this.ambiente.status = 'ATIVO'
                  }else{
                        this.ambiente.status = 'INATIVO'
                  }
                  ambiente._add(this.ambiente, this.errors)
                  if(this.errors.length == 0){
                        Promise.resolve(
                              store.dispatch('putDados', {'roter_externa': 'ambiente', 'dado': this.ambiente, 'roter_interna': 'ambientes'})
                              .then(()=> this.voltarAmbiente())
                        ).catch((error_retorno)=> this.showError(error_retorno));
                  }
                  
            },
            voltarAmbiente(){
                  router.push('/ambientes');
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.new_ambiente_request = false;
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
                  :lateral="'ambiente'"
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
                                          <!-- Canal -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Canal:
                                          </div>
                                          <div class="col-8">
                                                <span v-if="requested">
                                                      <select class="custom-select" v-model="ambiente.canalAlias">
                                                            <option selected disabled :value="{}"> Selecione o campo</option>
                                                            <option v-for="header in canais_requested" :key="header['codigo' as keyof typeof header]" :value="header['alias' as keyof typeof header]"> {{ header['descricao' as keyof typeof header] }} | {{ header['tipo' as keyof typeof header] }}</option>
                                                      </select>
                                                </span>
                                                <span v-else>
                                                      <LoaderSkeleton 
                                                            :tipo_loader="'select'"
                                                      />
                                                </span>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o canal.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canalAlias') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Url -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Url:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="ambiente.url">
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o URL.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='url') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Versão -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Versão:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="ambiente.versao">
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o versão.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='versao') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Ambiente -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Ambiente:
                                          </div>
                                          <div class="col-8">
                                                <select class="custom-select w-100" v-model="ambiente.ambiente">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="header in ambientes" :key="header.name" :value="header.value"> {{ header.name }}</option>
                                                </select>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o ambiente.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='ambiente') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Status -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Status:
                                          </div>
                                          <div class="col-8">
                                                <div class="form-check form-switch">
                                                      <input style="height: 1.75em; width: 3.5em;" class="form-check-input" type="checkbox" role="switch" v-model="status_aux" aria-checked="mixed">
                                                </div>
                                          </div>
                                          <div class="col-lg-2"></div>
      
                                          <div style="margin-top: 16px;" class="col-12">
                                                <button class="btn btn-primary col-4 col-lg-2" :disabled="new_ambiente_request || !requested">
                                                      <span>Criar</span>
                                                </button>
                                                <button class="btn btn-light col-4 col-lg-2" style="margin-left: 24px;" @click="voltarAmbiente">
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
.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>