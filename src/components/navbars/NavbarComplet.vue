<script lang="ts">
      import NavbarItem from "./NavbarItem.vue";
      import router from '@/router';
      const dashboard = {icon : '', abrev: 'Dashboard', rota: '/dashboard', activi: false};
      const empresas = {icon : '', abrev: 'Empresas', rota: '/empresas', activi: false};
      const canais = {icon : '', abrev: 'Canais', rota: '/canais', activi: false};
      const ambiente = {icon : '', abrev: 'Ambiente', rota: '/ambiente', activi: false};
      const usuario = {icon : '', abrev: 'Usuário', rota: '/usuario', activi: false};
      const logatt = {icon : '', abrev: 'Logs das Atualizações', rota: '/logatt', activi: false};
      const logreq = {icon : '', abrev: 'Logs das Requisições', rota: '/logreq', activi: false};
      export default {
            data : () => ({
                  conteudo : [dashboard, empresas, canais, ambiente, usuario, logatt, logreq]
            }),

            components: {
                  NavbarItem
            },

            methods:{
                  logout(){
                        router.push('/');
                  }
            }
      }
</script>

<template>
      <div class="nav_upper col-12">
            <div class="row">
                  <div style="padding-left: 12px;" class="col-11">
                        <img src="../../assets/imagens/logo-tek-hub-branca.png" alt="logo_white" width="64">
                        <span style="font-size: 1.5em;">TekHub Integrações</span>
                  </div>
                  <div class="col-1" style="margin-top: auto; margin-bottom: auto;">
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
      <div class="nav_lateral col-2" style="height: max-content">
            <ul class="itens_nav" v-for="navitem in conteudo" v-bind:key="navitem.abrev">
                  <NavbarItem :nav_item="navitem"/>
            </ul>
      </div>
</template>

<style scoped>
.nav_upper{
      background-color: var(--bs-primary-text-emphasis);
}

.nav_lateral{
      background-color: var(--bs-primary-text-emphasis);
}

.itens_nav{
      padding-left: 24px;
}

.itens_nav{
      font-size: 14px;
      color: var(--bs-grey-100);
}
.itens_nav:focus{
      background-color: var(--bs-cyan);
      color: var(--bs-gray-700);
}
.itens_nav:active{
      background-color: var(--bs-primary-bg-subtle);
      color: var(--bs-gray-700);
}

/* Media dark?
@media (prefers-color-scheme: dark) {

} */
</style>