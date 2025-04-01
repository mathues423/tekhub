<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';
import store from '@/store';
import usuarios from '@/services/regras_negocio/regras_usuarios';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue'
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import fetch_ from '@/services/fetch/requisicao';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import TimeMensageFormReturnComponent from '@/components/mensagem/TimeMensageFormReturnComponent.vue';

export default defineComponent({
      data(){
            return {
                  auth_type: APPCONFIG.authType,
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  empresa_escolhida:{},
                  empresa_aux:{},
                  edit_user_reqest:false,
                  in_request:false,
                  perfil: [{name: 'Usuario', value: 'ROLE_USER'}, {name: 'Suporte', value: 'ROLE_SUP'}, {name: 'Administrador', value: 'ROLE_ADMIN'}],
                  usuario:{
                        email:'',
                        empresaCodigo: -1,
                        senha:'',
                        token:'',
                        perfil: ''
                  },

                  usuario_old:{
                        email:'',
                        empresaCodigo: -1,
                        senha:'',
                        token:'',
                        perfil: ''
                  },
                  errors:[],
                  editado:false,
                  rule_email: (value : string) => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Email inválido.'
                  },
                  is_show_password: false,
            }
      },
      components:{
            NavbarComplet,
            EmpresaSelectComponent,
            VersaoMaximisada,
            ErroFormComponent,
            ErroResponseComponent,
            TimeMensageErroComponent,
            TimeMensageFormReturnComponent
      },
      watch:{
            empresa_escolhida(){
                  this.usuario.empresaCodigo = this.empresa_escolhida['codigo' as keyof typeof this.empresa_escolhida]
            }  
      },
      mounted() {
            this.in_request = true;
            const rota_id = (this.$route.params['id'] || '-1') as string;
            console.log(store.getters);
            if(store.getters.getUsuariosLength){
                  Promise.resolve(store.dispatch('getUsuariosID', rota_id))
                  .then((value) => {
                        this.usuario_old.email = this.usuario.email = value.email;
                        Promise.resolve(fetch_.getDado('/empresa/'+value.empresaCodigo))
                        .then((empresa)=> {
                              this.empresa_aux = empresa.data;
                              this.empresa_escolhida = empresa.data;
                              this.in_request = false;
                        }).catch((error_retorno)=> this.showError(error_retorno))
                        this.usuario_old.empresaCodigo = value.empresaCodigo;
                        this.usuario_old.perfil = this.usuario.perfil = value.perfil;
                        this.usuario_old.senha = this.usuario.senha = value.senha;
                        this.usuario_old.token = this.usuario.token = value.token;
                        
                  }).catch((error_retorno)=> this.showError(error_retorno));
            }else{
                  Promise.resolve(fetch_.getDado('/usuario/'+rota_id))
                  .then((value) => {
                        console.log('Ret', value);
                        this.usuario_old.email = this.usuario.email = value.data.email;
                        Promise.resolve(fetch_.getDado('/empresa/'+value.data.empresaCodigo))
                        .then((empresa)=> {
                              this.empresa_aux = empresa.data;
                              this.empresa_escolhida = empresa.data;
                              this.in_request = false;
                        }).catch((error_retorno)=> this.showError(error_retorno))
                        this.usuario_old.empresaCodigo = value.empresaCodigo;
                        this.usuario_old.perfil = this.usuario.perfil = value.data.perfil;
                        this.usuario_old.senha = this.usuario.senha = value.data.senha;
                        this.usuario_old.token = this.usuario.token = value.data.token;
                        
                  }).catch((error_retorno)=> this.showError(error_retorno));  
            }
      },
      methods:{
            voltarUsuario(){
                  router.push('/usuarios');
            },
            async edicaoRequest(){
                  this.edit_user_reqest = true;
                  const id = (this.$route.params['id'] || '-1') as string;
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  usuarios._edit(this.usuario_old, this.usuario, this.errors)
                  if(this.errors.length == 0){
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'usuario', 'id': id, 'roter_interna': 'usuarios', 'new_dado': this.usuario})
                              .then((ret)=> {
                                  this.edit_user_reqest = false;
                                  this.editado = true;
                                  this.usuario_old.email = this.usuario.email;
                                  this.usuario_old.empresaCodigo = this.usuario.empresaCodigo;
                                  this.usuario_old.perfil = this.usuario.perfil;
                                  this.usuario_old.senha = this.usuario.senha;
                                  this.usuario_old.token = this.usuario.token;
                                  delete this.usuario['codigo' as keyof typeof this.usuario];
                              })
                        ).catch((error_retorno)=> this.showError(error_retorno));
                  }else{
                        this.edit_user_reqest = false;
                  }
                  
            },
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErro(){
                  this.have_fetch_error = false;
                  this.edit_user_reqest = false;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.voltarErro();
            }
      }
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'usuario'"
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
                                    <v-form @submit.prevent="edicaoRequest" novalidate>
                                          <v-row no-gutters>
                                                <!-- Email -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="*Email"
                                                            v-model="usuario.email"
                                                            :rules="[rule_email]"
                                                            :error-messages="errors.findIndex((x) => x =='email') != -1 ? 'Informe um email.' : undefined"
                                                      density="compact" variant="outlined" required/>
                                                </v-col>
                                                <!-- Senha -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            :append-inner-icon="is_show_password ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off-outline'"
                                                            @click:append-inner="is_show_password = !is_show_password"
                                                            v-model="usuario.senha"
                                                            label="*Senha"
                                                            :type="is_show_password ? 'text' : 'password'"
                                                            :error-messages="errors.findIndex((x) => x =='senha') != -1 ? 'Informe uma senha.' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Token -->
                                                <v-col class="v-col-12">
                                                      <v-text-field
                                                            label="Token"
                                                            v-model="usuario.token"
                                                      density="compact" variant="outlined" disabled/>
                                                </v-col>
                                                <!-- Perfil -->
                                                <v-col class="v-col-12">
                                                      <v-select
                                                            label="*Perfil"
                                                            v-model="usuario.perfil"
                                                            item-title="name"
                                                            item-value="value"
                                                            :items="perfil"
                                                            :loading="in_request"
                                                            :error-messages="errors.findIndex((x) => x =='perfil') != -1 ? 'Informe um perfil.' : undefined"
                                                      density="compact" variant="outlined"/>
                                                </v-col>
                                                <!-- Empresa -->
                                                <v-col class="v-col-12">
                                                      <EmpresaSelectComponent
                                                            :valor_inicial="empresa_aux"
                                                            :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                            @empresa_escolhida="(arg)=> empresa_escolhida = arg"
                                                            @Erro_fetch="(arg)=> showError(arg)"
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
                                                                        :mensagem="'Usuario editado com sucesso.'"
                                                                        :time_duration="5"
                                                                        @fechar_mensagem="editado = false"
                                                                  />
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="success"
                                                                        prepend-icon="mdi mdi-square-edit-outline"
                                                                        text="Editar"
                                                                        @click="edicaoRequest"
                                                                        :disabled="edit_user_reqest || editado"/>
                                                            </v-col>
                                                            <v-col class="v-col-6 py-3" align-self="center">
                                                                  <v-btn
                                                                        color="error"
                                                                        prepend-icon="mdi mdi-trash-can"
                                                                        text="Cancelar"
                                                                        @click="voltarUsuario()"
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