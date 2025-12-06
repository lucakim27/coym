import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, { clientId: '613954349182-vl2rcqdm42p5sr3gsd2li7tb7eki0skk.apps.googleusercontent.com' })
app.use(VueCookies)
app.use(router)
app.mount('#app')