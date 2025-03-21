<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoComponent from '../EdiçãoBotaoComponent.vue';
import RemoçãoBotaoComponent from '../RemoçãoBotaoComponent.vue';
import ModalRemoçãoComponent from '../ModalRemoçãoComponent.vue';

export default defineComponent({
      data() {
          return {
            dado_modal: {},
            dado_expandido: [false],
            dado_json: ['']
          }
      },
      components:{
            PaginacaoComponent,
            EdiçãoBotaoComponent,
            RemoçãoBotaoComponent,
            ModalRemoçãoComponent
      },
      props:{
            have_item_p_pagina:{
                  type: Boolean,
                  required: true
            },
            have_pagination:{
                  type: Boolean,
                  required:true
            },
            pagina_max:{
                  type:Number,
                  defaut: 1,
                  required:true
            },
            pagina:{
                  type:Number,
                  defaut: 1,
                  required:true
            },
            item_p_pagina:{
                  type:Number,
                  defaut: 10,
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
                  type: Array as PropType<Array<object>>,
                  required: true
            },
            lista_opc_paginas:{
                  type: Array as PropType<Array<object>>,
                  required: true
            },
            have_expancion:{
                  type: Boolean,
                  required:true
            },
            showDeletModal:{
                  type: Boolean,
                  required: true
            },
            deletando:{
                  type: Boolean,
                  required: true
            },
            disabled_btn:{
                  type: Boolean,
                  required: true
            }
      },
      mounted() {
            if (this.have_expancion) {
                  this.dado_expandido = []
                  this.dado_json = []
                  for (let index = 0; index < this.item_p_pagina; index++) {
                        this.dado_expandido.push(false)
                        // this.dado_json.push(this.custumise_json(JSON.stringify(this.dados?.body[index])))
                        this.dado_json.push(this.dados?.body[index])
                  }
            }
      },
      methods:{
            expandir(linha: number){
                  this.dado_expandido[linha] = true;
            },
            fechar(linha: number){
                  this.dado_expandido[linha] = false;
            },
            up_lista(){
                  this.$emit('avancar');
            },
            down_lista(){
                  this.$emit('recuar');
            },
            mountDeletModal(arg: {codigoTek: string, descricao: string, cnpj: number, versaoApiTek: string}){
                  this.dado_modal = arg;
                  this.$emit('abrirModal')
            },
            deletarDado(){
                  this.$emit('deletarDadoPai', this.dado_modal);
            },
            ordenarDado(dadosObj : object){
                  this.$emit('ordenarDadoPai', dadosObj);
            },
            filtrarDado(){
                  this.$emit('filtrarDadoPai')
            },
            dado_quantidade(args: number){
                  if (this.have_expancion) {
                        this.dado_expandido = []
                        for (let index = 0; index < args; index++) {
                              this.dado_expandido.push(false)
                        }
                  }
                  this.$emit('trocarQuandidadeDadoPai', args)
            }
      },
      emits: ['avancar', 'recuar', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai', 'trocarQuandidadeDadoPai', 'fecharModal', 'abrirModal']
})
</script>

<template>
      <ModalRemoçãoComponent 
            :estado_btn="disabled_btn"
            :isInDelet="deletando" 
            :isAtivo="showDeletModal" 
            @close="$emit('fecharModal')" 
            @deletar_item="deletarDado()">
            <template v-slot:body> 
                  <div class="aviso">Atenção essa ação não poderá ser desfeita.</div>
                  <div style="padding-top: 5px;">Informações do item</div>
                  <div style="padding-top: 5px;" v-for="value in ModalContent_Remocao" :key="value['key' as keyof typeof value]">
                        {{ value['nome' as keyof typeof value] }}: {{ dado_modal[value['key' as keyof typeof value] as keyof typeof dado_modal] }}
                  </div>
            </template>
      </ModalRemoçãoComponent>
      <div class="row">
            <div class="col-12 table-responsive">
                  <table class="table table-hover table-bordered">
                        <thead class="table-primary">
                              <tr>
                                    <th v-for="title in dados?.header" :key="title.header" scope="col">
                                          <div class="row">
                                                <div :class="[`${title.isfiltrable === true  ? 'col-9' : 'col-12'}`,`${title.ordem?.on === true  ? 'col-ordenada' : ''}`]">
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
                                                      <span v-else class="btn-tabela" style="--bs-btn-padding-x: 0.75rem;
                                                                                          --bs-btn-padding-y: 0.375rem;
                                                                                          --bs-btn-font-family: ;
                                                                                          --bs-btn-font-size: 1rem;
                                                                                          --bs-btn-font-weight: 400;
                                                                                          --bs-btn-line-height: 1.5;
                                                                                          display: inline-block;
                                                                                          padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);">
                                                            {{ title.header }}
                                                      </span>
                                                </div>
                                                <div v-if="title.isfiltrable" :class="['col-3', `${title.ordem?.on === true  ? 'col-ordenada' : ''}`]">
                                                      <button  class="btn btn-tabela-filtro" @click="filtrarDado">
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
                        <tbody v-if="dados?.body.length > 0">
                              <tr v-for="(dado,index_dado) in dados?.body" :key="index_dado">
                                          <td v-show="!dado_expandido[index_dado]" v-for="(traduzido, index_traduzido) in dados?.header" :key="traduzido" :class="`${index_traduzido === 0  ? 'important' : 'not_important'}`">
                                                <span v-if="traduzido.key_body != 'button' && traduzido.key_body != 'vazio'">
                                                      <button class="btn btn-light" v-if="traduzido['expandible' as keyof typeof traduzido]" @click="expandir(index_dado)">
                                                            +
                                                      </button>
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
                                                      
                                                </span>
                                                <span v-else>
                                                      404
                                                </span>
                                          </td> 
                                          <td v-show="dado_expandido[index_dado]" :colspan="dados?.header.length">
                                                <button class="btn btn-light" @click="fechar(index_dado)">
                                                      -
                                                </button>
<pre style="padding-left:30px" v-show="dado_json[index_dado] != ''">
{{ dado_json[index_dado] }}
</pre>
<pre v-show="dado_json[index_dado] == ''">
<!-- {} -->
{{ dado_json[index_dado] }}
</pre>
                                          </td>
                                    
                              </tr>
                        </tbody>
                        <tbody v-else>
                              <tr style="text-align: center;">
                                    <td :colspan="dados.header.length" style="padding: 36px 16px;">
                                          <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
                                                      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
                                                </svg>
                                          </div>
                                          <div>
                                                Não ha dados
                                          </div>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
            <PaginacaoComponent v-if="have_pagination" class="col-12"
                  :lista_opc_paginas="lista_opc_paginas"
                  :have_item_p_pagina="have_item_p_pagina"
                  :pagina_atual="pagina"
                  :pagina_max="pagina_max"
                  :item_p_pagina_old="item_p_pagina"
                  @trocar_quantidade="(args: number) => dado_quantidade(args)"
                  @avancar="up_lista"
                  @recuar="down_lista"
            />
      </div>

</template>

<style lang="css" scoped>
pre{
      background-color: #222;
      color: white;
      line-height:1.2em;
      border-left:8px solid green;
      border-radius:5px;
      /* background:linear-gradient(180deg,#ccc 0,#ccc 1.2em,#eee 0);
      background-size:2.4em 2.4em;
      background-origin:content-box; */
      padding:5px 20px;
      text-align:justify;
      font-size: 16px;
      font-family:calibri,arial,sans-serif;
}
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
      color: var(--bs-dark) !important;
}
.btn-tabela-filtro{
      width: 100%;
      color: var(--bs-dark);
      border-style: solid;
      border-radius: 0;
      border-color: var(--bs-dark);
}
.col-ordenada{
      background-color: #abc4eb;
}
th .row{
      --bs-gutter-x: 0;
      margin: 0;
}
th{
      padding: 0;
}

.parentesis{
      color: yellow;
}
.string{
      color: orangered;
}
.number{
      color:blue;
}
</style>