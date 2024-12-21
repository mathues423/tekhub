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
            showDeletModal: false,
            dado_modal: {
            },
            its_OnFilter:false,
            its_OnOrder:false,
            have_filtravel:false,
            have_ordenavel:false
          }
      },
      components:{
            PaginacaoComponent,
            EdiçãoBotaoComponent,
            FiltroPaiComponent,
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
            filtrarDado(request: string){
                  this.$emit('filtrarDadoPai', request)
            },
            dado_quantidade(args: number){
                  this.$emit('trocarQuandidadeDadoPai', args)
            },

            Filtro(){
                  this.its_OnFilter = !this.its_OnFilter;
                  this.its_OnOrder = false;
            },
            Ordem(){
                  this.its_OnOrder = !this.its_OnOrder;
                  this.its_OnFilter = false;
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
                        <div :class="['col-12', {'pesquisa_bg' : (its_OnFilter || its_OnOrder)}]">
                              <button class="my-2 btn btn-info" @click="Filtro" :disabled="!have_filtravel">
                                    <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                          </svg>
                                    </span>
                                    <span>
                                          Filtrar
                                    </span>
                              </button>
                              <button class="my-2 btn btn-info" @click="Ordem" :disabled="!have_ordenavel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                                          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                                    </svg>
                                    Ordernar
                              </button>
                              <div :class="['row', 'conteudo_pesquisa', (its_OnFilter || its_OnOrder) ? 'open' : '']">
                                    <FiltroPaiComponent class="my-3"
                                          :itsOnFilter="its_OnFilter"
                                          :header="dados.header"
                                          @pesquisa_request="(args: string) => filtrarDado(args)"
                                          @close_pesquisa="Filtro"
                                    />
                                    <div class="col-12 my-3" v-if="its_OnOrder">
                                          {{ getDadosOrdenaveis }}
                                    </div>
                              </div>
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
#content div.conteudo_pesquisa{
      padding-right: 0;
}
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
/* Cor da navbar #052c65 */
.pesquisa_bg{
      
      background-color: rgba(5, 44, 101, 0.85);
      animation-name: animation_pesquisa_bg;
      animation-duration: 1s;
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

@keyframes animation_conteudo_pesquisa{
      from {
            visibility: hidden;
      }

      to{
            visibility: visible;
      }
}
</style>