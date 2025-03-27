<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';

export default defineComponent({
      template: '#Nav_latH',
      data(){
            return{
                  is_menu_open: false,
                  subGroup : ref(['']),
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
      },
      emits: ['logout']
})
</script>

<template id="Nav_lat">
      <v-navigation-drawer v-model="is_menu_open" location="start">
            <v-list v-model:opened="subGroup" density="compact" nav :activatable="true" bg-color="primary" base-color="secondary" :disabled="have_fetch_erro" min-height="100vh">
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
                              :active="item_ativo === 'mark_ecom'"
                              class="pl-4"
                              prepend-icon="mdi mdi-database-outline"
                              title="Marketplace/Ecommerce"
                              @click="changePage('integracoesmarketplacesecommerces')"
                        />
                              
                        <v-list-item 
                              :active="item_ativo === 'map_pro'"
                              class="pl-4"
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
      </v-navigation-drawer>
      <v-app-bar scroll-behavior="hide" scroll-threshold="2" color="primary">
            <template v-slot:prepend>
                  <v-app-bar-nav-icon
                        @click.stop="is_menu_open = !is_menu_open"
                  />
            </template>

            <v-app-bar-title> TekHub</v-app-bar-title>

            <template v-slot:append>
                  <v-btn @click="$emit('logout')" prepend-icon="mdi mdi-logout" color="red-darken-4" class="mr-1">
                        Sair
                  </v-btn>
            </template>
      </v-app-bar>
</template>