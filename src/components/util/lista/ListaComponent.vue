<script lang="ts">
import { defineComponent } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoComponent from '../EdiçãoBotaoComponent.vue';
import RemoçãoBotaoComponent from '../RemoçãoBotaoComponent.vue';
import ModalRemoçãoComponent from '../ModalRemoçãoComponent.vue';

export default defineComponent({
      data() {
          return {
            showDeletModal: false,
            dado_modal: {
                  codigoTek: '',
                  descricao: '',
                  cnpj: -1,
                  versaoApiTek: ''
            },
          }
      },
      components:{
            PaginacaoComponent,
            EdiçãoBotaoComponent,
            RemoçãoBotaoComponent,
            ModalRemoçãoComponent
      },
      props:{
            pagina_max:{
                  type:Number,
                  required:true
            },
            pagina:{
                  type:Number,
                  required:true
            },
            dados:{
                  type: Object,
                  required: true
            },
            rota_edicao:{
                  type: String,
                  required: true
            },
            ModalContent_Remocao:{
                  type: Array,
                  required: true
            },
            
      },
      methods:{
            up_lista(){
                  this.$emit('avancar');
            },
            down_lista(){
                  this.$emit('recuar');
            },
            mountDeletModal(arg: {codigoTek: string, descricao: string, cnpj: number, versaoApiTek: string}){
                  this.dado_modal = arg;
                  this.showDeletModal = true;
            },
            deletarDado(){
                  this.$emit('deletarDadoPai', this.dado_modal);
            },
            ordenarDado(dadosObj : object){
                  this.$emit('ordenarDadoPai', dadosObj);
            },
            filtrarDado(header: object){
                  this.$emit('filtrarDadoPai', header)
            }
      },
      emits: ['avancar', 'recuar', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai']
})
</script>

<template>
      <ModalRemoçãoComponent :isAtivo="showDeletModal" @close="showDeletModal = false" @deletar_item="deletarDado">
            <template v-slot:body> 
                  <div class="aviso">Atenção essa ação não poderá ser desfeita.</div>
                  <div style="padding-top: 5px;">Informações do item</div>
                  <div style="padding-top: 5px;" v-for="(value, index) in ModalContent_Remocao" :key="index">
                        {{ value['nome' as keyof typeof value] }}: {{ dado_modal[value['key' as keyof typeof value] as keyof typeof dado_modal] }}
                  </div>
            </template>
      </ModalRemoçãoComponent>
      <div class="row">
      <div class="col-12">
      <table class="table table-hover table-bordered">
            <thead class="table-primary">
                  <tr>
                        <th v-for="title in dados?.header" :key="title.header" scope="col">
                              <div class="row">
                                    <div :class="[`${title.isfiltrable === true  ? 'col-9' : 'col-12'}`,`${title.ordem?.on === true  ? 'col-ativo' : ''}`]">
                                          <button v-if="title.isordenable" class="btn btn-tabela" @click="ordenarDado(title)">
                                                {{ title.header }}
                                                <span v-if="title.ordem.tipo_obj == 'Number' && title.ordem.on">
                                                      <!-- Crescente -->
                                                      <span v-if="title.ordem.tipo_ordenacao == 'Asc'"> 
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 20 20">
                                                                  <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                                                                  <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.204-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                                                                  <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                                                            </svg> 
                                                      </span>
                                                      <!-- Decrescente -->
                                                      <span v-else> 
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
                                                                  <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                                                                  <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                                                            </svg>
                                                      </span>
                                                </span>
                                                <span v-if="title.ordem.tipo_obj == 'String' && title.ordem.on">
                                                      <!-- Crescente -->
                                                      <span v-if="title.ordem.tipo_ordenacao == 'Asc'"> 
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 20 20">
                                                                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                                                                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                                                            </svg>
                                                      </span>
                                                      <!-- Decrescente -->
                                                      <span v-else>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 20 20">
                                                                  <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z"/>
                                                                  <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z"/>
                                                                  <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                                                            </svg>
                                                      </span>
                                                </span>
                                          </button>
                                          <button v-else class="btn btn-tabela">
                                                {{ title.header }}
                                          </button>
                                    </div>
                                    <div v-if="title.isfiltrable" :class="['col-3', `${title.ordem?.on === true  ? 'col-ativo' : ''}`]">
                                          <button  class="btn btn-tabela-filtro" @click="filtrarDado(title)">
                                                <!-- Lupa -->
                                                <span v-if="title.filtro.tipo_filtro == 'all'"> 
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                      </svg>
                                                </span>
                                                <!-- Filtro -->
                                                <span v-if="title.filtro.tipo_filtro == 'pre'">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                                      </svg>
                                                </span>
                                          </button>
                                    </div>
                              </div>
                        </th>
                  </tr>
            </thead>
            <tbody>
                  <tr v-for="(dado,index_dado) in dados?.body" :key="index_dado">
                        <th v-for="(traduzido, index_traduzido) in dados?.header" :key="traduzido" :class="`${index_traduzido === 0  ? 'important' : 'not_important'}`">
                              <span v-if="traduzido.key_body != 'button' && traduzido.key_body != 'vazio'">
                                    {{ dado[traduzido.key_body as keyof typeof dado] }}
                              </span>
                              <span v-else-if="traduzido.key_body == 'button'">
                                    <div style="text-align: center;">
                                    <EdiçãoBotaoComponent
                                    :nome_rota_para_edicao="rota_edicao"
                                    :id_item="dado['codigo' as keyof typeof dado]"
                                    />
                                    <RemoçãoBotaoComponent
                                    :dado="dado"
                                    @deletarModal="(arg: any) => mountDeletModal(arg)"
                                    />
                                    </div>
                              </span>
                              <span v-else-if="traduzido.key_body == 'vazio'">
                                    <!-- Vazio -->
                              </span>
                              <span v-else>
                                    404
                              </span>
                        </th>
                  </tr>
            </tbody>
      </table>
      </div>
      <PaginacaoComponent calss="col-12"
            :pagina_atual="pagina"
            :pagina_max="pagina_max"
            @avancar="up_lista"
            @recuar="down_lista"
      />
      </div>

</template>

<style lang="css" scoped>
.aviso{
      background-color: #eec1c5;
}
.important{
      color: var(--bs-dark);
}
.not_important{
      color: var(--bs-gray-800);
}
.btn-tabela{
      font-size: 16px;
      border: none;
      width: 100%;
      color: var(--bs-dark);
}
.btn-tabela-filtro{
      width: 100%;
      color: var(--bs-dark);
      border-style: solid;
      border-radius: 0;
      border-color: var(--bs-dark);
}
.col-ativo{
      background-color: #abc4eb;
}
th .row{
      --bs-gutter-x: 0;
      margin: 0;
}
th{
      padding: 0;
}
</style>