<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      template: '#Dash_comp',
      data() {
            return{
                  teste: {},
                  auth: ''
            }
      },
      mounted() {
            Promise.resolve(fetch_.getDado('/atualizacaoecommerce/pendentes'))
            .then((ret)=> {
                  this.teste = ret
            }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
      },
      emits:['Erro_fetch']
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