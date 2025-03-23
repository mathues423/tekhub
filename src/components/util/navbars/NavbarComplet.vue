<script lang="ts">
import { defineComponent } from 'vue';
import NavbarRotasVertical from './NavbarRotasVertical.vue';
import router from '@/router';
import loginRequisicao from "@/services/login/requisicao"
import NavbarRotasHorizontal from './NavbarRotasHorizontal.vue';

export default defineComponent({
      data() {
            return{
                  its_card: false,
                  largura: window.innerWidth,
                  tamanho: window.innerHeight
            }
      },
      components:{
            NavbarRotasVertical,
            NavbarRotasHorizontal
      },
      mounted() {
            this.onResize()
            this.$nextTick(()=> window.addEventListener('resize', this.onResize))
      },
      methods:{
            onResize(){
                  this.largura = window.innerWidth
                  if (this.largura <= 960) {
                        this.its_card = true;
                  }else{
                        this.its_card = false;
                  }
            },
            logout(){
                  loginRequisicao.logOut();
                  router.push('/');
            }
      },
      props:{
            lateral:{
                  type: String,
                  required: true
            },
            have_erro:{
                  type: Boolean,
                  required: true,
                  default: false
            },
            user_type:{
                  type: String,
                  required: true
            }
      }
})
</script>

<template>
      <!-- Navbar para telas maiores -->
      <v-col class='v-col-12' v-if="!its_card">
            <v-sheet color="primary" max-height="64px">
                  <v-row align="center" class="v-row-12" no-gutters>
                        <v-col style="font-size: 1.5em;">
                              <v-row align="center">
                                    <v-col class="v-col-1">
                                          <img src="../../../assets/imagens/logo-tek-hub-branca.png" alt="logo_white" width="64">
                                    </v-col>
                                    <v-col class="ml-5 ml-lg-3 ml-xl-1">
                                          TekHub Integrações
                                    </v-col>
                              </v-row>     
                        </v-col>
                        <v-col style="text-align: end;">
                              <v-btn 
                                    @click="logout" 
                                    prepend-icon="mdi mdi-logout" 
                                    color="red-darken-4" 
                                    class="mr-1" 
                                    text="Sair"
                              />
                        </v-col>
                  </v-row>
            </v-sheet>
      </v-col>
      <v-col class="v-col-3 v-col-md-2" v-if="!its_card">
            <v-row no-gutters class="h-100">
                  <v-sheet min-height="calc(100vh - 64px - 38px)" color="primary" class="v-col-12">
                        <NavbarRotasVertical
                              :have_fetch_erro="have_erro"
                              :item_ativo="lateral"
                              :user_type="user_type"
                        />
                  </v-sheet>
            </v-row>
      </v-col>
      <!-- Navbar para telas menores -->
      <v-col class="v-col-12" v-if="its_card">
            <v-sheet color="primary">
                  <v-row align="center" no-gutters>
                        <v-col class="v-col-12">
                              <NavbarRotasHorizontal 
                                    :have_fetch_erro="have_erro"
                                    :item_ativo="lateral"
                                    :user_type="user_type"
                                    @logout="logout"
                              />
                        </v-col>
                  </v-row>
            </v-sheet>
      </v-col>
</template>