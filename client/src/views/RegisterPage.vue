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
  background-color: rgb(0, 149, 255);
  color: white;
}
</style>