<template>
    <footer>
        <div class="footerContainer">
            <img src="../assets/images/favicon.png" height="100">
            <h3>Comment-On-Your-Major</h3>
            <div class="footerLinksConatiner">
                <a @click="render('/aboutUs')">About Us</a>
                <a onclick="window.location.href = 'mailto:nikolaikim27@gmail.com'">Contact Us</a>
                <a @click="render('privacyPolicy')">Privacy Policy</a>
            </div>
            <b>2022 COYM. All Rights Reserved.</b>
        </div>
    </footer>
</template>
<script>
    export default {
  name: 'FooterComponent',
  methods: {
    render(page) {
      this.$router.push(page)
    }
  }
}
</script>
<style scoped>
@import '../assets/componentStyles/footerComponent.css';
</style>