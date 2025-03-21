<template>
<div class="body-login" id='content'>
      <v-row  style="margin: 0;">
            <v-col class="v-col-sm-10 v-col-md-4 offset-sm-1 offset-md-4">
                  <v-sheet>
                        <v-col class="v-col-12 pb-1 Card-Header"> TekHub Integrações </v-col>
                        <v-divider class="pt-0" />
                        <v-col class="v-col-12">
                              <img src="@/assets/imagens/logo-tek-hub.png" alt="logo" width="300">
                        </v-col>
                        <v-form @submit.prevent="loginReq" class="pr-4 pl-4 pb-4">
                              <v-text-field
                                    v-model="user.email"
                                    label="Email" 
                                    :error-messages="erros.type == 'email' ? erros.message : undefined"
                              />
                              <v-text-field
                                    v-model="user.senha"
                                    label="Senha"
                                    type="password"
                                    :error-messages="erros.type == 'senha' ? erros.message : undefined"
                              />
                              <v-row align="center">
                                    <v-col class="v-col-12" v-if="erros.vericação == true">
                                          <ErroFormComponent 
                                                :mensagem="erros.message"
                                                :tipo_mesnsagem="'error'"
                                                :class="(erros.vericação == true && erros.type == 'error') ? 'ativada' : 'desativada'"
                                                />
                                                <!-- :class="(erros.vericação == true && erros.type == 'error') ? 'ativada' : 'desativada'" -->
                                    </v-col>
                                    <v-col class="v-col-6">
                                          <v-checkbox color="primary" label="Lembrar-me" class="" v-model="lembrar" hide-details/>
                                    </v-col>
                                    <v-col class="v-col-6">
                                          <v-btn type="submit" color="primary" class="w-100" :disabled="isLogin">
                                                Entrar
                                          </v-btn>
                                    </v-col>
                              </v-row>
                        </v-form>
                  </v-sheet>
            </v-col>
      </v-row>
</div>
<VersaoMinimisada />
</template>

<script lang="ts">
      import { defineComponent, ref } from 'vue';
      import requisicaoLogin from '@/services/login/requisicao';
      import VersaoMinimisada from '../versionamento/VersaoMinimisada.vue';
      import ErroFormComponent from '../mensagem/ErroFormComponent.vue';

      export default defineComponent({
            data() {
                  return{
                        isLogin: ref(false),
                        lembrar: ref(false),
                        user: ref({
                              email: '',
                              senha: ''
                        }),
                        erros: ref({
                              type: 'info',
                              vericação: false,
                              message: ''
                        })
                  }
            },
            components:{
                  VersaoMinimisada,
                  ErroFormComponent
            },
            methods:{
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
                  async loginReq(){
                        this.isLogin = true;
                        this.erros.vericação = false;
                        await requisicaoLogin.loginReq(this.user.email, this.user.senha, this.erros, this.lembrar)
                        .then((returno) =>{
                              console.log(returno);
                              if(this.erros.vericação)
                                    if(returno.response?.data?.errors)
                                          this.erros.message = returno.response.data.errors[0]
                                          
                              this.isLogin = false;
                        }).catch((erro)=>{
                              this.erros.vericação = true;
                              if (erro.errors) {
                                    this.erros.message = erro.errors[0];
                                    this.erros.type = 'error';
                                    this.isLogin = false;
                              }
                        });
                  }
            },
      })
</script>

<style lang="css" scoped>

.Card-Header{
      text-align: left;
      font-size:16px;
      font-weight: 500;
}

.body-login{
      background-color: var(--dark-blue);
      background-image: url("@/assets/imagens/logo-tek-hub-branca.png");
      background-size: cover;
      background-position: right;
      background-repeat: repeat-x;
      background-blend-mode: overlay;
}
</style>