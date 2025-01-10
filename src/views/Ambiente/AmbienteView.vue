<script lang="ts">
import AmbienteComponent from '@/components/conteudos/AmbienteComponent.vue';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import CriarBotaoComponent from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';
import ErroResponseComponent from '@/components/mensagem/ErroResponseComponent.vue';


export default defineComponent({
      data() {
            return{
                  fetch_error_msg : {},
                  have_fetch_error : false,
            }
      },
      components:{
            NavbarComplet,
            AmbienteComponent,
            VersaoMaximisada,
            CriarBotaoComponent,
            ErroResponseComponent
      },
      methods:{
            adicionarNewambiente(){
                  router.push('/ambientes/0');
            },
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
                  :lateral="'ambiente'"
                  :have_erro="have_fetch_error"
            />
            <div class="col-12 col-lg-10" id="content" style="padding-left: calc(var(--bs-gutter-x));">
                  <span v-if="!have_fetch_error">
                        <CriarBotaoComponent @criar="adicionarNewambiente"/>
                        <AmbienteComponent 
                        @erro_fetch="(args: object)=> showError(args)"/>
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