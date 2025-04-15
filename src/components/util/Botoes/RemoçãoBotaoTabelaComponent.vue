<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
      props:{
            dado:{
                  type: Object,
                  required: true
            }
      },
      methods:{
            delet_alert(){
                  this.$emit('deletarModal', this.dado)
            }
      }
})
</script>

<template>
      <v-btn color="error" @click="delet_alert" variant="outlined">
            <v-icon>mdi mdi-delete</v-icon>
      </v-btn>
      <!-- <button type="button" class="btn delete btn-danger" @click="delet_alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
      </button> -->
</template>