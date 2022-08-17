<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a @click="renderHome">Home</a>
    <a @click="renderUsers">Users</a>
    <a @click="renderAnalysis">Analysis</a>
    <a onclick="window.location.href = 'mailto:nikolaikim27@gmail.com'">Contact Us</a>
    <a @click="renderPrivacyPolicy">Privacy Policy</a>
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
    renderPrivacyPolicy() {
      this.$router.push('/privacyPolicy')
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