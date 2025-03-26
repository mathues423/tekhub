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
      <v-row>
            <v-col class="v-col-12">
                  <v-table class="table-striped text-center pb-5">
                        <thead>
                              <tr>
                                    <th v-for="(title, index) in header" :key="index" scope="col">
                                          {{ title['header' as keyof typeof title] }}
                                    </th>
                              </tr>
                        </thead>
                        <tbody v-if="quantidade_dados != 0">
                              <tr v-for="(dados,index_dado) in quantidade_dados" :key="index_dado">
                                    <th v-for="(traduzido, index_traduzido) in header" :key="index_traduzido" class="th_">
                                    <div class="th_content"></div>
                                    </th>
                              </tr>
                        </tbody>
                        <tbody v-else>
                              <tr v-for="(dados,index_dado) in 100" :key="index_dado">
                                    <th v-for="(traduzido, index_traduzido) in header" :key="index_traduzido" class="th_">
                                    <div class="th_content"></div>
                                    </th>
                              </tr>
                        </tbody>
                  </v-table>
                  <v-spacer></v-spacer>
                  <v-divider></v-divider>
                  <v-spacer></v-spacer>
            </v-col>
            <v-col cols="12">
                  <v-row no-gutters class="pt-5">
                        <v-col class="v-col-12" v-if="have_item_p_pagina">
                              <v-row no-gutters justify="center" align="center">
                                    <v-col class="px-2 v-col-12 v-col-md-4">
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