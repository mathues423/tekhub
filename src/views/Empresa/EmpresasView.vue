<script lang="ts">

import EmpresaComponent from "@/components/conteudos/EmpresaComponent.vue";
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import CriarBotao from '@/components/util/CriarBotaoComponent.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
      data(){
            return{
                  dados_lista_empresa: store.getters.getEmpresas
            }
      },
      components:{
            NavbarComplet,
            CriarBotao,
            EmpresaComponent,
            VersaoMaximisada,
      },
      methods:{
            adicionarNewempresa(){
                  router.push('/empresas/0');
            },
            ordenaDados(obj: {key_body: string, ordem : {tipo_ordenacao: boolean, tipo_obj: string}}){
                  store.commit('ordenarDadosInterno',{
                        'ordem': obj.ordem.tipo_ordenacao,
                        'rota_interna': 'empresas',
                        'nome_dado': obj.key_body,
                        'tipo': obj.ordem.tipo_obj})
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'empresas'"/>
            <div class="col-10" id="content">
                  <CriarBotao @criar="adicionarNewempresa" />
                  <EmpresaComponent 
                  :dados_lista="dados_lista_empresa"
                  @ordenaEmpresaView="(arg) => ordenaDados(arg)"
                  />
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