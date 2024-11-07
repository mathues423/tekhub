<script lang="ts">
import router from '@/router';
import ListaComponent from '../lista/ListaComponent.vue';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
      data(){
            return {
                  
                  ITEM_PAGINA_MAX: 20,
                  PAGINA_MAX: 1,
                  tradutor:{
                        header:[
                              {'title':'Código', 'ordem': 'acn', 'on':true},
                              {'title':'Código Tek', 'ordem': 'acn', 'on':false},
                              {'title':'Razão social', 'ordem': 'acn', 'on':false},
                              {'title':'CNPJ', 'ordem': 'acn', 'on':false},
                              {'title':'Verção API', 'ordem': 'acn', 'on':false},
                              {'title':'Ações', 'ordem': 'acn', 'on':false}],
                        header_to_dados:['codigo', 'codigoTek', 'descricao', 'cnpj', 'versaoApiTek', 'buttons']
                  },
                  dado_lista_empresa: store.getters.getEmpresas as Array<object>,
                  dado_lista_paginado: store.getters.getEmpresas as Array<object>,
                  pagina_atual:1
            }
      },
      mounted() {
            console.log('Empresas: ', this.dado_lista_empresa)
            if (Object.keys(this.dado_lista_empresa).length) {
                  this.PAGINA_MAX = Math.ceil(Object.keys(this.dado_lista_empresa).length / this.ITEM_PAGINA_MAX);
            }
            this.dado_lista_paginado = this.dado_lista_empresa.filter(
                  (value, index) => {
                        if(this.ITEM_PAGINA_MAX *(this.pagina_atual - 1) <= index &&
                        index <  this.ITEM_PAGINA_MAX *this.pagina_atual){
                              return value
                              }
                  })
      },
      components:{
            ListaComponent,
      },
      methods:{
            newEmpresa(){
                  router.push('/empresas/0');
            },
            retroceder(){
                  this.pagina_atual--;
                  if (this.pagina_atual <= 0) {
                        this.pagina_atual++;
                  }
                  this.dado_lista_paginado = this.dado_lista_empresa.filter(
                  (value, index) => {
                        if(this.ITEM_PAGINA_MAX *(this.pagina_atual - 1) <= index &&
                        index <  this.ITEM_PAGINA_MAX *this.pagina_atual){
                              return value
                              }
                  })
            },
            avancar(){
                  this.pagina_atual++;
                  if (this.pagina_atual > this.PAGINA_MAX) {
                        this.pagina_atual--;
                  }
                  this.dado_lista_paginado = this.dado_lista_empresa.filter(
                  (value, index) => {
                        if(this.ITEM_PAGINA_MAX *(this.pagina_atual - 1) <= index &&
                        index <  this.ITEM_PAGINA_MAX *this.pagina_atual){
                              return value
                              }
                  })
            }
      },
})
</script>
<!-- Falta colocar tratamento de erro -->
<template>
      <div class="row">
            <div class="col-12 botao">
                  <button class="btn" 
                  @click="newEmpresa()"> 
                        <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                              </svg>
                        </span>
                        Adicionar
                  </button>
            </div>
            <div class="col-12">
                  <ListaComponent 
                  :nome_rota_interna="'empresas'"
                  :nome_rota_para_edicao="'empresas_edicao'"
                  :nome_rota_externa="'empresa'"
                  :tradutor="tradutor"
                  :dados="dado_lista_paginado" 
                  :item_p_pagina="ITEM_PAGINA_MAX"/>

                  <div>
                        <button @click="retroceder()"> ◄= </button> 
                        <button @click="avancar()"> =► </button>
                  </div>
            </div>
      </div>
</template>

<style scoped>
.botao{
      padding-top: 10px;
      padding-bottom: 10px;
}

.botao > button{
      background-color: var(--bs-blue);
      color: var(--bs-white);
}
.botao > button:hover{
      background-color: var(--bs-blue);
      opacity: 0.85;
      color: var(--bs-white);
}
</style>