<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      data() {
            return{
                  time_mensage: this.time_duration,
                  is_closed: false
            }
      },
      props:{
            mensagem: {
                  type: String,
                  required: true
            },
            time_duration:{
                  type: Number,
                  required: true,
                  default: 10
            }
      },
      mounted() {
            this.close_component();
      },
      methods:{
            close_component(){
                  setTimeout(()=> {
                        this.time_mensage --;
                        if (this.time_mensage <= 0) {
                              this.is_closed = true;
                              this.$emit('fechar_erro')
                        }else{
                              this.close_component()
                        }
                  },1000)
            }
      },
      emits:['fechar_erro']
})
</script>

<template>
      <Teleport to="body">
            <div class="page_mask" v-if="!is_closed">
                  <div class="row">
                        <div class="col-lg-2"></div>
                        <div class="alert col-12 col-lg-8 alert-warning my-3 row">
                              <div class="col" style="align-content: center;">
                                    {{ mensagem }}
                              </div>
                              <div class="col-12 col-lg-4" style="align-content: center;">
                                    <button class="btn btn-info w-100" @click="()=>{
                                          time_mensage = 0;
                                          is_closed= true;
                                          $emit('fechar_erro');
                                    }">
                                          Fechar ( {{ time_mensage }} )
                                    </button>
                              </div>
                        </div>
                        <div class="col-lg-2"></div>
                  </div>
            </div>
      </Teleport>
</template>

<style scoped>
.page_mask{
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.9s ease;
}
</style>
