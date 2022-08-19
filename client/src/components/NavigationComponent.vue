<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a id="home" @click="renderHome">Home</a>
    <a id="users" @click="renderUsers">Users</a>
    <a id="analysis" @click="renderAnalysis">Analysis</a>
    <a id="aboutUs" @click="renderAboutUs">About Us</a>
    <a onclick="window.location.href = 'mailto:nikolaikim27@gmail.com'">Contact Us</a>
    <a id="privacyPolicy" @click="renderPrivacyPolicy">Privacy Policy</a>
  </div>
</template>
<script>
export default {
  name: 'NavigationComponent',
  methods: {
    renderHome() {
      this.$router.push('/')
      this.sidebarClose()
      this.removeHighlight()
      document.getElementById('home').classList.toggle("highlight")
    },
    renderUsers() {
      this.$router.push('/users')
      this.sidebarClose()
      this.removeHighlight()
      document.getElementById('users').classList.toggle("highlight")
    },
    renderAnalysis() {
      this.$router.push('/analysis')
      this.sidebarClose()
      this.removeHighlight()
      document.getElementById('analysis').classList.toggle("highlight")
    },
    renderAboutUs() {
      this.$router.push('/aboutUs')
      this.sidebarClose()
      this.removeHighlight()
      document.getElementById('aboutUs').classList.toggle("highlight")
    },
    renderPrivacyPolicy() {
      this.$router.push('/privacyPolicy')
      this.sidebarClose()
      this.removeHighlight()
      document.getElementById('privacyPolicy').classList.toggle("highlight")
    },
    sidebarClose: function () {
      document.getElementById("mySidenav").style.width = "0"
    },
    removeHighlight() {
      document.getElementById('home').classList.remove("highlight")
      document.getElementById('users').classList.remove("highlight")
      document.getElementById('analysis').classList.remove("highlight")
      document.getElementById('aboutUs').classList.remove("highlight")
      document.getElementById('privacyPolicy').classList.remove("highlight")
    }
  }
}
</script>
<style scoped>
@import '../assets/componentStyles/navigationComponent.css';
</style>