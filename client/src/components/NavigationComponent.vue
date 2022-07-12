<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a href="/">Home</a>
    <a href="/online">Online</a>
    <a href="/chat">Chat</a>
    <a href="/chart">Chart</a>
    <a onclick="window.location.href = 'mailto:nikolaikim27@google.com'">Contact</a>
  </div>
</template>
<script>
export default {
  name: 'NavigationComponent',

  methods: {

    sidebarClose: function () {
      document.getElementById("mySidenav").style.width = "0"
    }
  }
};
</script>
<style scoped>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  margin-left: -10px;
  margin-top: -10px;
  z-index: 999999999999999999 !important;
  background-color: rgb(0, 0, 0);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>