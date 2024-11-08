<script lang="ts">
import { defineComponent } from 'vue';
import PaginacaoComponent from './PaginacaoComponent.vue';
// import EdicaoExclusaoComponent from 'Ideias/errado/EdicaoExclusaoComponent.vue';

export default defineComponent({
      components:{
            PaginacaoComponent
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
            }
      },
      methods:{
            up_lista(){
                  this.$emit('avancar');
            },
            down_lista(){
                  this.$emit('recuar');
            }
      }
})
</script>

<template>
      <table class="table">
            <thead class="table-primary">
                  <tr>
                        <th v-for="title in dados?.header" :key="title.header" scope="col">
                              <button v-if="title.isordenable" >
                                    {{ title.header }}
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
                                    Botaoes
                              </span>
                        </th>
                  </tr>
            </tbody>
      </table>
      <PaginacaoComponent 
            :pagina_atual="pagina"
            :pagina_max="pagina_max"
            @avancar="up_lista"
            @recuar="down_lista"
      />
</template>

<style scoped>

</style>