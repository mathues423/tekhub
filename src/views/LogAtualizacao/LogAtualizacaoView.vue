<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      data() {
            return {
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  teste:{},
                  auth_type: APPCONFIG.authType
            }
      },
      mounted() {
          Promise.resolve(fetch_.getDado('/atualizacaoecommerce'))
          .then((ret)=> this.teste = ret)
          .catch((error_retorno)=> this.showError(error_retorno))
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      methods:{
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            },
            voltarErroServer(){
                  this.fetch_error_msg = {};
                  this.have_fetch_error = false;
            }
      }
})
</script>

<template>
      <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'log_att'"
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
                  </span>
                  <span v-else>
                        <ErroResponseComponent
                              :error_msg="fetch_error_msg" 
                              @voltar="have_fetch_error = false"
                        />
                  </span>
            </v-col>
            <VersaoMaximisada />
      </v-row>
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