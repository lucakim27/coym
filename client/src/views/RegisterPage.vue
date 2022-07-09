<template>
  <div>
    <center id="registerContainer" style="height: 1100px">
      <h1 id="header" style="font-size: 80px;">Register</h1><br>
      <input type="text" name="username" placeholder="Enter your ID" style="font-size: 80px; border-radius: 10px;"
        required /><br /><br />
      <input type="password" name="password" placeholder="Password" style="font-size: 80px; border-radius: 10px;"
        required /><br /><br />
      <input type="password" name="repassword" placeholder="Password Again"
        style="font-size: 80px; border-radius: 10px;" required /><br /><br />
      <button type="submit" value="register"
        style="font-size: 50px; border-radius: 10px; background-color: white;">Register</button><br />
    </center>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  mounted() {
    axios
      .post('http://localhost:3000/authRegistration')
  }
};
</script>