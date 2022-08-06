<template>
  <div id="container">
    <form method="get" @submit.prevent="signIn">
      <h1>Sign In</h1>
      <input type="text" name="username" v-model="username" placeholder="Enter your ID" required /><br/><br/>
      <input type="password" name="password" v-model="password" placeholder="Enter your Password" required /><br /><br />
      <button type="submit" value="login" class="signInBtn">Sign In</button><hr>
      <button type="button" @click="directToSignUp()">Sign Up</button><hr>
      <button class='goBackBtn' type="button" @click="directToHome()">Go back</button>
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