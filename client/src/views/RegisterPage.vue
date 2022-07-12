<template>
  <div id="container">
    <h1>Register</h1>
    <form method="post" @submit.prevent="signUp">
      <input type="text" name="username" v-model="username" placeholder="Username" required /><br /><br />
      <input type="password" name="password" v-model="password" placeholder="Password" required /><br /><br />
      <input type="password" name="repassword" v-model="passwordConfirm" placeholder="Password Confirm"
        required /><br /><br />
      <button type="submit" value="register">Register</button><br />
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
#container {
  height: 1100px;
  text-align: center;
  margin: 100px;
}

#header {
  font-size: 40px;
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