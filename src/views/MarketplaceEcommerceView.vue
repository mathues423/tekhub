<script lang="ts">
import NavbarComplet from '../components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '../components/versionamento/VersaoMaximisada.vue';


export default{
      components:{
            NavbarComplet,
            // DashboardComponent,
            VersaoMaximisada,
      }
}
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'mark_ecom'"/>
            <div class="col-10" id="content">
                  Mark Ecom content
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