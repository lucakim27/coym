<template>
  <div id="container">
    <form method="post" @submit.prevent="signUp">
      <h1>Sign Up</h1>
      <input type="text" name="username" v-model="username" placeholder="Username" required /><br /><br />
      <input type="password" name="password" v-model="password" placeholder="Password" required /><br /><br />
      <input type="password" name="repassword" v-model="passwordConfirm" placeholder="Password Confirm"
        required /><br /><br />
      <button type="submit" value="register">Sign Up</button><hr>
      <button class='goBackBtn' type="button" @click="directToSignIn()"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg></button>
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
        url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/signUp",
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
    },
    directToSignIn() {
      window.location.href = '/login'
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/register.css';
</style>