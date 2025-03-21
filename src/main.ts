import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
})
createApp(App).use(vuetify).use(store).use(router).mount('#app')
