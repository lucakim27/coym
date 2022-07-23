<template>
  <div id="container">
    <form method="get" @submit.prevent="signIn">
      <h1>COYM</h1>
      <input type="text" name="username" v-model="username" placeholder="Enter your ID" required /><br/><br/>
      <input type="password" name="password" v-model="password" placeholder="Enter your Password" required /><br /><br />
      <button type="submit" value="login" class="signInBtn">Sign In</button><hr>
      <button type="button" @click="directToSignUp()">Sign Up</button><hr>
      <div class="googleLogin">
        <GoogleLogin :callback="callback" prompt auto-login/>
      </div>
    </form>
  </div>
</template>
<script setup>
const callback = (response) => {
  console.log("Handle the response", response)
}
</script>
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
    }
  }
}
</script>
<style scoped>
#container {
  display: flex;
  justify-content: center;
}

form {
  width: 70%;
  height: 60%;
  padding: 3%;
  margin-top: 4%;
  border-radius: 10px;
  border: 1px solid #ccc;
}

form h1 {
  text-align: center;
  padding: 10px;
  margin: 10px;
  font-family: fantasy;
}

input {
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

button {
  border: 1px solid #ccc;
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 10px;
  border-radius: 4px;
}

.googleLogin {
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 100%;
}

.signInBtn {
  background-color: rgb(0, 149, 255);
  color: white;
}
</style>