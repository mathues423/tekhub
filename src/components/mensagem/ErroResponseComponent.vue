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
      <v-row no-gutters>
            <v-col v-if="!error_msg.timestamp || !error_msg.path || !error_msg.message || !error_msg.status || !error_msg.error"
            align="center"
            >
                  {{ error_msg }}
                  <spacing/>
                  <v-col>
                        Click no botão abaixo para voltar a pagina inicial.<br>
                        <v-btn 
                              color="red-darken-4"
                              prepend-icon="mdi mdi-logout"
                              @click="backHome"
                              text="Deslogar"
                        />
                  </v-col>
            </v-col>
            <v-col align="center" v-else>
                  Sua Requisição feita as: ({{ error_msg.timestamp }}) para a rotado servidor "...{{ error_msg.path }}" <br>
                  teve o erro [mensagem: "{{ error_msg.message }}", status: "{{ error_msg.status }} {{ error_msg.error }}"].<br><br>
                  <spacing/>
                  <v-col>
                        Click no botão abaixo para pagina que estava.<br>
                        <v-btn 
                              color="info"
                              @click="$emit('voltar')"
                              text="Voltar"
                        />
                  </v-col>
            </v-col>
            
      </v-row>
</template>