<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      // data() {
      //     return {
      //       showDeletModal: false,
      //     }
      // },
      props:{
            header:{
                  type: Array,
                  require: true
            },
            quantidade_dados:{
                  type: Number,
                  require: true
            },
            
      },
})
</script>

<template>
      <div class="row">
      <div class="col-12">
      <table class="table table-hover table-bordered">
            <thead class="table-primary">
                  <tr>
                        <th v-for="(title, index) in header" :key="index" scope="col">
                              {{ title['header' as keyof typeof title] }}
                        </th>
                  </tr>
            </thead>
            <tbody>
                  <tr v-for="(dados,index_dado) in quantidade_dados" :key="index_dado">
                        <th v-for="(traduzido, index_traduzido) in header" :key="index_traduzido" class="th_">
                        <div class="th_content"></div>
                        </th>
                  </tr>
            </tbody>
      </table>
      </div>
      <!-- <PaginacaoComponent calss="col-12"
            :pagina_atual="pagina"
            :pagina_max="pagina_max"
            @avancar="up_lista"
            @recuar="down_lista"
      /> -->
      </div>

</template>

<style lang="css" scoped>
@keyframes th_content-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.th_content{
      animation: th_content-loading 1s linear infinite alternate;
      height: 0.7rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
}
</style>