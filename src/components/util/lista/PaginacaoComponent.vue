<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
      data() {
          return{
            numero_itens_p_pagina: this.lista_opc_paginas,
            item_p_pagina: this.item_p_pagina_old
          }
      },
      props:{
            have_item_p_pagina:{
                  type: Boolean,
                  default: false
            },
            pagina_atual:{
                  type: Number,
                  default: 1,
                  required: true
            },
            pagina_max:{
                  type: Number,
                  default: 1,
                  required: true
            },
            item_p_pagina_old:{
                  type: Number,
                  required: true
            },
            lista_opc_paginas:{
                  type: Array as PropType<Array<object>>,
                  requeired: true
            }
      },
      watch:{
            item_p_pagina(){
                  this.$emit('trocar_quantidade', this.item_p_pagina)
            }
      },
      methods:{
            up_paginacao(){
                  this.$emit('avancar');
            },
            down_paginacao(){
                  this.$emit('recuar');
            }
      },
      emits:['avancar','recuar', 'trocar_quantidade']
})
</script>

<template>
<div class="col-12 row" v-if="have_item_p_pagina">
      <div class="col-12 col-lg-6">
            Itens por pagina:
            <select class="custom-select" v-model.lazy="item_p_pagina">
                  <option v-for="(itempPag, index) in numero_itens_p_pagina" :key="index" :value="itempPag.value"> {{ itempPag.text }}</option>
            </select>
      </div>
      <div class="col-12 col-lg-6 row">
            <div class="col-5 col-lg-3">
                  <button class="btn btn-light col-12" :disabled="pagina_atual == 1" @click="down_paginacao"> Retroceder </button>
            </div>
            <div class="col-2 col-lg-6 info" > {{ pagina_atual }} </div>
            <div class="col-5 col-lg-3">
                  <button class="btn btn-light col-12" :disabled="pagina_atual == pagina_max" @click="up_paginacao"> Avancar </button>
            </div>
      </div>
</div>

<div class="col-12 row" v-else>
      <div class="col-12 row">
            <div class="col-5 col-lg-3">
                  <button class="btn btn-light col-12" :disabled="pagina_atual == 1" @click="down_paginacao"> Retroceder </button>
            </div>
            <div class="col-2 col-lg-6 info" > {{ pagina_atual }} </div>
            <div class="col-5 col-lg-3">
                  <button class="btn btn-light col-12" :disabled="pagina_atual == pagina_max" @click="up_paginacao"> Avancar </button>
            </div>
      </div>
</div>
</template>

<style scoped>
.info{
      font-size: 14px;
      color:var(--bs-dark);
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
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
      width: min(50%, 150px);
}
</style>