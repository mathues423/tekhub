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
            have_ordenavel:false,
            name_rota: this.$route.name
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
                  type: Array as PropType<Array<{value: number, text: string}>>,
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
      methods:{
            expandir(linha: number){
                  this.dado_expandido[linha] = true;
            },
            fechar(linha: number){
                  this.dado_expandido[linha] = false;
            },
            selecionar_pagina(args: number){
                  this.$emit('select_paginacao', args);
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
            },
            type_icon(title: object): string | undefined{
                  if(title['ordem' as keyof typeof title]['tipo_obj' as keyof typeof Object] === 'String'){
                        return title['ordem' as keyof typeof title]['tipo_ordenacao' as keyof typeof Object] === 'Asc' ? 'mdi-sort-alphabetical-ascending' : 'mdi-sort-alphabetical-descending'
                  }else if(title['ordem' as keyof typeof title]['tipo_obj' as keyof typeof Object] === 'Number'){
                        return title['ordem' as keyof typeof title]['tipo_ordenacao' as keyof typeof Object] === 'Asc' ? 'mdi-sort-numeric-ascending' : 'mdi-sort-numeric-descending'
                  }
                  return undefined
            }
      },
      emits: ['select_paginacao', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai', 'trocarQuandidadeDadoPai', 
      'fecharModal', 'abrirModal']
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
                  <v-row no-gutters>
                        <v-col class="v-col-12" style="padding-bottom: 5px;">
                              <v-icon color="warning" icon="mdi mdi-alert-circle-outline"/>Informações do item:
                        </v-col>
                        <v-col class="v-col-12" style="padding-top: 5px;" v-for="value in ModalContent_Remocao" :key="value['key' as keyof typeof value]">
                              {{ value['nome' as keyof typeof value] }} : {{ dado_modal[value['key' as keyof typeof value] as keyof typeof dado_modal] }}
                              <v-divider></v-divider>
                        </v-col>
                  </v-row>
            </template>
      </ModalRemoçãoComponent>
<div>
      <v-row no-gutters>
            <v-col class="v-col-12">
                  <v-row no-gutters>
                        <v-col class="v-col-6 py-2 pl-2">
                              <v-btn color="info" @click="Filtro" variant="outlined">
                                    <v-icon v-if="its_OnFilter" icon="mdi mdi-close-circle-outline"/>
                                    <v-icon v-else icon="mdi mdi-filter-variant"/>
                                    Filtrar
                              </v-btn>
                        </v-col>
                        <v-col class="v-col-6 py-2">
                              <v-btn color="info" @click="Ordem" variant="outlined">
                                    <v-icon v-if="its_OnOrder" icon="mdi mdi-close-circle-outline"/>
                                    <v-icon v-else icon="mdi mdi-sort-variant"/>
                                    Ordenar
                              </v-btn>
                        </v-col>
                        <v-row :class="['conteudo_pesquisa', (its_OnFilter || its_OnOrder) ? 'open' : '']" no-gutters>
                              <v-col class="v-col-12" v-show="its_OnFilter || its_OnOrder">
                                    <v-divider class="my-2"> {{ its_OnFilter ? 'Filtro' : its_OnOrder ? 'Ordenação' : undefined }} </v-divider>
                              </v-col>
                              <FiltroPaiComponent
                                    :itsOnFilter="its_OnFilter"
                                    :header="header_info"
                                    @pesquisa_request="(args: string) => filtrarDado(args)"
                                    @close_pesquisa="Filtro"
                              />
                              <v-row no-gutters v-show="its_OnOrder">
                                    <span v-for="title in dados?.header" :key="title.header" class="px-4 pb-3">
                                          <v-btn v-if="title.isordenable"
                                                :color="title.ordem.on ? 'success' : 'info'"
                                                :text="title.header"
                                                :prepend-icon="type_icon(title)"
                                                @click="ordenarDado(title)"
                                          />
                                    </span>
                              </v-row>
                        </v-row>
                  </v-row>
                  <v-divider></v-divider>
            </v-col>
            <v-col class="v-col-12 pt-2">
                  <v-row no-gutters v-if="dados.body.length > 0">
                        <v-col class="v-col-12 v-col-sm-6" v-for="(corpo, index_dado) in dados.body" :key="corpo">
                              <v-card class="ma-2">
                                    <v-card-title class="px-0 pt-0 pb-2">
                                          <v-sheet color="secondary">
                                                <div class="text-center">
                                                      {{ dados.header[0].header }}    {{ corpo[dados.header[0].key_body] }}
                                                </div>
                                          </v-sheet>
                                    </v-card-title>
                                    <v-card-subtitle class="px-2 pt-0 pb-2" v-show="corpo.descricao">
                                          {{corpo.descricao}}
                                    </v-card-subtitle>
                                    <v-card-text>
                                          <v-row>
                                                <v-col class="v-col-12" v-for="(cabeca, index) in dados.header" :key="cabeca" v-show="!dado_expandido[index_dado]">
                                                      <v-row no-gutters v-show="index != 0 && cabeca.key_body != 'button'" justify="center" align="center">
                                                            <v-col class="v-col-6">
                                                                  <p class="text-center">
                                                                        {{ cabeca.header }}
                                                                  </p>
                                                            </v-col>
                                                            <v-col class="v-col-6">
                                                                  <p class="text-right">
                                                                  {{ corpo[cabeca.key_body] }}
                                                                  </p>
                                                            </v-col>
                                                            <v-divider></v-divider>
                                                      </v-row>
                                                </v-col>
                                                <v-col class="v-col-12" v-show="dado_expandido[index_dado]">
                                                      Dados da request:
                                                      <div>
<pre v-show="dado_json[index_dado] != ''">
{{ dado_json[index_dado] }}
</pre>
<pre v-show="dado_json[index_dado] == ''">
{}
</pre>   
                                                      </div>
                                                </v-col>
                                          </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                          <v-row class="text-center">
                                                <v-col class="v-col-4">
                                                      <EdiçãoBotaoComponent 
                                                            :nome_rota_para_edicao="rota_edicao"
                                                            :id_item="corpo['codigo' as keyof typeof corpo]"
                                                      />
                                                </v-col>
                                                <v-col class="v-col-4">
                                                      <v-btn v-show="have_expancion && !dado_expandido[index_dado]" @click="expandir(index_dado)" variant="outlined">
                                                            <v-icon>mdi mdi-plus</v-icon>
                                                      </v-btn>
                                                      <v-btn v-show="have_expancion && dado_expandido[index_dado]" @click="fechar(index_dado)" variant="outlined">
                                                      <v-icon>mdi mdi-minus</v-icon>
                                                      </v-btn>
                                                </v-col>
                                                <v-col class="v-col-4">
                                                      <RemoçãoBotaoComponent 
                                                            :dado="corpo"
                                                            @deletarModal="(arg: any) => mountDeletModal(arg)"
                                                      />
                                                </v-col>
                                          </v-row>
                                    </v-card-actions>
                              </v-card>
                        </v-col>
                  </v-row>
                  <v-row v-else>
                        <v-col class="v-col-12">
                              <v-sheet>
                                    <v-card class="ma-2">
                                          <v-card-title class="px-0 pt-0 pb-2">
                                                <v-sheet color="secondary">
                                                      <div class="text-center">   
                                                            <!-- {{ $router.currentRoute }} -->
                                                            {{ name_rota }}
                                                      </div>
                                                </v-sheet>
                                          </v-card-title>
                                          <v-card-text>
                                                <v-row class="py-16">
                                                      <v-col class="v-col-12 text-center">
                                                            <div>
                                                                  <v-icon size="62px" icon="mdi mdi-basket-fill"/>
                                                            </div>
                                                            <div class="text-center">
                                                                  Não ha dados
                                                            </div>
                                                      </v-col>
                                                </v-row>
                                          </v-card-text>
                                    </v-card>
                              </v-sheet>
                        </v-col>
                  </v-row>
            </v-col>
            <PaginacaoComponent 
                  :have_item_p_pagina="have_item_p_pagina"
                  :have_pagination="have_pagination"
                  :pagina_max="pagina_max"
                  :pagina_atual="pagina"
                  :item_p_pagina="item_p_pagina"
                  :item_p_pagina_old="item_p_pagina"
                  :lista_opc_paginas="lista_opc_paginas"
                  @select_paginacao="(value)=> selecionar_pagina(value)"
                  @trocar_quantidade="dado_quantidade"
            />
      </v-row>
</div>
</template>

<style lang="css" scoped>
pre{
      background-color: #222;
      color: white;
      line-height:1.2em;
      border-left:8px solid green;
      border-radius:5px;
      overflow-x:scroll;
      padding:5px 20px;
      text-align:justify;
      font-size: 16px;
      font-family:calibri,arial,sans-serif;
}

.impar{
      background-color: rgba(var(--bs-black-rgb), 0.25);
}
</style>