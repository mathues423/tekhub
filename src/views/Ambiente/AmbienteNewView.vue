<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ambiente from '@/services/regras_negocio/regras_ambientes';
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
                  ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  canal_inicial:{},
                  ambientes: [{name: 'Homologação', value: 'HOMOLOGACAO'}, {name: 'Produção', value: 'PRODUCAO'}],
                  status_aux: false,
                  requested: false,
                  canais_requested: [] as Array<object>,
                  new_ambiente_request: false,
                  errors: [] as Array<string>,
                  criando: false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent
      },
      mounted() {
            this.requested = false;
            Promise.resolve(fetch_.getDado('/canal')).then(
                  (args)=>  {
                        this.canais_requested = args.data;
                        this.requested = true;
                        this.canais_requested.forEach((item: any)=> {
                              if (item.alias == args.data.canalAlias) {
                                    this.canal_inicial = item;
                              }
                        });
                  }
            ).catch((error_retorno)=> this.showError(error_retorno))
      },
      methods:{
            canalToString(item: any){
                  return {
                        title: (item.descricao || item.tipo) ? item.descricao + ' | ' + item.tipo : undefined,
                  }
            },
            async criacaoRequest(){
                  this.new_ambiente_request = true;
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  ambiente._add(this.ambiente, this.errors)
                  if(this.errors.length == 0){
                        Promise.resolve(
                              store.dispatch('postDados', {'roter_externa': 'ambiente', 'dado': this.ambiente, 'roter_interna': 'ambientes'})
                              .then(()=> {
                                    this.criando = true;
                                    this.new_ambiente_request = false;
                              })
                        ).catch((error_retorno)=> this.showError(error_retorno));
                  }else{
                        this.new_ambiente_request = false;
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
                                    <v-form @submit.prevent="criacaoRequest" novalidate>
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
                                                      density="compact" variant="outlined" focused />
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
                                                            <v-col :class="['v-col-12 pb-3', (errors.findIndex((x) => x =='igual') != -1 || criando) ? 'd-flex' : 'd-none']">
                                                                  <TimeMensageFormReturnComponent v-if="criando"
                                                                        :mensagem="'Empresa criada com sucesso'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="criando = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="success"
                                                                        prepend-icon="mdi mdi-cloud-plus"
                                                                        text="Criar"
                                                                        @click="criacaoRequest"
                                                                        :disabled="new_ambiente_request || criando"/>
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="error"
                                                                        prepend-icon="mdi mdi-trash-can"
                                                                        text="Cancelar"
                                                                        @click="voltarAmbiente()"
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