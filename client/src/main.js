import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(VueCookies)
app.use(router)
app.mount('#app')