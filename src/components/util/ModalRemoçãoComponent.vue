<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
      data() {
            return {
                  dialog_open: this.isAtivo,
            }
      },
      watch:{
            isAtivo(){
                  this.dialog_open = this.isAtivo;
            }
      },
      props:{
            isAtivo:{
                  type: Boolean,
                  retuire: true
            },
            isInDelet:{
                  type: Boolean,
                  required: true
            },
            estado_btn:{
                  type: Boolean,
                  required: true
            }
      },
      methods:{
            deletarItem(){
                  this.$emit('deletar_item')
            }
      },
      emits:['close', 'deletar_item']
})
</script>

<template>
      <v-dialog v-model="dialog_open" persistent max-width="500" transition="dialog-top-transition">
            <v-card>
                  <v-card-title class="pa-0">
                        <v-sheet color="red-darken-4 pb-1">
                              <div class="text-center">
                                    Exclusão de item
                              </div>
                        </v-sheet>
                  </v-card-title>
                  <v-card-subtitle class="pa-0">
                        <v-sheet color="red-darken-2 py-1">
                              <div class="text-center">
                                    Essa ação não poderá ser desfeita. Deseja continuar?
                              </div>
                        </v-sheet>
                  </v-card-subtitle>
                  <v-card-text>
                              <slot name="body">
                                    default body
                              </slot>
                  </v-card-text>
                  <v-card-actions>
                        <v-btn variant="outlined" color="warning" @click="$emit('close')" text="Cancelar"/>
                        <v-btn variant="outlined" color="error" @click="deletarItem()" :disabled="estado_btn">
                              <span v-if="estado_btn">
                                    <v-icon icon="mdi mdi-loading" spin/>
                              </span>
                              <span v-else>
                                    Deletar
                              </span>   
                        </v-btn>
                  </v-card-actions>
            </v-card>
      </v-dialog>
</template>