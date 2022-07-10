<template>
  <div>
    <!-- <form method="post" @submit.prevent="postNow">
      <input type="text" v-model="name">
      <button type="submit" name="button">Submit</button>
    </form> -->
    <div id="registerContainer" style="height: 1100px; text-align: center;">
      <form method="post" @submit.prevent="postNow">
        <h1 id="header" style="font-size: 80px;">Register</h1><br>
        <input type="text" name="username" v-model="username" placeholder="Enter your ID" style="font-size: 80px; border-radius: 10px;"
          required /><br /><br />
        <input type="password" name="password" v-model="password" placeholder="Password" style="font-size: 80px; border-radius: 10px;"
          required /><br /><br />
        <input type="password" name="repassword" v-model="repassword" placeholder="Password Again"
          style="font-size: 80px; border-radius: 10px;" required /><br /><br />
        <button type="submit" value="register"
          style="font-size: 50px; border-radius: 10px; background-color: white;">Register</button><br />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    postNow() {
      axios({
        method: "POST",
        url: "http://localhost:3000/signUp",
        headers: { 'Content-Type': 'application/json' },
        data: { username: this.username, password: this.password, repassword: this.repassword  }
      }).then(response => window.location.href = `http://localhost:8080/${response.data}`)
    }
  }
}
</script>