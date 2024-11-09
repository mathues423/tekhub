<script lang="ts">
import { defineComponent } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
import EdiçãoBotaoComponent from '../EdiçãoBotaoComponent.vue';
import RemoçãoBotaoComponent from '../RemoçãoBotaoComponent.vue';
import ModalComponent from '../ModalComponent.vue';

export default defineComponent({
      data() {
          return {
            showModal: false,
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
            ModalComponent
      },
      props:{
            pagina_max:{
                  type:Number,
                  require:true
            },
            pagina:{
                  type:Number,
                  require:true
            },
            dados:{
                  type: Object,
                  require: true
            },
            rota_edicao:{
                  type: String,
                  require: true
            },
      },
      methods:{
            up_lista(){
                  this.$emit('avancar');
            },
            down_lista(){
                  this.$emit('recuar');
            },
            mountModal(arg: {codigoTek: string, descricao: string, cnpj: number, versaoApiTek: string}){
                  this.dado_modal = arg;
                  this.showModal = true;
            },
            deletarDado(){
                  this.$emit('deletarDadoPai', this.dado_modal);
            },
            ordenarDado(dadosObj : any){
                  this.$emit('ordenarDadoPai', dadosObj);
            }
      },
      emits: ['avancar', 'recuar', 'deletarDadoPai', 'ordenarDadoPai']
})
</script>

<template>
      <ModalComponent :isAtivo="showModal" @close="showModal = false" @deletar_item="deletarDado">
            <template v-slot:header> Exclusão de item </template>
            <template v-slot:body> 
                  <div class="aviso">Atenção essa ação não poderá ser desfeita.</div>
                  <div style="padding-top: 5px;">Informações do item</div>
                  <!-- "codigoTek" "descricao""cnpj""versaoApiTek" -->
                  <div style="padding-top: 5px;">Código: {{ dado_modal.codigoTek }}</div>
                  <div style="padding-top: 5px;">Razão Social: {{ dado_modal.descricao }}</div>
                  <div style="padding-top: 5px;">CNPJ: {{ dado_modal.cnpj }}</div>
                  <div style="padding-top: 5px;">Verção: {{ dado_modal.versaoApiTek }}</div>
            </template>
      </ModalComponent>
      <div class="row">
      <table class="table" calss="col-12">
            <thead class="table-primary">
                  <tr>
                        <th v-for="title in dados?.header" :key="title.header" scope="col">
                              <button v-if="title.isordenable" class="btn" @click="ordenarDado(title)">
                                    {{ title.header }} |Z| {{ title.ordem.tipo_ordenacao }}
                              </button>
                              <span v-else>
                                    {{ title.header }}
                              </span>
                        </th>
                  </tr>
            </thead>
            <tbody>
                  <tr v-for="(dado,index_dado) in dados?.body" :key="index_dado">
                        <th v-for="(traduzido, index_traduzido) in dados?.header" :key="traduzido" :class="`${index_traduzido === 0  ? 'important' : 'not_important'}`">
                              <span v-if="traduzido.key_body != 'button'">
                                    {{ dado[traduzido.key_body as keyof typeof dado] }}
                              </span>
                              <span v-else>
                                    <EdiçãoBotaoComponent
                                    :nome_rota_para_edicao="rota_edicao"
                                    :id_item="dado['codigo' as keyof typeof dado]"
                                    />
                                    <RemoçãoBotaoComponent 
                                    :dado="dado"
                                    @deletarModal="(arg) => mountModal(arg)"
                                    />
                              </span>
                        </th>
                  </tr>
            </tbody>
      </table>
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
</style>