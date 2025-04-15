<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoTabelaComponent from '@/components/util/Botoes/EdiçãoBotaoTabelaComponent.vue';
import RemoçãoBotaoTabelaComponent from '@/components/util/Botoes/RemoçãoBotaoTabelaComponent.vue';
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
            EdiçãoBotaoTabelaComponent,
            RemoçãoBotaoTabelaComponent,
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
                  type: Array as PropType<Array<{value: number, text: string}>>,
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
            filtrarDado(title : object){
                  this.$emit('filtrarDadoPai', title)
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
      emits: ['avancar', 'recuar', 'select_paginacao', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai', 'trocarQuandidadeDadoPai', 'fecharModal', 'abrirModal']
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
                        <span v-for="title in dados?.header" :key="title.header" class="px-4 pb-3">
                              <v-btn v-if="title.isfiltrable"
                                    color="info"
                                    :text="title.header"
                                    :prepend-icon="title.filtro?.tipo_filtro == 'all' ? 'mdi-magnify' : title.filtro?.tipo_filtro == 'pre'? 'mdi-filter' : undefined"
                                    @click="filtrarDado(title)"
                              />
                        </span>
                  </v-row>
                  <v-table density="compact" class="text-center">
                        <thead>
                              <tr>
                                    <th v-for="title in dados?.header" :key="title.header" scope="col">
                                          <v-row no-gutters class="text-center">
                                                <v-col class="v-col-12 mb-2">
                                                      <v-sheet rounded="xs" elevation="2" class="span-position h-100" :color="title.ordem?.on  ? 'info' : undefined" role="button" @click="title.isordenable ? ordenarDado(title) : undefined">
                                                            <div class="w-100 h-100 d-grid" align="center">
                                                                  <span v-if="title.isordenable && title.ordem.on" class="left">
                                                                        <span v-if="title.ordem.tipo_obj === 'String'">
                                                                              <v-icon>{{ title.ordem.tipo_ordenacao === 'Asc' ? 'mdi-sort-alphabetical-ascending' : 'mdi-sort-alphabetical-descending' }}</v-icon>
                                                                        </span>
                                                                        <span v-else-if="title.ordem.tipo_obj === 'Number'">
                                                                              <v-icon>{{ title.ordem.tipo_ordenacao === 'Asc' ? 'mdi-sort-numeric-ascending' : 'mdi-sort-numeric-descending' }}</v-icon>
                                                                        </span>
                                                                  </span>
                                                                  <span v-if="title.isordenable && !title.ordem.on" class="left">
                                                                        <span v-if="title.ordem.tipo_obj === 'String'">
                                                                              <v-icon>{{ title.ordem.tipo_ordenacao === 'Asc' ? 'mdi-sort-alphabetical-ascending' : 'mdi-sort-alphabetical-descending' }}</v-icon>
                                                                        </span>
                                                                        <span v-else-if="title.ordem.tipo_obj === 'Number'">
                                                                              <v-icon>{{ title.ordem.tipo_ordenacao === 'Asc' ? 'mdi-sort-numeric-ascending' : 'mdi-sort-numeric-descending' }}</v-icon>
                                                                        </span>
                                                                  </span>
                                                                  {{ title.header }}
                                                            </div>
                                                      </v-sheet>
                                                </v-col>
                                          </v-row>
                                    </th>
                              </tr>
                        </thead>
                        <tbody v-if="dados?.body.length > 0">
                              <tr v-for="(dado,index_dado) in dados?.body" :key="index_dado">
                                    <td v-show="!dado_expandido[index_dado]" v-for="traduzido in dados?.header" :key="traduzido">
                                          <span v-if="traduzido.key_body != 'button' && traduzido.key_body != 'vazio'">
                                                <v-btn v-if="traduzido['expandible' as keyof typeof traduzido]" @click="expandir(index_dado)">
                                                      +
                                                </v-btn>
                                                {{ dado[traduzido.key_body as keyof typeof dado] }}
                                          </span>
                                          <span v-else-if="traduzido.key_body == 'button'">
                                                <v-row no-gutters>
                                                      <v-col class="v-col-12">
                                                            <EdiçãoBotaoTabelaComponent
                                                                  :nome_rota_para_edicao="rota_edicao"
                                                                  :id_item="dado['codigo' as keyof typeof dado]"
                                                            />
                                                      </v-col>
                                                      <v-col class="v-col-12">
                                                            <RemoçãoBotaoTabelaComponent
                                                                  :dado="dado"
                                                                  @deletarModal="(arg: any) => mountDeletModal(arg)"
                                                            />
                                                      </v-col>
                                                </v-row>
                                          </span>
                                          <span v-else-if="traduzido.key_body == 'vazio'">
                                                
                                          </span>
                                          <span v-else>
                                                404
                                          </span>
                                    </td> 
                                    <td v-show="dado_expandido[index_dado]" :colspan="dados?.header.length">
                                          <v-row no-gutters>
                                                <v-col class="v-col-1 content_center">
                                                      <v-btn @click="fechar(index_dado)" text="-"/>
                                                </v-col>
                                                <v-col>
                                                      <pre style="padding-left:30px" v-show="dado_json[index_dado] != ''">
{{ dado_json[index_dado] }}
                                                      </pre>
                                                      <pre v-show="dado_json[index_dado] == ''">
<!-- {} -->
{{ dado_json[index_dado] }}
                                                      </pre>
                                                </v-col>
                                          </v-row>
                                    </td>
                              </tr>
                        </tbody>
                        <tbody v-else>
                              <tr>
                                    <td :colspan="dados.header.length">
                                          <v-sheet>
                                                <v-row no-gutters class="align-center flex-column py-16">
                                                      <div>
                                                            <v-icon size="62px" icon="mdi mdi-basket-fill"/>
                                                      </div>
                                                      <div>
                                                            Não ha dados
                                                      </div>
                                                </v-row>
                                          </v-sheet>
                                    </td>
                              </tr>
                        </tbody>
                  </v-table>
            </v-col>
            <v-col class="v-col-12">
                  <v-divider class="mt-4"> Paginação </v-divider>
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
            </v-col>
      </v-row>
</div>
</template>

<style lang="css" scoped>
.content_center{
      align-content: center;
}
.span-position>*>span.right{
      float: right;
}
.span-position>*>span.left{
      float: left;
}
.v-hidden{
      visibility: hidden;
}
pre{
      background-color: #222;
      color: white;
      line-height:1.2em;
      border-left:8px solid green;
      border-radius:5px;
      padding:5px 20px;
      text-align:justify;
      font-size: 16px;
      font-family:calibri,arial,sans-serif;
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