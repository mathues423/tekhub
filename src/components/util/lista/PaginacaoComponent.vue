<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            pagina_atual:{
                  type: Number,
                  requeri: true
            },
            pagina_max:{
                  type: Number,
                  requeri: true
            },
      },
      methods:{
            up_paginacao(){
                  this.$emit('avancar');
            },
            down_paginacao(){
                  this.$emit('recuar');
            }
      }
})
</script>

<template>
<div class="col-12 row">
      <div class="col-3">
            <button class="btn col-12" :disabled="pagina_atual == 1" @click="down_paginacao"> Retroceder </button>
      </div>
      <div class="col-6 info" > {{ pagina_atual }} </div>
      <div class="col-3">
            <button class="btn col-12" :disabled="pagina_atual == pagina_max" @click="up_paginacao"> Avancar </button>
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
</style>