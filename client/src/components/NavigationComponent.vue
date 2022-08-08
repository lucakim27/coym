<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a id='home' href="/">Home</a>
    <a id='users' href="/users">Users</a>
    <!-- <a id='chat' href="/chat">Chat</a> -->
    <a id='request' href="/request">Request</a>
    <a id='analysis' href="/analysis">Analysis</a>
    <!-- <a id='setting' href="/setting">Setting</a> -->
    <a onclick="window.location.href = 'mailto:nikolaikim27@gmail.com'">Contact us</a>
  </div>
</template>
<script>
export default {
  name: 'NavigationComponent',
  methods: {
    sidebarClose: function () {
      document.getElementById("mySidenav").style.width = "0"
    }
  },
  mounted() {
    if (document.getElementById(this.getTitle) !== null) {
      document.getElementById(this.getTitle).style.color = '#f1f1f1'
    }
  },
  computed: {
    getTitle() {
      if (new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length) === '') {
        return 'home'
      } else {
        return new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length).toLowerCase()
      }
    }
  }
};
</script>
<style scoped>
@import '../assets/componentStyles/navigationComponent.css';
</style>