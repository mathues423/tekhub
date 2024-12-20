<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoComponent from '../EdiçãoBotaoComponent.vue';
import RemoçãoBotaoComponent from '../RemoçãoBotaoComponent.vue';
import ModalRemoçãoComponent from '../ModalRemoçãoComponent.vue';

export default defineComponent({
      data() {
          return {
            showDeletModal: false,
            dado_modal: {
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
                  requeired: true
            }
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
            filtrarDado(){
                  this.$emit('filtrarDadoPai')
            },
            dado_quantidade(args: number){
                  this.$emit('trocarQuandidadeDadoPai', args)
            }
      },
      emits: ['avancar', 'recuar', 'deletarDadoPai', 'ordenarDadoPai', 'filtrarDadoPai', 'trocarQuandidadeDadoPai']
})
</script>

<template>
      <ModalRemoçãoComponent :isAtivo="showDeletModal" @close="showDeletModal = false" @deletar_item="deletarDado">
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
                        <div class="col-12">
                              Titles
                        </div>

                        <div class="my-1 col-md-4 col-sm-12 card-group" v-for="dado in dados.body" :key="dado">
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
                                                            <!-- vazio -->
                                                      </span>
                                                </div>
                                                <div v-if="header.key_body == 'button'" class="card-footer row text-center">
                                                      <div class="col">
                                                            <EdiçãoBotaoComponent 
                                                                  :nome_rota_para_edicao="rota_edicao"
                                                                  :id_item="dado['codigo' as keyof typeof dado]"
                                                            />
                                                      </div>
                                                      <div class="col">
                                                            <RemoçãoBotaoComponent 
                                                                  :dado="dado"
                                                                  @deletarModal="(arg: any) => mountDeletModal(arg)"
                                                            />
                                                      </div>
                                                </div>
                                          </span>
                                    </div>
                              </div>
                        </div>
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
.aviso{
      background-color: #eec1c5;
}
.col-ordenada{
      background-color: #abc4eb;
}
h5.card-title{
      background-color: rgba(var(--bs-primary-rgb), 0.5);
}
.impar{
      background-color: rgba(var(--bs-black-rgb), 0.25);
}
</style>