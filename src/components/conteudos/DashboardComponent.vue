<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      template: '#Dash_comp',
      data() {
            return{
                  teste: {}
            }
      },
      mounted() {
          Promise.resolve(fetch_.getDado('/atualizacaoecommerce/pendentes'))
          .then((ret)=> this.teste = ret)
      },
})
</script>

<template id="Dash_comp">
      <div class="row">
            <div class="col-12">
                  PlaceHolder
            </div>
            <div class="col-12">{{ teste }}</div>
      </div>
</template>

<style scoped>

</style>