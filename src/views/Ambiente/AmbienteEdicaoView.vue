<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import { defineComponent } from 'vue';
import ambiente from '@/services/regras_negocio/regras_ambientes';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';
import VoltarBotaoComponent from '@/components/util/Botoes/VoltarBotaoComponent.vue';
import EdiçãoBotaoComponent from '@/components/util/Botoes/EdiçãoBotaoComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  edit_ambiente_request: false,
                  ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  old_ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  status_aux: false,
                  requested: false,
                  canais_requested: [] as Array<object>,
                  canal_inicial: {},
                  ambientes: [{name: 'Homologação', value: 'HOMOLOGACAO'}, {name: 'Produção', value: 'PRODUCAO'}],
                  errors: [],
                  editado:false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent,
            EdiçãoBotaoComponent, VoltarBotaoComponent
      },
      methods:{
            canalToString(item: any){
                  return {
                        title: item.descricao + ' | ' + item.tipo,
                  }
            },
            async editRequest(){
                  this.edit_ambiente_request = true;
                  this.errors = [];
                  const id = (this.$route.params['id'] || '-1') as string;
                  ambiente._edit(this.old_ambiente, this.ambiente, this.errors)
                  if (this.errors.length == 0) {
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'ambiente', 'id': id, 'roter_interna': 'ambientes', 'new_dado': this.ambiente}))
                        .then((ret)=> {
                              this.edit_ambiente_request = false;
                              this.editado = true;
                              this.old_ambiente.ambiente = this.ambiente.ambiente
                              this.old_ambiente.canalAlias = this.ambiente.canalAlias
                              this.old_ambiente.status = this.ambiente.status
                              this.old_ambiente.url = this.ambiente.url
                              this.old_ambiente.versao = this.ambiente.versao
                              delete this.ambiente['codigo' as keyof typeof this.ambiente]
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }else{
                        this.edit_ambiente_request = false;
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
                  this.edit_ambiente_request = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            }
      },
      async mounted(){
            this.requested = false;
            const rota_id = (this.$route.params['id'] || '-1') as string;
            if(store.getters.getAmbientesLenght){
                  Promise.resolve(store.dispatch('getAmbientesID', rota_id))
                  .then((value) => {
                        this.old_ambiente.ambiente = this.ambiente.ambiente = value.ambiente;
                        this.old_ambiente.canalAlias = this.ambiente.canalAlias = value.canalAlias;
                        this.old_ambiente.status = this.ambiente.status = value.status;
                        if (this.old_ambiente.status == 'ATIVO') {
                              this.status_aux = true;
                        }else{
                              this.status_aux = false;
                        }
                        this.old_ambiente.url = this.ambiente.url = value.url;
                        this.old_ambiente.versao = this.ambiente.versao = value.versao;
                        Promise.resolve(fetch_.getDado('/canal'))
                        .then((args)=> {
                              this.requested = true;
                              this.canais_requested = args.data;
                              this.canais_requested.forEach((item: any)=> {
                                    if (item.alias == value.data.canalAlias) {
                                          this.canal_inicial = item;
                                    }
                              });
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }).catch((error_retorno)=> this.showError(error_retorno));
            }else{
                  Promise.resolve(fetch_.getDado_ID('/ambiente', rota_id))
                  .then((value) => {
                        this.old_ambiente.ambiente = this.ambiente.ambiente = value.data.ambiente;
                        this.old_ambiente.canalAlias = this.ambiente.canalAlias = value.data.canalAlias;
                        this.old_ambiente.status = this.ambiente.status = value.data.status;
                        if (this.old_ambiente.status == 'ATIVO') {
                              this.status_aux = true;
                        }else{
                              this.status_aux = false;
                        }
                        this.old_ambiente.url = this.ambiente.url = value.data.url;
                        this.old_ambiente.versao = this.ambiente.versao = value.data.versao;
                        Promise.resolve(fetch_.getDado('/canal'))
                        .then((args)=> {
                              this.requested = true;
                              this.canais_requested = args.data
                              this.canais_requested.forEach((item: any)=> {
                                    if (item.alias == value.data.canalAlias) {
                                          this.canal_inicial = item;
                                    }
                              });
                        }).catch((error_retorno)=> this.showError(error_retorno))
                  }).catch((error_retorno)=> this.showError(error_retorno));
            }
      },
      watch: {
            canal_inicial(value){
                  if(value){
                        this.ambiente.canalAlias = value.alias;
                  }
            },
            status_aux(value){
                  if (value) {
                        this.ambiente.status = 'ATIVO'
                  }else{
                        this.ambiente.status = 'INATIVO'
                  }
            }
      },
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :lateral="'ambiente'"
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
                                    <v-form @submit.prevent="editRequest" novalidate>
                                          <v-row no-gutters>
                                                <!-- Canal -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            label="*Canal:"
                                                            v-model="canal_inicial"
                                                            :items="canais_requested"
                                                            :item-props="canalToString"
                                                            :loaded="requested"
                                                            :erros-text="errors.findIndex((x) => x =='canalAlias') != -1 ? 'Selecione um canal valido' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- ULR -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*URL:"
                                                            v-model="ambiente.url"
                                                            :erros-text="errors.findIndex((x) => x =='url') != -1 ? 'Digite uma ULR' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Versão -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*Versão:"
                                                            v-model="ambiente.versao"
                                                            :erros-text="errors.findIndex((x) => x =='versao') != -1 ? 'Digite uma versão' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Ambiente -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            label="*Ambiente:"
                                                            v-model="ambiente.ambiente"
                                                            :items="ambientes"
                                                            item-title="name"
                                                            item-value="value"
                                                            :erros-text="errors.findIndex((x) => x =='ambiente') != -1 ? 'Selecione um ambiente' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Status -->
                                                <v-col class="v-col-12">
                                                      <v-switch 
                                                            label="*Status"
                                                            color="info"
                                                            v-model="status_aux"
                                                      />
                                                </v-col>
                                                <!-- Ação -->
                                                <v-col class="v-col-12">
                                                      <v-row no-gutters>
                                                            <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || editado) ? 'd-flex' : 'd-none']">
                                                                  <ErroFormComponent
                                                                        :mensagem="'Edite antes de salvar'"
                                                                        :class="['desativada py-3',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                                  />
                                                                  <TimeMensageFormReturnComponent v-if="editado"
                                                                        :mensagem="'Empresa alterado com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="editado = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <EdiçãoBotaoComponent
                                                                        :icone="'mdi mdi-square-edit-outline'"
                                                                        :is_disabled="edit_ambiente_request || editado"
                                                                        @editar="editRequest"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <VoltarBotaoComponent
                                                                        :icone="'mdi mdi-arrow-left'"
                                                                        @voltar="voltarAmbiente"
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