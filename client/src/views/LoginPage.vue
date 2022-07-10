<template>
  <div>
    <div id="loginContainer" style="height: 1100px; text-align: center;">
      <h1 id="header" style="font-size: 80px;">Login</h1><br>
      <form action="/auth" method="post">
        <input type="text" name="username" placeholder="Enter your ID" style="font-size: 80px; border-radius: 10px;"
          required /><br /><br />
        <input type="password" name="password" placeholder="Enter your Password"
          style="font-size: 80px; border-radius: 10px;" required /><br /><br />
        <button type="submit" value="login"
          style="font-size: 50px; border-radius: 10px; background-color: white;">Login</button>
        <p style="font-size: 50px;">Register <a href="/register">here</a>!</p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
};
</script>