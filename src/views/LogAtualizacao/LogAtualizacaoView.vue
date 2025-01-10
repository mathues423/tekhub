<script lang="ts">
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      data() {
            return {
                  fetch_error_msg: {},
                  have_fetch_error: false,
                  teste:{}
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
      },
      methods:{
            showError(objeto_erro: object){
                  this.fetch_error_msg = objeto_erro;
                  this.have_fetch_error = true;
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet 
                  :have_erro="have_fetch_error"
                  :lateral="'log_att'"
            />
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <span v-if="!have_fetch_error">
                        Placeholder <br>
                        {{ teste }}
                  </span>
                  <span v-else>
                        <ErroResponseComponent
                              :error_msg="fetch_error_msg" 
                        />
                  </span>
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