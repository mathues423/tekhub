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
                  largura: window.innerWidth
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
                  if (this.largura <= 960) { //col-lg
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
      <div class="nav_upper col-12" v-if="!its_card">
            <div class="row navbar">
                  <div style="padding-left: 12px;" class="col-9 col-md-11">
                        <img src="../../../assets/imagens/logo-tek-hub-branca.png" alt="logo_white" width="64">
                        <span style="font-size: 1.5em; color: var(--bs-white);">TekHub Integrações</span>
                  </div>
                  <div class="col-3 col-md-1" style="margin-top: auto; margin-bottom: auto; text-align: end;">
                        <button type="button" class="btn btn-outline-danger" style="margin-top: auto; margin-bottom: auto;" @click="logout()">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                                    <path d="M7.5 1v7h1V1z"></path>
                                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
                              </svg>
                              Sair
                        </button>
                  </div>
            </div>
      </div>
      
      <div class="nav_lateral col-lg-2" v-if="!its_card">
            <NavbarRotasVertical
                  :have_fetch_erro="have_erro"
                  :item_ativo="lateral"
                  :user_type="user_type"
            />
      </div>

      <span class="nav_lateral col-12" v-if="its_card">
            <div class="row navbar">
                  <div style="padding-left: 12px;" class="col-9 col-md-11">
                        <NavbarRotasHorizontal 
                              :have_fetch_erro="have_erro"
                              :item_ativo="lateral"
                              :user_type="user_type"
                        />
                  </div>
                  <div class="col-3 col-md-1" style="margin-top: auto; margin-bottom: auto; text-align: end;">
                        <button type="button" class="btn btn-outline-danger" style="margin-top: auto; margin-bottom: auto;" @click="logout()">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                                    <path d="M7.5 1v7h1V1z"></path>
                                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
                              </svg>
                              Sair
                        </button>
                  </div>
            </div>
      </span>
</template>

<style scoped>
.nav_upper{
      background-color: var(--bs-primary-text-emphasis);
      max-height: 78px;
}

.nav_lateral{
      background-color: var(--bs-primary-text-emphasis);
      padding: 0;
}

.itens_nav{
      padding-left: 0;
      margin-bottom: 0;
}

.itens_nav:active{
      background-color: var(--bs-cyan);
      color: var(--bs-gray-200);
}

.itens_nav_act{
      background-color: var(--bs-cyan);
      color: var(--bs-gray-200);
}
/* Media dark?
@media (prefers-color-scheme: dark) {

} */
</style>