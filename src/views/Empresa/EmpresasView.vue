<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import EmpresaComponent from "@/components/conteudos/EmpresaComponent.vue";
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotao from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';
import ErroResponseComponent from "@/components/mensagem/ErroResponseComponent.vue";
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';

export default defineComponent({
      data() {
            return{
                  fetch_error_msg : {},
                  have_fetch_error : false,
                  auth_type: APPCONFIG.authType
            }
      },
      components:{
            NavbarComplet,
            CriarBotao,
            EmpresaComponent,
            VersaoMaximisada,
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      methods:{
            adicionarNewempresa(){
                  router.push('/empresas/0');
            },
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
<div>
      <v-row no-gutters>
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'empresas'"
                  :user_type="auth_type"
            />
            <v-col class="v-col-12 v-col-md-10 pl-2 pt-2" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <v-sheet> 
                        <span v-if="!have_fetch_error || fetch_error_msg['errors' as keyof typeof fetch_error_msg]">
                              <!-- ERRO no servidor mensagem -->
                              <TimeMensageErroComponent v-if="fetch_error_msg['errors' as keyof typeof fetch_error_msg]"
                                    :time_duration="10"
                                    :mensagem="fetch_error_msg['errors' as keyof typeof fetch_error_msg][0]"
                                    @fechar_erro="voltarErroServer"
                              />
                              <CriarBotao @criar="adicionarNewempresa" />
                              <EmpresaComponent 
                                    @Erro_fetch="(ret)=> showError(ret)"
                              />
                        </span>
                        <span v-else>
                              <ErroResponseComponent 
                                    :error_msg="fetch_error_msg"
                                    @voltar="have_fetch_error = false"
                              />
                        </span>
                  </v-sheet>
            </v-col>
            <v-row no-gutters>
                  <VersaoMaximisada />
            </v-row>
      </v-row>
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