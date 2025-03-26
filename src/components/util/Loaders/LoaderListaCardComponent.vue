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
            have_item_p_pagina:{
                  type: Boolean,
                  default: true
            },
      },
})
</script>

<template>
<div>
      <v-row no-gutters>
            <v-col class="v-col-12">
                  <v-row no-gutters>
                        <v-col class="v-col-6 py-2">
                              <v-btn color="info" variant="outlined" disabled>
                                    <v-icon icon="mdi mdi-filter-variant"/>
                                    Filtrar
                              </v-btn>
                        </v-col>
                        <v-col class="v-col-6 py-2">
                              <v-btn color="info" variant="outlined" disabled>
                                    <v-icon icon="mdi mdi-sort-variant"/>
                                    Ordenar
                              </v-btn>
                        </v-col>
                  </v-row>
            </v-col>
            <v-col class="v-col-12">
                  <v-row no-gutters>
                        <v-col class="v-col-12 v-col-sm-6" v-for="(index_dado) in quantidade_dados" :key="index_dado">
                              <v-card class="ma-2">
                                    <v-card-title class="px-0 pt-0 pb-2">
                                          <v-sheet color="secondary">
                                                <div class="text-center">
                                                      ID
                                                </div>
                                          </v-sheet>
                                    </v-card-title>
                                    <v-card-subtitle class="px-2 pt-0 pb-2">
                                          Descrição
                                    </v-card-subtitle>
                                    <v-card-text>
                                          <v-row>
                                                <v-col class="v-col-12">
                                                      <v-row v-for="index_card in 4" :key="index_card" class="pt-2">
                                                            <v-col class="v-col-5 card_contend"></v-col>
                                                            <v-col class="v-col-2"></v-col>
                                                            <v-col class="v-col-5 card_contend"></v-col>
                                                            <v-divider></v-divider>
                                                      </v-row>
                                                </v-col>
                                          </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                          <v-row class="text-center px-2">
                                                <v-col class="v-col-4 card_contend"></v-col>
                                                <v-col class="v-col-4"></v-col>
                                                <v-col class="v-col-4 card_contend"></v-col>
                                          </v-row>
                                    </v-card-actions>
                              </v-card>
                        </v-col>
                  </v-row>
            </v-col>
            <v-col cols="12">
                  <v-row no-gutters class="pt-5">
                        <v-col class="v-col-12" v-if="have_item_p_pagina">
                              <v-row no-gutters justify="center" align="center">
                                    <v-col class="v-col-12 v-col-md-4">
                                          <v-container class="max-width">
                                                <v-select loading="lazy" label="Itens por pagina" density="compact" variant="outlined" hide-details disabled/>
                                          </v-container>
                                    </v-col>
                                    <v-col class="v-col-12 v-col-md-8">
                                          <v-container class="max-width">
                                                <v-pagination
                                                      :length="1" 
                                                      :total-visible="1"
                                                />
                                          </v-container>
                                    </v-col>
                              </v-row>
                        </v-col>
                        <v-col class="v-col-12" v-else>
                        </v-col>
                  </v-row>
            </v-col>
      </v-row>
</div>
</template>

<style lang="css" scoped>
@keyframes card_contend-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.card_contend{
      animation: card_contend-loading 1s linear infinite alternate;
      height: 0.7rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
}
</style>