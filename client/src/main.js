import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(VueCookies)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '588194928402-mcnp72nvfbknt57i551oh915dq1668de.apps.googleusercontent.com'
})

app.mount('#app')