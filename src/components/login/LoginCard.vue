<template>
<div class="row">
      <div class="Card col-lg-4 col-10 border rounded">
            <div class="Card-Header border-bottom">TekHub Integrações</div>
            <div>
                  <img src="@/assets/imagens/logo-tek-hub.png" alt="logo" width="300">
            </div>
            <div class="Card-Body">
                  <form @submit.prevent="loginReq">
                        <div class="col-12">
                              <div class="input-group">
                                    <span class="input-group-text">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                          </svg>
                                    </span>
                                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="user.email">
                              </div>
                        </div>
                        <div class="input-group" style="margin-top: 16px;">
                              <span class="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                                    </svg>
                              </span>
                              <input type="password" class="form-control"  id="userpass" placeholder="senha" v-model="user.senha">
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
                              :mensagem="erros.message"
                              :class="['my-2 alert-danger desativada',{'ativada' : erros.vericação == true}]"
                        />
                        <button style="margin-top: 16px; margin-bottom: 16px;" class="btn btn-primary col-12" :disabled="isLogin">
                              <span>
                                    <span v-if="isLogin">
                                          <!-- SVG OCUPANDO MUITO ESPAÇO -->
                                          <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                                <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                                                      <stop offset="0" stop-color="#FFFFFF"></stop>
                                                      <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
                                                      <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
                                                      <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
                                                      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
                                                </radialGradient>
                                                <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="11" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
                                                      <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                                                </circle>
                                                <circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
                                          </svg> -->
                                    </span>
                                    Entrar
                              </span>
                        </button>
                  </form>
            </div>
      </div>
      <div class="row">
            <VersaoMinimisada />
      </div>
</div>
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
                        user: ref({
                              email: '',
                              senha: ''
                        }),
                        erros: ref({
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
                        await requisicaoLogin.loginReq(this.user.email, this.user.senha, this.erros)
                        .then((returno) =>{
                              if(this.erros.vericação)
                                    if(returno.response?.data?.errors)
                                          this.erros.message = returno.response.data.errors[0]
                                          
                              this.isLogin = false;
                        }).catch((erro)=>{
                              this.erros.vericação = true;
                              if (erro.errors) {
                                    this.erros.message = erro.errors;
                                    this.isLogin = false;
                              }
                        });
                  }
            },
      })
</script>

<style lang="css" scoped>
.Card{
      background-color: var(--bs-white);
      color: var(--bs-black);
      margin-left: auto;
      margin-right: auto;
}
.Card-Header{
      text-align: left;
      padding: 16px 0;
      font-size:16px;
      font-weight: 500;
      border-bottom: 1px;
      border-color: var(--bs-grey);
}

.Card-Body{
      padding: 0px;
}
</style>