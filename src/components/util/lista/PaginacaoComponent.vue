<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      data() {
          return{
            numero_itens_p_pagina:[
                  {'text': '10', 'value': 10},
                  {'text': '25', 'value': 25},
                  {'text': '50', 'value': 50},
                  {'text': '100', 'value': 100},
                  {'text': 'all', 'value': 0},
            ],
            item_p_pagina: this.item_p_pagina_old
          }
      },
      props:{
            pagina_atual:{
                  type: Number,
                  defaut: 1,
                  required: true
            },
            pagina_max:{
                  type: Number,
                  default: 1,
                  required: true
            },
            item_p_pagina_old:{
                  type: Number,
                  defaut: 10,
                  required: true
            }
      },
      methods:{
            change_item(){
                  if (this.item_p_pagina != this.item_p_pagina_old) {
                        console.log(this.item_p_pagina);
                        this.$emit('trocar_quantidade', this.item_p_pagina)
                  }
            },
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
<div class="col-12 row">
      <div class="col-6">
            {{ item_p_pagina }}
            Itens por pagina:
            <select class="custom-select" v-model.lazy="item_p_pagina" @click="change_item()">
                  <option v-for="(itempPag, index) in numero_itens_p_pagina" :key="index" :value="itempPag.value"> {{ itempPag.text }}</option>
            </select>
      </div>
      <div class="col-6 row">
            <div class="col-3">
                  <button class="btn col-12" :disabled="pagina_atual == 1" @click="down_paginacao"> Retroceder </button>
            </div>
            <div class="col-6 info" > {{ pagina_atual }} </div>
            <div class="col-3">
                  <button class="btn col-12" :disabled="pagina_atual == pagina_max" @click="up_paginacao"> Avancar </button>
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