<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import DashboardComponent from '@/components/conteudos/DashboardComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';

export default defineComponent({
      data() {
            return{
                  have_erro: false,
                  mensage_erro: {},
                  auth_type: APPCONFIG.authType
            }
      },
      components:{
            NavbarComplet,
            DashboardComponent,
            VersaoMaximisada,
            ErroResponseComponent
      },
      methods:{
            checkErro(retorno: object){
                  this.mensage_erro = retorno
                  this.have_erro = true;
            }
      }
})
</script>

<template>
      <div class="row">
            <!-- ERRO USER LOGIN -->
            <NavbarComplet
                  :have_erro="have_erro"
                  :lateral="'dashboard'"
                  :user_type="auth_type"
            />
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  {{ auth_type }}
                  <span v-if="!have_erro">
                        <DashboardComponent 
                              :user_type="auth_type"
                              @Erro_fetch="(ret)=> checkErro(ret)"
                        />
                  </span>
                  <span v-else>
                        <ErroResponseComponent
                              :error_msg="mensage_erro"
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
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>