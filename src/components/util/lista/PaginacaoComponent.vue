<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
      data() {
          return{
            numero_itens_p_pagina: this.lista_opc_paginas,
            item_p_pagina: this.item_p_pagina_old,

            pagina_selecionada: this.pagina_atual
          }
      },
      props:{
            have_item_p_pagina:{
                  type: Boolean,
                  default: false
            },
            pagina_atual:{
                  type: Number,
                  required: true
            },
            pagina_max:{
                  type: Number,
                  required: true
            },
            item_p_pagina_old:{
                  type: Number,
                  required: true
            },
            lista_opc_paginas:{
                  type: Array as PropType<Array<{value: number, text: string}>>,
                  required: true
            }
      },
      watch:{
            item_p_pagina(){
                  this.$emit('trocar_quantidade', this.item_p_pagina)
            },
            pagina_selecionada(){
                  this.$emit('select_paginacao', this.pagina_selecionada)
            }
      },
      methods:{
            select_paginacao(value: number){
                  this.pagina_selecionada = value;
            }
      },
      emits:['trocar_quantidade', 'select_paginacao']
})
</script>

<template>
<v-row no-gutters class="pt-5">
      <v-col class="v-col-12" v-if="have_item_p_pagina">
            <v-row no-gutters justify="center" align="center">
                  <v-col class="px-2 v-col-12 v-col-md-4">
                        <v-container class="max-width">
                              <v-select v-model="item_p_pagina" 
                                    :items="numero_itens_p_pagina" 
                                    item-title="text" 
                                    item-value="value" 
                                    label="Itens por pagina" 
                              density="compact" variant="outlined" hide-details />
                        </v-container>
                  </v-col>
                  <v-col class="v-col-12 v-col-md-8">
                        <v-container class="max-width">
                              <v-pagination
                                    v-model="pagina_selecionada"
                                    :length="pagina_max" 
                                    :total-visible="8"
                                    @update:model-value="(value)=> select_paginacao(value)"
                              />
                        </v-container>
                  </v-col>
            </v-row>
      </v-col>
      <v-col class="v-col-12" v-else>
      </v-col>
</v-row>
</template>