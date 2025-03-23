<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      data() {
            return{
                  time_mensage: this.time_duration,
                  is_open: true
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
                              this.is_open = false;
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
      <v-dialog v-model="is_open" persistent max-width="500" transition="dialog-top-transition">
            <v-card>
                  <v-card-title class="headline px-0 pt-0 pb-2">
                        <v-sheet color="red-darken-4">
                              <div class="text-center">
                                    Mensagem de Erro
                              </div>
                        </v-sheet>
                  </v-card-title>
                  <v-card-text>
                        <v-row>
                              <v-col class="v-col-12">
                                    {{ mensagem }}
                              </v-col>
                        </v-row>
                  </v-card-text>
                  <v-card-actions>
                        <v-btn 
                              variant="tonal"
                              color="red-darken-4"
                              :text="`Fechar ( ${time_mensage} )`"
                              @click="()=>{
                                    time_mensage = 0; 
                                    is_open= false; 
                                    $emit('fechar_erro')
                              }"/>
                  </v-card-actions>
            </v-card>
      </v-dialog>
</template>
