<template>
  <div id="container">
    <form method="get" @submit.prevent="signIn">
      <h1>Sign In</h1>
      <input type="text" name="username" v-model="username" placeholder="Username..." required /><br/><br/>
      <input type="password" name="password" v-model="password" placeholder="Password..." required /><br /><br />
      <button type="submit" value="login" class="signInBtn">Sign In</button><hr>
      <button type="button" @click="directToSignUp()">Sign Up</button><hr>
      <button class='goBackBtn' type="button" @click="directToHome()"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg></button>
      <!-- <div class="googleLogin">
        <GoogleLogin :callback="callback" prompt auto-login/>
      </div> -->
    </form>
  </div>
</template>
<!-- <script setup>
const callback = (response) => {
  console.log("Handle the response", response)
}
</script> -->
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"

export default {
  name: 'LoginPage',
  setup() {
    const { cookies } = useCookies()
    return { cookies }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      const self = this
      axios({
        method: "GET",
        // url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/signIn",
        url: "http://localhost:3000/signIn",
        params: {
          username: this.username,
          password: this.password
        }
      }).then(function (response) {
        if (response.data.status) {
          self.$cookies.set("user", { username: self.username, password: self.password })
          window.location.href = "/"
        } else {
          alert(response.data.message)
        }
      })
    },
    directToSignUp() {
      window.location.href = '/register'
    },
    directToHome() {
      window.location.href = '/'
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/login.css';
</style>