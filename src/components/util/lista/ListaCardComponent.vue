<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoComponent from '../EdiçãoBotaoComponent.vue';
import RemoçãoBotaoComponent from '../RemoçãoBotaoComponent.vue';
import ModalRemoçãoComponent from '../ModalRemoçãoComponent.vue';
import FiltroPaiComponent from '../busca/FiltroPaiComponent.vue';

export default defineComponent({
      data() {
          return {
            dado_modal: {
            },
            dado_expandido: [false],
            dado_json: [''],
            animation:false,
            its_OnFilter:false,
            its_OnOrder:false,
            have_filtravel:false,
            have_ordenavel:false
          }
      },
      components:{
            PaginacaoComponent,
            FiltroPaiComponent,
            EdiçãoBotaoComponent,
            RemoçãoBotaoComponent,
            ModalRemoçãoComponent
      },
      mounted() {
            if (this.getDadosOrdenaveis.length != 0) {
                  this.have_ordenavel = true;
            }
            if (this.getDadosFiltraveis.length != 0) {
                  this.have_filtravel = true;
            }
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
      computed:{
            getDadosFiltraveis: function(): Array<object>{
                  return this.dados.header.filter( (value : {isfiltrable: boolean}) => {
                        return value.isfiltrable
                  })
            },
            getDadosOrdenaveis: function(): Array<object>{
                  return this.dados.header.filter( (value : {isordenable: boolean}) => {
                        return value.isordenable
                  })
            },
      },
      props:{
            have_item_p_pagina:{
                  type: Boolean
            },
            have_pagination:{
                  type: Boolean,
                  default: false
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
                  required:true,
                  default: false
            },
            header_info:{
                  type: Object,
                  required: true
            },
            showDeletModal:{
                  type: Boolean,
                  required: true
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
            filtrarDado(request: string){
                  this.$emit('filtrarDadoPai', request)
            },
            dado_quantidade(args: number){
                  this.$emit('trocarQuandidadeDadoPai', args)
            },

            Filtro(){
                  if(this.its_OnFilter){
                        this.animation = true;
                  }else{
                        this.animation = false;
                  }
                  this.its_OnFilter = !this.its_OnFilter;
                  this.its_OnOrder = false;
            },
            Ordem(){
                  if(this.its_OnOrder){
                        this.animation = true;
                  }else{
                        this.animation = false;
                  }
                  this.its_OnOrder = !this.its_OnOrder;
                  this.its_OnFilter = false;
            }
      },
      emits: ['avancar', 'recuar', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai', 'trocarQuandidadeDadoPai', 
      'fecharModal', 'abrirModal']
})
</script>

<template>
      <ModalRemoçãoComponent :isAtivo="showDeletModal" @close="$emit('fecharModal')" @deletar_item="deletarDado">
            <template v-slot:body> 
                  <div class="aviso">Atenção essa ação não poderá ser desfeita.</div>
                  <div style="padding-top: 5px;">Informações do item</div>
                  <div style="padding-top: 5px;" v-for="value in ModalContent_Remocao" :key="value['key' as keyof typeof value]">
                        {{ value['nome' as keyof typeof value] }}: {{ dado_modal[value['key' as keyof typeof value] as keyof typeof dado_modal] }}
                  </div>
            </template>
      </ModalRemoçãoComponent>
      <div class="row">
            <div class="col-12">
                  <div class="row">
                        <div :class="['col-12', (its_OnFilter || its_OnOrder) ? 'pesquisa_bg' : 'close_pesquisa_bg', animation ? 'on' : '']" style="margin-left: calc(.5* var(--bs-gutter-x));">
                              <button class="my-2 btn btn-info" @click="Filtro" :disabled="!have_filtravel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                    </svg>
                                    Filtrar
                              </button>
                              <button class="my-2 btn btn-info" @click="Ordem" :disabled="!have_ordenavel" style="margin-left: 15px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                                          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                                    </svg>
                                    Ordernar
                              </button>
                              <div :class="['row', 'conteudo_pesquisa', (its_OnFilter || its_OnOrder) ? 'open' : '']">
                                    <FiltroPaiComponent class="my-3"
                                          :itsOnFilter="its_OnFilter"
                                          :header="header_info"
                                          @pesquisa_request="(args: string) => filtrarDado(args)"
                                          @close_pesquisa="Filtro"
                                    />
                                    <div class="col-12 my-3" v-if="its_OnOrder" style="color: white;">
                                          <span v-for="dado in getDadosOrdenaveis" :key="dado['key_body' as keyof typeof dado]">
                                                <button 
                                                @click="ordenarDado(dado)"
                                                :class="['btn', 'btn-info', 'mx-3', dado['ordem' as keyof typeof dado]['on'] ? 'col-ordenada' : '']"
                                                >
                                                      {{ dado['header' as keyof typeof dado] }}
                                                      <span v-if="dado['ordem' as keyof typeof dado]['tipo_obj'] == 'Number' && dado['ordem' as keyof typeof dado]['on']">
                                                            <!-- Crescente -->
                                                            <span v-if="dado['ordem' as keyof typeof dado]['tipo_ordenacao'] == 'Asc'"> 
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
                                                      <span v-if="dado['ordem' as keyof typeof dado]['tipo_obj'] == 'String' && dado['ordem' as keyof typeof dado]['on']">
                                                            <!-- Crescente -->
                                                            <span v-if="dado['ordem' as keyof typeof dado]['tipo_ordenacao'] == 'Asc'"> 
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
                                          </span>
                                    </div>
                              </div>
                        </div>

                        <div class="row" style="margin:0 auto;">
                              <div class="col-12">
                                    <div class="row">
                                          <div class="col-md-4 col-sm-12" v-for="(dado,index_dado) in dados.body" :key="dado">
                                                <div class="card-group  align-center">
                                                      <div class="card my-1">
                                                            <div class="card-header">
                                                                  <h5 class="card-title text-center">{{ dados.header[0].header }}    {{ dado[dados.header[0].key_body] }}</h5>
                                                            </div>
                                                            <div class="card-body">
                                                                  <span v-if="!have_expancion && !dado_expandido[index_dado]">
                                                                        <div :class="['row', {'impar' : index%2==0}]" v-for="(traduzido,index) in  dados.header" :key="traduzido" v-show="index>0 && index<dados.header.length-1">
                                                                              <div class="col-6 align-center">{{ traduzido.header }}</div>
                                                                              <div class="col-6 align-center text-right">{{ dado[traduzido.key_body] }}</div>
                                                                        </div>
                                                                  </span>
                                                                  <span v-if="have_expancion && !dado_expandido[index_dado]">
                                                                        <div :class="['row', {'impar' : index%2==0}]" v-for="(traduzido,index) in  dados.header" :key="traduzido" v-show="index>0">
                                                                              <div class="col-6 align-center">{{ traduzido.header }}</div>
                                                                              <div class="col-6 align-center text-right">{{ dado[traduzido.key_body] }}</div>
                                                                        </div>
                                                                  </span>
                                                                  <span v-if="have_expancion && dado_expandido[index_dado]">
<pre v-show="dado_json[index_dado] != ''">
{{ dado_json[index_dado] }}
</pre>
<pre v-show="dado_json[index_dado] == ''">
{}
</pre>
                                                                  </span>
                                                            </div>
                                                            <div class="card-footer">
                                                                  <div class="row">
                                                                        <div class="col-6 text-center" v-if="dados.header[dados.header.length - 1].key_body == 'button'">
                                                                              <EdiçãoBotaoComponent 
                                                                                    :nome_rota_para_edicao="rota_edicao"
                                                                                    :id_item="dado['codigo' as keyof typeof dado]"
                                                                              />
                                                                        </div>
                                                                        <div class="col-6 text-center" v-if="dados.header[dados.header.length - 1].key_body == 'button'">
                                                                              <RemoçãoBotaoComponent 
                                                                                    :dado="dado"
                                                                                    @deletarModal="(arg: any) => mountDeletModal(arg)"
                                                                              />
                                                                        </div>
                                                                        <button v-if="have_expancion && !dado_expandido[index_dado]" class="btn btn-light col-12 text-center" @click="expandir(index_dado)">+</button>
                                                                        <button v-if="have_expancion && dado_expandido[index_dado]" class="btn btn-light col-12 text-center" @click="fechar(index_dado)">-</button>
                                                                  </div>
                                                                  <!-- <footer>{{ dados.header[dados.header.length - 1].header }}    {{ dado[dados.header[dados.header.length - 1].key_body] }}</footer> -->
                                                            </div>
                                                            <!-- {{dado}} {{ index }} -->
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- <div class="my-1 col-md-4 col-sm-12 card-group" v-for="dado in dados.body" :key="dado">
                              <div class="card card-deck">
                                    <div class="card-body">
                                          <span v-for="(header, index) in dados.header" :key="index">
                                                <h5 v-if="index == 0" class="card-title text-center" style="display: grid;">
                                                      {{ header.header }}  {{ dado[header.key_body] }}
                                                </h5>
                                                <div v-if="header.key_body != 'button' && index != 0">
                                                      <div v-if="header.key_body != 'vazio' && header.key_body != 'button'" :class="['row', 'mb-2', {'impar': index%2==0}]">
                                                            <div class="col-6" style="align-content: center;">
                                                                  <p class="card-text">
                                                                        {{ header.header }}
                                                                  </p>
                                                            </div>
                                                            <div class="col-6" style="text-align: right;">
                                                                  <p class="card-text">
                                                                        {{ dado[header.key_body] }}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      <span v-if="header.key_body == 'vazio'">
                                                      </span>
                                                </div>
                                                <div class="card-footer row text-center">
                                                      <div class="col" v-if="header.key_body == 'button'">
                                                            <EdiçãoBotaoComponent 
                                                                  :nome_rota_para_edicao="rota_edicao"
                                                                  :id_item="dado['codigo' as keyof typeof dado]"
                                                            />
                                                      </div>
                                                      <div class="col" v-if="header.key_body == 'button'">
                                                            <RemoçãoBotaoComponent 
                                                                  :dado="dado"
                                                                  @deletarModal="(arg: any) => mountDeletModal(arg)"
                                                            />
                                                      </div>
                                                </div>
                                          </span>
                                    </div>
                              </div>
                        </div> -->


                  </div>
                  
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
.text-right{
      text-align: right
}
.align-center{
      align-content: center
}
.aviso{
      background-color: #eec1c5;
}
.col-ordenada{
      background-color: #abc4eb;
}
.card-header{
      background-color: rgba(var(--bs-primary-rgb), 0.5);
}
.impar{
      background-color: rgba(var(--bs-black-rgb), 0.25);
}
/* Cor da navbar #052c65 */
.pesquisa_bg{
      background-color: rgba(5, 44, 101, 0.85);
      animation-name: animation_pesquisa_bg;
      animation-duration: 1s;
}

.close_pesquisa_bg{
      &.on{
            background-color: var(--bs-white);
            animation-name: animation_close_pesquisa_bg;
            animation-duration: 1s; 
      }
}

.conteudo_pesquisa{
      display: none;
      transition: opacity 1s ease, display 1s ease allow-discrete;
      opacity: 0;

      &.open {
            opacity: 1;
            display: flex;
      }
}

@keyframes animation_pesquisa_bg{
      from {
            background-color: var(--bs-white);
      }

      to{
            background-color: rgba(5, 44, 101, 0.85);
      }
}

@keyframes animation_close_pesquisa_bg{
      from {
            background-color: rgba(5, 44, 101, 0.85);
      }
      
      to{
            background-color: var(--bs-white);
      }
}

@keyframes animation_conteudo_pesquisa{
      from {
            visibility: hidden;
      }

      to{
            visibility: visible;
      }
}
</style>