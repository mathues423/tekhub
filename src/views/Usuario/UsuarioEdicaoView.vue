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
                  editado:false
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
            Promise.resolve(store.dispatch('getUsuariosID', rota_id))
            .then((value) => {
                  this.usuario_old.email = this.usuario.email = value.email;
                  Promise.resolve(fetch_.getDado('/empresa/'+value.empresaCodigo))
                  .then((empresa)=> {
                        this.empresa_aux = empresa.data
                        this.in_request = false;
                  }).catch((error_retorno)=> this.showError(error_retorno))
                  this.usuario_old.empresaCodigo = value.empresaCodigo;
                  this.usuario_old.perfil = this.usuario.perfil = value.perfil;
                  this.usuario_old.senha = this.usuario.senha = value.senha;
                  this.usuario_old.token = this.usuario.token = value.token;
                  
            }).catch((error_retorno)=> this.showError(error_retorno));
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
            showPassword(){
                  if(document.querySelector('#userpass')?.getAttribute('type') == 'password'){
                        document.querySelector('#userpass')?.setAttribute('type', 'text');
                        document.querySelector('#eyeclose')?.setAttribute('display','none');
                        document.querySelector('#eyeopen')?.setAttribute('display','inline');
                  }else{
                        document.querySelector('#userpass')?.setAttribute('type', 'password');
                        document.querySelector('#eyeclose')?.setAttribute('display','inline'); 
                        document.querySelector('#eyeopen')?.setAttribute('display','none');
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
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'usuario'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content">
                  <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                        <!-- ERRO no servidor mensagem -->
                        <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                              :time_duration="5"
                              :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                              @fechar_erro="voltarErroServer"
                        />
                        <div class="row">
                              <!-- Email -->
                              <div class="col-1"></div>
                              <div class="Card-Body col-8">
                                    <form @submit.prevent="edicaoRequest" class="row form_content" novalidate>
                                          <!-- Email -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Email:
                                          </div>
                                          <div class="col-8">
                                                <input type="text" class="form-control" v-model="usuario.email">
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe o email.'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='email') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          <!-- Senha -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Senha:
                                          </div>
                                          <div class="col-8">
                                                <div class="input-group">
                                                      <input type="password" id="userpass" class="form-control" v-model="usuario.senha">
                                                      <span class="input-group-text">
                                                            <button type="button" class="btn" @click="showPassword()">
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill visible" viewBox="0 0 16 16" display="inline" id="eyeclose">
                                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                                  </svg>
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" display="none" id="eyeopen">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                                  </svg>
                                                            </button>
                                                      </span>
                                                </div>
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe a senha.'"
                                                      :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='senha') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
                                          
                                          <!-- Token -->
                                          <div class="col-4 col-lg-2 form_text">
                                                Token:
                                          </div>
                                          <div class="col-8">
                                                <input :placeholder="usuario.token" type="text" class="form-control" disabled>
                                          </div>
                                          <div class="col-lg-2"></div>
      
                                          <!-- Perfil -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Perfil:
                                          </div>
                                          <div class="col-8">
                                                <select class="custom-select w-100" v-model="usuario.perfil">
                                                      <option selected disabled :value="''"> Selecione o campo</option>
                                                      <option v-for="header in perfil" :key="header.name" :value="header.value"> {{ header.name }}</option>
                                                </select>
                                                <ErroFormComponent
                                                      :mensagem="'Por favor informe o perfil.'"
                                                      :class="['alert-danger desativada', {'ativada' : errors.findIndex((x) => x =='perfil') != -1}]"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
      
      
                                          <!-- Empresa -->
                                          <div class="col-4 col-lg-2 form_text">
                                                *Empresa:
                                          </div>
                                          <div class="col-8">
                                                <EmpresaSelectComponent 
                                                      :valor_inicial="empresa_aux"
                                                      :have_erro="errors.findIndex((x) => x =='empresa') != -1"
                                                      @empresa_escolhida="(arg)=> empresa_escolhida = arg"
                                                      @Erro_fetch="(arg)=> showError(arg)"
                                                />
                                          </div>
                                          <div class="col-lg-2"></div>
      
                                          <div style="margin-top: 16px;" class="col-12">
                                                <ErroFormComponent
                                                      :mensagem="'Edite antes de salvar'"
                                                      :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                                />
                                                <TimeMensageFormReturnComponent v-if="editado"
                                                      :mensagem="'Alterado com sucesso'"
                                                      :time_duration="5"
                                                      @fechar_mensagem="editado = false"
                                                />
                                                <button class="btn btn-primary col-4 col-lg-2" :disabled="(edit_user_reqest || in_request || editado)" @click="edicaoRequest">
                                                      <span>Editar</span>
                                                </button>
                                                <button class="btn btn-light col-4 col-lg-2" style="margin-left: 24px;" @click="voltarUsuario">
                                                      <span>Voltar</span>
                                                </button>
                                          </div>
                                    </form>
                              </div>
                              <div class="col"></div>
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
}
.Card-Body >form >div{
      padding-top: 10px;
}
.input-group-text{
      padding: 0;
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