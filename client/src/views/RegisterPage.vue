<template>
  <div id="container">
    <form method="post" @submit.prevent="signUp">
      <h1>COYM</h1>
      <input type="text" name="username" v-model="username" placeholder="Username" required /><br /><br />
      <input type="password" name="password" v-model="password" placeholder="Password" required /><br /><br />
      <input type="password" name="repassword" v-model="passwordConfirm" placeholder="Password Confirm"
        required /><br /><br />
      <button type="submit" value="register">Sign Up</button>
    </form>
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
      passwordConfirm: ''
    }
  },
  methods: {
    signUp() {
      const self = this
      axios({
        method: "POST",
        url: "http://localhost:3000/signUp",
        headers: { 'Content-Type': 'application/json' },
        data: { username: this.username, password: this.password, passwordConfirm: this.passwordConfirm }
      }).then(function (response) {
        if (!response.data.status) {
          alert(response.data.message)
          self.$router.push('/register')
        } else {
          alert(response.data.message)
          self.$router.push('/login')
        }
      })
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/register.css';
</style>