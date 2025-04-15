import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line
import VueTheMask from 'vue-the-mask' // acusa de erro de localização mais o funcionamento é correto

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

const vuetify = createVuetify({
      ssr: true,
      components,
      directives,
      theme: {
            themes: {
                  light: {
                        colors: {
                              primary: '#002140', // Cor principal (fundo navs)
                              secondary: '#1890ff', // Cor secundária (escrito dos navs)
                              table_dashboar_active: '#000', // Cor da letra da tabela do dashboard
                        },
                  },
                  dark:{
                        colors:{
                              primary: '#005281',
                              secondary: '#000',
                              table_dashboar_active: '#000', 
                        }
                  }
            },
      }
})
const app = createApp(App)
      .use(VueTheMask as any)
      .use(vuetify)
      .use(store)
      .use(router)

app.mount('#app')      
