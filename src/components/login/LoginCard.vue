<template>
      <v-row no-gutters class="body-login">
            <v-col class="v-col-sm-10 v-col-md-4 offset-sm-1 offset-md-4">
                  <v-sheet>
                        <v-col class="v-col-12 pb-1 Card-Header"> TekHub Integrações </v-col>
                        <v-divider class="pt-0" />
                        <v-col class="v-col-12">
                              <img src="@/assets/imagens/logo-tek-hub.png" alt="logo" width="300">
                        </v-col>
                        <v-form @submit.prevent="loginReq" class="pr-4 pl-4 pb-4">
                              <v-text-field
                                    prepend-inner-icon="mdi-email"
                                    variant="outlined"
                                    v-model="user.email"
                                    label="Email"
                                    :rules="[rule_email]"
                                    :error-messages="(erros.type == 'email' ? erros.message : undefined)"
                              focused />
                              <v-text-field
                                    prepend-inner-icon="mdi-lock"
                                    :append-inner-icon="is_show_password ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off-outline'"
                                    @click:append-inner="is_show_password = !is_show_password"
                                    variant="outlined"
                                    v-model="user.senha"
                                    label="Senha"
                                    :type="is_show_password ? 'text' : 'password'"
                                    :error-messages="erros.type == 'senha' ? erros.message : undefined"
                              />
                              <v-row align="center">
                                    <v-col class="v-col-12" v-if="erros.vericação == true">
                                          <ErroFormComponent 
                                                :mensagem="erros.message"
                                                :tipo_mesnsagem="erros.type"
                                                :class="(erros.vericação == true && erros.type == 'error' || erros.type == 'warning') ? 'ativada' : 'desativada'"
                                          />
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
            <VersaoMinimisada />
      </v-row>
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
                              type: 'warning',
                              vericação: false,
                              message: ''
                        }),
                        is_show_password: ref(false),
                        rule_email: (value : string) => {
                              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              return pattern.test(value) || 'Email inválido.'
                        },
                  }
            },
            components:{
                  VersaoMinimisada,
                  ErroFormComponent
            },
            methods:{
                  async loginReq(){
                        this.isLogin = true;
                        this.erros.vericação = false;
                        await requisicaoLogin.loginReq(this.user.email, this.user.senha, this.erros, this.lembrar)
                        .then((returno) =>{
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
                              }else if(erro.code == "ERR_NETWORK"){
                                    this.erros.message = "Não foi possível se conectar ao servidor, tente novamente mais tarde.";
                                    this.erros.type = 'warning';
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
      min-height: 100vh;
}
</style>