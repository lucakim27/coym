<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a id='home' @click="renderHome">Home</a>
    <a id='users' @click="renderUsers">Users</a>
    <a id='analysis' @click="renderAnalysis">Analysis</a>
    <a onclick="window.location.href = 'mailto:nikolaikim27@gmail.com'">Contact us</a>
  </div>
</template>
<script>
export default {
  name: 'NavigationComponent',
  methods: {
    renderHome() {
      this.$router.push('/')
      this.sidebarClose()
    },
    renderUsers() {
      this.$router.push('/users')
      this.sidebarClose()
    },
    renderAnalysis() {
      this.$router.push('/analysis')
      this.sidebarClose()
    },
    sidebarClose: function () {
      document.getElementById("mySidenav").style.width = "0"
    }
  }
}
</script>
<style scoped>
@import '../assets/componentStyles/navigationComponent.css';
</style>