<script lang="ts">
      import { defineComponent } from 'vue';
      import { APPCONFIG } from '../constants/Config';
      export default defineComponent({
            props:{
                  error_msg:{
                        type: Object,
                        required: true
                  }
            },
            methods:{
                  backHome(){
                        if (APPCONFIG.authToken != '') {
                              APPCONFIG.authToken = ``
                        }
                        if (localStorage.getItem('TOKEN')) {
                              localStorage.removeItem('TOKEN')
                        }
                        this.$router.push('/')
                  }
            },
            emits:['voltar']
      })
</script>

<template>
      <div class="row">
            <div v-if="!error_msg.timestamp || !error_msg.path || !error_msg.message || !error_msg.status || !error_msg.error" 
            class="content" style="text-align: center; margin-top: auto; margin-bottom: auto;">
                  {{ error_msg }}
                  <div>
                        <button class="btn btn-info" @click="backHome">Voltar</button>
                  </div>
            </div>
            <div class="content" style="text-align: center; margin-top: auto; margin-bottom: auto;" v-else>
                  Sua Requisição feita as: ({{ error_msg.timestamp }}) para a rotado servidor "...{{ error_msg.path }}" <br>
                  teve o erro [mensagem: "{{ error_msg.message }}", status: "{{ error_msg.status }} {{ error_msg.error }}"].
                  <div>
                        <button class="btn btn-info" @click="$emit('voltar')">Voltar</button>
                  </div>
            </div>
            
      </div>
</template>

<style scoped>
</style>