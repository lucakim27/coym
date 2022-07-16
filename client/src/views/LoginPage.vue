<template>
  <div id="container">
    <form method="get" @submit.prevent="signIn">
      <input type="text" name="username" v-model="username" placeholder="Enter your ID" required /><br /><br />
      <input type="password" name="password" v-model="password" placeholder="Enter your Password"
        required /><br /><br />
      <button type="submit" value="login">Login</button>
      <p>Register <a href="/register">here</a>!</p>
      <!-- <div v-on:click="GoogleLoginBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-google"
          viewBox="0 0 16 16">
          <path
            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
      </div>
      <div id="my-signin2" style="display: none"></div> -->
      <GoogleLogin :callback="callback" prompt auto-login/>
    </form>
  </div>
</template>
<script setup>
const callback = (response) => {
  // This callback will be triggered automatically 
  // if one single Google account is already logged in
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
    // GoogleLoginBtn: function () {
    //   var self = this;

    //   window.gapi.signin2.render('my-signin2', {
    //     scope: 'profile email',
    //     width: 240,
    //     height: 50,
    //     longtitle: true,
    //     theme: 'dark',
    //     onsuccess: this.GoogleLoginSuccess,
    //     onfailure: this.GoogleLoginFailure,
    //   });

    //   setTimeout(function () {
    //     if (!self.googleLoginCheck) {
    //       const auth = window.gapi.auth2.getAuthInstance();
    //       auth.isSignedIn.get();
    //       document.querySelector('.abcRioButton').click();
    //     }
    //   }, 1500)

    // },
    // async GoogleLoginSuccess(googleUser) {
    //   const googleEmail = googleUser.getBasicProfile().getEmail();
    //   if (googleEmail !== 'undefined') {
    //     console.log(googleEmail);
    //   }
    // },
    // GoogleLoginFailure(error) {
    //   console.log(error);
    // },
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
          alert("You're logged in.")
          window.location.href = "/"
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
  /* margin: 100px; */
}

form {
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