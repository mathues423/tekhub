<script lang="ts">
import { APPCONFIG } from '@/components/constants/Config';
import DashboardComponent from '@/components/conteudos/DashboardComponent.vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import TimeMensageErroComponent from '@/components/mensagem/TimeMensageErroComponent.vue';
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
            ErroResponseComponent,
            TimeMensageErroComponent
      },
      methods:{
            checkErro(retorno: object){
                  this.mensage_erro = retorno;
                  this.have_erro = true;
            },
            voltarErroServer(){            
                  this.mensage_erro = {};
                  this.have_erro = false;
            }
      }
})
</script>

<template>
<div>
      <v-row no-gutters>
            <NavbarComplet
                  :have_erro="have_erro"
                  :lateral="'dashboard'"
                  :user_type="auth_type"
            />
            <v-col class="v-col-12 v-col-md-10">
                  <v-sheet> 
                        <span v-if="!have_erro || mensage_erro['errors' as keyof typeof mensage_erro]">
                              <TimeMensageErroComponent v-if="mensage_erro['errors' as keyof typeof mensage_erro]"
                                    :time_duration="10"      
                                    :mensagem="mensage_erro['errors' as keyof typeof mensage_erro][0]"
                                    @fechar_erro="voltarErroServer"
                              />
                              <DashboardComponent 
                                    :user_type="auth_type"
                                    @Erro_fetch="(ret)=> checkErro(ret)"
                              />
                        </span>
                        <span v-if="have_erro">
                              <ErroResponseComponent
                                    :error_msg="mensage_erro"
                                    @voltar="have_erro = false"
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