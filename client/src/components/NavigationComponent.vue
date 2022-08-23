<template>
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="sidebarClose()">&times;</a>
    <a @click="render('/')">Home</a>
    <a @click="render('/users')">Users</a>
    <a @click="render('/analysis')">Analysis</a>
  </div>
</template>
<script>
export default {
  name: 'NavigationComponent',
  methods: {
    render(page) {
      this.$router.push(page)
      this.sidebarClose()
    },
    sidebarClose () {
      document.getElementById("mySidenav").style.width = "0"
    }
  }
}
</script>
<style scoped>
@import '../assets/componentStyles/navigationComponent.css';
</style>