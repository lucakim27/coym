import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, { clientId: '588194928402-46vdh77fbp1ah45srvdajluvqcbhcpee.apps.googleusercontent.com' })
app.use(VueCookies)
app.use(router)
app.mount('#app')