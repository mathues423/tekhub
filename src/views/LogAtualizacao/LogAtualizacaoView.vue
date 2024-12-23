<script lang="ts">
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      data() {
          return {
                  teste:{}
          }
      },
      mounted() {
          Promise.resolve(fetch_.getDado('/atualizacaoecommerce'))
          .then((ret)=> this.teste = ret)
      },
      components:{
            NavbarComplet,
            // DashboardComponent,
            VersaoMaximisada,
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'log_att'"/>
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  Placeholder <br>
                  {{ teste }}
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