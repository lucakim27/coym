<template>
  <div>
    <HeaderComponent :pass_data='username' />
    <NavigationComponent />
    <router-view :pass_data='username' />
  </div>
</template>
<script>
import NavigationComponent from '@/components/NavigationComponent'
import HeaderComponent from '@/components/HeaderComponent'
import { useCookies } from "vue3-cookies"
import axios from 'axios'
export default {
  name: 'App',
  components: {
    NavigationComponent,
    HeaderComponent
  },
  data() {
    return {
      username: null
    }
  },
  setup() {
    const { cookies } = useCookies()
    return { cookies }
  },
  created() {
    let self = this
      if (self.cookies.get('user') !== null) {
        axios({
          method: "GET",
          url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/cookieValidation",
          // url: "http://localhost:3000/cookieValidation",
          params: {
            username: self.cookies.get("user").username,
            password: self.cookies.get("user").password
          }
        }).then(function (response) {
          if (response.data.status) {
            self.username = response.data.username
          }
        })
      }
  }
}
</script>