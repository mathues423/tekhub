<script lang="ts">
import DashboardComponent from '@/components/conteudos/DashboardComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';


export default{
      components:{
            NavbarComplet,
            DashboardComponent,
            VersaoMaximisada,
      }
}
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'dashboard'"/>
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <DashboardComponent />
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