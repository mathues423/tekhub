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
                              Botoes
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