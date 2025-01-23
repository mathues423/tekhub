<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import { defineComponent } from 'vue';
import canal from '@/services/regras_negocio/regras_canais';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  isEditing: false,
                  canal:{
                        descricao: '',
                        alias: '',
                        aliastekprot: '', 
                        tipo: '', 
                        canalAssociado: -1
                  },
                  old_canal:{
                        descricao: '',
                        alias: '',
                        aliastekprot: '', 
                        tipo: '', 
                        canalAssociado: -1
                  },
                  requested: false,
                  tipo_canal: ['MARKETPLACE', 'ECOMMERCE', 'LOGISTICA', 'PAGAMENTO'],
                  canal_assossiado_req: [] as Array<object>,
                  errors: []
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            LoaderSkeleton,
            ErroFormComponent,
            ErroResponseComponent
      },
      methods:{
            async editRequest(){
                  this.isEditing = true;
                  this.errors = [];
                  const id = (this.$route.params['id'] || '-1') as string;
                  canal._edit(this.old_canal, this.canal, this.errors)
                  if (this.errors.length == 0) {
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'canal', 'id': id, 'roter_interna': 'canais', 'new_dado': this.canal}))
                        .then(()=> 
                              this.voltarCanal()
                        ).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.isEditing = false;
                  }
            },
            voltarCanal(){
                  router.push('/canais');
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            }
      },
      async mounted(){
            this.requested = false;
            const rota_id = (this.$route.params['id'] || '-1') as string;
            Promise.resolve(store.dispatch('getCanaisID', rota_id))
            .then((value) => {
                  this.old_canal.alias = this.canal.alias = value.alias;
                  this.old_canal.aliastekprot = this.canal.aliastekprot = value.aliastekprot;
                  this.old_canal.descricao = this.canal.descricao = value.descricao;
                  this.old_canal.tipo = this.canal.tipo = value.tipo;
                  this.old_canal.canalAssociado = this.canal.canalAssociado = value.canalAssociado;

                  Promise.resolve(fetch_.getDado('/canal')).then(
                  (args) => {
                        this.canal_assossiado_req = args.data;
                        this.requested = true;
                  }).catch((error_retorno)=> this.showError(error_retorno))
            }).catch((error_retorno)=> this.showError(error_retorno));
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet 
                  :lateral="'canais'"
                  :have_erro="have_fetch_error"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error">
                        <div class="row">
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="editRequest" class="row form_content" novalidate>
                                          <!-- Descrição -->
                                          <div class="col-2 form_text">
                                                *Descrição:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="canal.descricao" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe a Descrição.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='descricao') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Alias -->
                                          <div class="col-2 form_text">
                                                *Alias:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="canal.alias" required>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o Alias.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='alias') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Alias TekPropt -->
                                          <div class="col-2 form_text">
                                                Alias TekPropt:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="canal.aliastekprot">
                                                <!-- <ErroFormComponent
                                                :mensagem="'Por favor informe o Alias TekPropt.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='alias_tekprot') != -1}]"
                                                /> -->
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Tipo -->
                                          <div class="col-2 form_text">
                                                *Tipo:
                                          </div>
                                          <div class="col-8">
                                                <select class="custom-select" v-model="canal.tipo" required>
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="header in tipo_canal" :key="header" :value="header"> {{ header }}</option>
                                                </select>
                                                <ErroFormComponent
                                                :mensagem="'Por favor informe o Tipo.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='tipo') != -1}]"
                                                />
                                          </div>
                                          <div class="col-2"></div>
                                          <!-- Canal Associado -->
                                          <div class="col-2 form_text">
                                                Canal Associado:
                                          </div>
                                          <!-- Como linkar o canal associado ?? -->
                                          <div class="col-8">
                                                <span v-if="requested">
                                                      <select class="custom-select" v-model="canal.canalAssociado">
                                                            <option selected disabled :value="{}"> Selecione o campo</option>
                                                            <option v-for="header in canal_assossiado_req" :key="header" :value="header['codigo' as keyof typeof header]"> {{ header['descricao' as keyof typeof header] }}</option>
                                                      </select>
                                                </span>
                                                <span v-else>
                                                      <LoaderSkeleton
                                                            :tipo_loader="'select'"
                                                      />
                                                </span>
                                                <!-- <ErroFormComponent
                                                :mensagem="'Por favor informe o Canal Associado.'"
                                                :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canal_ass') != -1}]"
                                                /> -->
                                          </div>
                                          <div class="col-2"></div>
      
                                          <!-- Botao -->
                                          <div style="margin-top: 16px;" class="col-12">
                                                <ErroFormComponent
                                                :mensagem="'Edite antes de salvar'"
                                                :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                />
                                                <button class="btn btn-primary col-2" :disabled="isEditing || !requested">
                                                      <span>Iditar</span>
                                                </button>
                                                <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarCanal()">
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