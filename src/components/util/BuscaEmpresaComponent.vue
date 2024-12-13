<script lang="ts">
import { defineComponent } from 'vue'
import EmpresaSelectComponent from './selects/EmpresaSelectComponent.vue';

export default defineComponent({
      name: 'FiltroEmpresaComponent',
      data() {
          return{
            empresa_select: {},
            empresa_request: {},
            isEscolhido: false,
          }
      },
      components:{
            EmpresaSelectComponent
      },
      props:{
            inRequest:{
                  type: Boolean,
                  required: true
            }
      },
      methods:{
            returna_id_empresa(id: number){
                  if(id != undefined){
                        this.$emit('id_empresa', id);
                  }
            },
            abilitaBusca(empresa: object){
                  this.empresa_select = empresa;
                  this.isEscolhido = true;
            }
      },
      emits:['id_empresa']
})
</script>

<template>
      <div class="row my-1">
            <div class="col-4">
                  <EmpresaSelectComponent 
                        :have_erro="false"
                        @empresa_escolhida="(arg: object)=> abilitaBusca(arg)"
                  />
            </div>
            <div class="col">
                  <button class='btn btn-primary' @click="returna_id_empresa(empresa_select['codigo' as keyof typeof empresa_select])" :disabled="inRequest || !isEscolhido">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>        
                  </button>
            </div>
      </div>
</template>

<style scoped>
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