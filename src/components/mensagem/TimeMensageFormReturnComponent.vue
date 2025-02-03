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
                  default: 5
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
                              this.$emit('fechar_mensagem')
                        }else{
                              this.close_component()
                        }
                  },1000)
            }
      },
      emits:['fechar_mensagem']
})
</script>

<template>
      <div class="row">
            <div class="col-lg-2"></div>
            <div class="alert col-12 col-lg-8 alert-success my-3 row w-100">
                  <div class="col" style="align-content: center;">
                        {{ mensagem }}
                  </div>
                  <div class="col-12 col-lg-4" style="align-content: center;">
                        <button class="btn btn-info w-100" @click="()=>{
                              is_closed= true;
                              $emit('fechar_mensagem');
                              time_mensage = 0;
                        }">
                              Fechar ( {{ time_mensage }} )
                        </button>
                  </div>
            </div>
            <div class="col-lg-2"></div>
      </div>
</template>

<style scoped>
.alert{
      margin-top: 5px;
      padding: 5px;
}
</style>
