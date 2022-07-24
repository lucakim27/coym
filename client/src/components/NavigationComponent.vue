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
@import '../assets/componentStyles/navigationComponent.css';
</style>