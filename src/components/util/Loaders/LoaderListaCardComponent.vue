<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
      props:{
            header:{
                  type: Array as PropType<Array<object>>,
                  required: true
            },
            quantidade_dados:{
                  type: Number,
                  required: true
            },
            
      },
})
</script>

<template>
      <div class="row teste">
            <div class="col-12">
                  <div class="row">
                        <div class="col-12">
                              <button class="my-2 btn btn-info" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                    </svg>
                                    Filtrar
                              </button>
                              <button class="my-2 btn btn-info" disabled style="margin-left: 15px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                                          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                                    </svg>
                                    Ordernar
                              </button>
                        </div>
                        <span v-if="quantidade_dados !=0">
                              <div class="row">
                                    <div class="my-1 col-lg-4 col-sm-12" v-for="dado in quantidade_dados" :key="dado">
                                          <div class="card card-deck">
                                                <div class="card-body">
                                                      <span v-for="(cabeca, index) in header" :key="index">
                                                            <div v-if="index == 0" class="card-title text-center th_content">
                                                                  <!-- Loader -->
                                                            </div>
                                                            <div v-if="cabeca['key_body' as keyof typeof cabeca] != 'button' && index != 0">
                                                                  <div :class="['row', 'mb-2', 'th_content', {'impar': index%2==0}]">
                                                                        <!-- loader -->
                                                                  </div>
                                                            </div>
                                                            <div v-if="cabeca['key_body' as keyof typeof cabeca] == 'button'" class="card-footer th_content">
                                                                  <!-- loader -->
                                                            </div>
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </span>
                        <span v-else>
                              <div class="row">
                                    <div class="my-1 col-lg-4 col-sm-12 card-group" v-for="(dado, index_dado) in 60" :key="index_dado">
                                          <div class="card card-deck">
                                                <div class="card-body">
                                                      <span v-for="(cabeca, index) in header" :key="index">
                                                            <div v-if="index == 0" class="card-title text-center th_content">
                                                                  <!-- Loader -->
                                                            </div>
                                                            <div v-if="cabeca['key_body' as keyof typeof cabeca] != 'button' && index != 0">
                                                                  <div :class="['row', 'mb-2', 'th_content', {'impar': index%2==0}]">
                                                                        <!-- loader -->
                                                                  </div>
                                                            </div>
                                                            <div v-if="cabeca['key_body' as keyof typeof cabeca] == 'button'" class="card-footer th_content">
                                                                  <!-- loader -->
                                                            </div>
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </span>
                  </div>
                  
            </div>
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