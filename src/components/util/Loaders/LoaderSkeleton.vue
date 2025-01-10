<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            tipo_loader:{
                  type: String,
                  required: true
            },
            
      },
})
</script>

<template>
      <div class="w-100" v-if="tipo_loader == 'txt'">
            <div class="th_content"></div>
      </div>

      <div class="w-100" v-if="tipo_loader == 'select'">
            <select class="custom-select w-100 th_content" disabled>
            </select>
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
      height: auto;
}
</style>