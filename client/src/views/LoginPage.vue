<template>
  <div id="container">
    <form method="get" @submit.prevent="signIn">
      <h1 id="header">Login</h1><br>
      <input type="text" name="username" v-model="username" placeholder="Enter your ID" required /><br /><br />
      <input type="password" name="password" v-model="password" placeholder="Enter your Password"
        required /><br /><br />
      <button type="submit" value="login">Login</button>
      <p>Register <a href="/register">here</a>!</p>
    </form>
  </div>
</template>
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
          self.$router.push('/')
        } else {
          alert(response.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
#container {
  height: 1100px;
  text-align: center;
  margin: 100px;
}

input {
  font-size: 40px;
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
}

button {
  font-size: 30px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0);
  color: white;
}
</style>