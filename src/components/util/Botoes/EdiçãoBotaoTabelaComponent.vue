<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';


export default defineComponent({
      props:{
            nome_rota_para_edicao:{
                  type: String,
                  required: true
            },
            id_item:{
                  type: Number,
                  required: true
            }
      },
      methods:{
            edit(rota_edit: string, id: number){
                  if (rota_edit != '' && id != -1) {
                        router.push('/'+rota_edit+'/'+id);
                  }
            }
      }
})
</script>

<template>
      <v-btn color="info" @click="edit((nome_rota_para_edicao || ''),(id_item || -1))" variant="outlined">
            <v-icon>mdi mdi-square-edit-outline</v-icon>
      </v-btn>
</template>