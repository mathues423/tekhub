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
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  edit_canal_request: false,
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
                  errors: [],
                  editado: false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            // ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            // TimeMensageFormReturnComponent
      },
      methods:{
            async editRequest(){
                  this.edit_canal_request = true;
                  this.errors = [];
                  const id = (this.$route.params['id'] || '-1') as string;
                  canal._edit(this.old_canal, this.canal, this.errors)
                  if (this.errors.length == 0) {
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'canal', 'id': id, 'roter_interna': 'canais', 'new_dado': this.canal}))
                        .then((ret)=> {
                              this.edit_canal_request = false;
                              this.editado = true;
                              this.old_canal.alias = this.canal.alias
                              this.old_canal.aliastekprot = this.canal.aliastekprot
                              // this.old_canal.canalAssociado = this.canal.canalAssociado //Erro 
                              this.old_canal.descricao = this.canal.descricao
                              this.old_canal.tipo = this.canal.tipo
                              delete this.canal['codigo' as keyof typeof this.canal]
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.edit_canal_request = false;
                  }
            },
            voltarCanal(){
                  router.push('/canais');
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.edit_canal_request = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            }
      },
      async mounted(){
            this.requested = false;
            const rota_id = (this.$route.params['id'] || '-1') as string;
            if(store.getters.getCanaisLength){
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
            }else{
                  Promise.resolve(fetch_.getDado_ID('/canal', rota_id))
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
      }
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :lateral="'canais'"
                  :have_erro="have_fetch_error"
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
                                    <v-form @submit.prevent="editRequest" class="row form_content" novalidate>
                                          <v-row no-gutters>
                                                <!-- Descrição -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            v-model="canal.descricao"
                                                            label="*Descrição"
                                                            :erros-mensage="errors.findIndex((x) => x =='descricao') != -1 ? 'Informe a descrição do canal' : undefined"
                                                      density="compact" variant="outlined" focused/>
                                                </v-col>
                                                <!-- Alias -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            v-model="canal.alias"
                                                            label="*Alias"
                                                            :erros-mensage="errors.findIndex((x) => x =='alias') != -1 ? 'Informe o alias do canal' : undefined"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- AliasTekProt -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            v-model="canal.aliastekprot"
                                                            label="Alias TekProt"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Tipo -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            v-model="canal.tipo"
                                                            :items="tipo_canal"
                                                            label="*Tipo"
                                                            :erros-mensage="errors.findIndex((x) => x =='tipo') != -1 ? 'Informe o tipo do canal' : undefined"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Canal Associado -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            v-model="canal.canalAssociado"
                                                            label="Canal Associado"
                                                            :items="canal_assossiado_req"
                                                            item-title="descricao"
                                                            :loading="!requested"
                                                      density="compact" variant="outlined"/>
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
                                                                        :mensagem="'Canal alterado com sucesso'"
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
                                                                        :disabled="edit_canal_request || editado"/>
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="error"
                                                                        prepend-icon="mdi mdi-trash-can"
                                                                        text="Cancelar"
                                                                        @click="voltarCanal()"
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
                              @voltar="have_fetch_error = false"
                        />
                  </span>
            </v-col>
            <VersaoMaximisada />
      </v-row>
</template>