<script lang="ts">
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue'
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue';

export default defineComponent({
      name: 'EmpresaSelectComponent',
      data() {
          return{
            empresa_select: this.valor_inicial,
            empresa_request: {},
            requested: false,
          }
      },
      components:{
            LoaderSkeleton
      },
      props:{
            have_erro:{
                  type: Boolean,
                  required: true
            },
            valor_inicial:{
                  type: Object,
                  required:true,
                  default: new Object({})
            }
      },
      watch:{
            empresa_select(empresa_new){
                  this.$emit('empresa_escolhida', empresa_new)
            },
            valor_inicial(empresa_new){
                  this.empresa_select = empresa_new
            }
      },
      mounted() {
          this.requested = false;
          Promise.resolve(fetch_.getDado('/empresa'))
          .then((arg)=>{
            this.empresa_request = arg.data;
            this.requested = true;
            }).catch((error_retorno)=> this.$emit('Erro_fetch', error_retorno))
      },
      emits:['empresa_escolhida', 'Erro_fetch']
})
</script>

<template>
      <div :class="['w-100', {'invalido': have_erro}]">
            <select v-if="requested" class="custom-select" v-model="empresa_select" required>
                  <option selected disabled :value="{}"> Selecione a empresa</option>
                  <option v-for="operacao in empresa_request" :key="operacao['codigo' as keyof typeof operacao]" :value="operacao"> {{ operacao['descricao' as keyof typeof operacao] }} </option>
            </select>
            <span v-else>
                  <LoaderSkeleton 
                        :tipo_loader="'select'"
                  />
            </span>
      </div>
</template>

<style scoped>
.invalido > select{
      border-color: var(--bs-form-invalid-border-color);
}
.invalido > select:focus{
      border-color: var(--bs-form-invalid-border-color);
      box-shadow: 0 0 0 .25rem rgba(var(--bs-danger-rgb), .25);
}
.custom-select{
      background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
      background-size: 8px 10px;
      padding: .375rem .75rem .375rem .75rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #495057;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: inline-block;
      width: 100%;
}
</style>