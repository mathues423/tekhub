<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';

export default defineComponent({
      template: '#Nav_latV',
      data(){
            return{
                  integracaoIsactive : false,
                  subGroup : ref([]),
                  h_min_list: 0
            }
      },
      methods:{
            changePage(rota: string){
                  if(!this.have_fetch_erro)
                        router.push('/'+rota);
            },
      },
      props:{
            item_ativo:{
                  type: String,
                  required: true
            },
            have_fetch_erro:{
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
<template id="Nav_lat">
      <v-col class="col-12 ma-0 pa-0" background-color="primary">
            <v-sheet color="primary" min-height="100%">
                  <v-list v-model:opened="subGroup" density="compact" nav bg-color="primary" base-color="secondary" :disabled="have_fetch_erro">
                        <!-- Dashboard -->
                        <v-list-item v-show="user_type == 'ROLE_USER' || user_type == 'ROLE_SUP' || user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'dashboard'"
                              prepend-icon="mdi mdi-speedometer"
                              title="Dashboard"
                              @click="changePage('dashboard')"
                        />
                        <!-- Empresas -->
                        <v-list-item v-show="user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'empresas'"
                              prepend-icon="mdi mdi-store"
                              title="Empresas"
                              @click="changePage('empresas')"
                        />
                        <!-- Canais -->
                        <v-list-item v-show="user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'canais'"
                              prepend-icon="mdi mdi-view-grid-outline"
                              title="Canais"
                              @click="changePage('canais')"
                        />
                        <!-- Ambientes -->
                        <v-list-item v-show="user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'ambiente'"
                              prepend-icon="mdi mdi-cloud"
                              title="Ambientes"
                              @click="changePage('ambientes')"
                        />
                        <!-- integracao -->
                        <v-list-group value="integracao" v-show="user_type == 'ROLE_USER' || user_type == 'ROLE_ADMIN'">
                              <template v-slot:activator="{ props }">
                                    <v-list-item 
                                          v-bind="props"
                                          prepend-icon="mdi mdi-cached"
                                          title="Integração"
                                    />
                              </template>

                              <v-list-item v-show="user_type == 'ROLE_ADMIN'"
                                    class="pl-4"
                                    :active="item_ativo === 'mark_ecom'"
                                    prepend-icon="mdi mdi-database-outline"
                                    title="Marketplace/Ecommerce"
                                    @click="changePage('integracoesmarketplacesecommerces')"
                              />
                                    
                              <v-list-item 
                                    class="pl-4"
                                    :active="item_ativo === 'map_pro'"
                                    prepend-icon="mdi mdi-swap-horizontal"
                                    title="Mapeamento de Produtos"
                                    @click="changePage('mapeamentoprodutos')"
                              />
                              <v-divider class="my-2" />
                        </v-list-group>
                        <!-- Usuários -->
                        <v-list-item v-show="user_type == 'ROLE_ADMIN'"
                              :active="item_ativo === 'usuario'"
                              prepend-icon="mdi mdi-account-circle"
                              title="Usuario"
                              @click="changePage('usuarios')"
                        />
                        <!-- Log-ATT -->
                        <v-list-item v-show="user_type == 'ROLE_SUP' || user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'log_att'"
                              prepend-icon="mdi mdi-calendar-clock"
                              title="Logs das Atualizações"
                              @click="changePage('atualizacoesecommerces')"
                        />
                        <!-- Log-REQ -->
                        <v-list-item v-show="user_type == 'ROLE_ADMIN'"      
                              :active="item_ativo === 'log_req'"
                              prepend-icon="mdi mdi-list-box-outline"
                              title="Logs das Requisições"
                              @click="changePage('logrequisicoes')"
                        />
                  </v-list>
            </v-sheet>
      </v-col>
</template>