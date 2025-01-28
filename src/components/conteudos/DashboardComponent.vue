<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


export default defineComponent({
      template: '#Dash_comp',
      data() {
            return{
                  teste: {},
                  auth: '',
                  is_user: false,
            }
      },
      mounted() {
            if (this.user_type != 'ROLE_USER') {
                  Promise.resolve(fetch_.getDado('/atualizacaoecommerce/pendentes'))
                  .then((ret)=> {
                        this.teste = ret
                  }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
            }else{
                  this.is_user = true
            }
      },
      props:{
            user_type:{
                  type: String,
                  required: true
            }
      },
      emits:['Erro_fetch']
})
</script>

<template id="Dash_comp">
      <div class="row">
            <!-- ROLE_USER -->
            <div v-if="is_user" class="col-12">
                  USER ROLE
            </div>
            <div v-else class="col-12">
                  ADMIN | SUP ROLE
                  {{ teste }}
            </div>
            <!-- <div class="col-12">{{ teste }}</div> -->
      </div>
</template>

<style scoped>

</style>