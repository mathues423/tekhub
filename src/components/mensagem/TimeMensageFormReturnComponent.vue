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
      <v-row no-gutters>
            <v-sheet color="success w-100 v-row px-2">
                  <v-col class="v-col-12 v-col-md-8" style="align-content: center;">
                        {{ mensagem }}
                  </v-col>
                  <v-col class="v-col-12 v-col-md-4" style="align-content: center;">
                        <v-btn 
                              color="red-darken-4"
                              :text="`Fechar ( ${time_mensage} )`"
                              @click="()=>{
                                    is_closed= true;
                                    $emit('fechar_mensagem');
                                    time_mensage = 0;
                        }"/>
                  </v-col>
            </v-sheet>
      </v-row>
</template>

<style scoped>
.alert{
      margin-top: 5px;
      padding: 5px;
}
</style>
