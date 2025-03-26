<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import AmbienteComponent from '@/components/conteudos/AmbienteComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
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
            AmbienteComponent,
            VersaoMaximisada,
            CriarBotaoComponent,
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      methods:{
            adicionarNewambiente(){
                  router.push('/ambientes/0');
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
      <v-row no-gutters>
            <NavbarComplet 
                  :lateral="'ambiente'"
                  :have_erro="have_fetch_error"
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
                        <CriarBotaoComponent class="pl-4" @criar="adicionarNewambiente"/>
                        <AmbienteComponent 
                        @erro_fetch="(args: object)=> showError(args)"/>
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