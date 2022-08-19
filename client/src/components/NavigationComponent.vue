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
  mounted() {
    if (this.getTitle() === 'HOME') {
      document.getElementById('home').classList.toggle("highlight")
    } else if (this.getTitle() === 'USERS') {
      document.getElementById('users').classList.toggle("highlight")
    } else if (this.getTitle() === 'ANALYSIS') {
      document.getElementById('analysis').classList.toggle("highlight")
    } else if (this.getTitle() === 'ABOUTUS') {
      document.getElementById('aboutUs').classList.toggle("highlight")
    } else if (this.getTitle() === 'PRIVACYPOLICY') {
      document.getElementById('privacyPolicy').classList.toggle("highlight")
    }
  },
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
    },
    getTitle() {
            if (new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length) === '') {
                return 'HOME'
            } else if (new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length) === 'comment') {
                var query = window.location.search.substring(1)
                var vars = query.split('&')
                var returnValue = ''
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=')
                    if (pair.length !== 1) {
                        for (var j = 0; j < pair.length; j++) {
                            if (pair[j] !== 'major') {
                                returnValue += pair[j]
                            }
                        }
                    } else {
                        returnValue += pair[0]
                    }
                }
                return decodeURIComponent(returnValue)
            } else {
                return new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length).toUpperCase()
            }
        }
  }
}
</script>
<style scoped>
@import '../assets/componentStyles/navigationComponent.css';
</style>