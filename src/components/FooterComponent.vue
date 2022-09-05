<template>
    <div class="footer">
        <footer>
            <div class="footerContainer">
                <img src="../assets/images/favicon.png" height="100">
                <h3>Comment-On-Your-Major</h3>
                <div class="footerLinksConatiner" v-if="!isMobile()">
                    <a @click="render('/aboutUs')">About Us</a>
                    <a @click="render('privacyPolicy')">Privacy Policy</a><br>
                    <a @click="render('/termsAndConditions')">Terms & Conditions</a>
                </div>
                <div class="footerLinksConatiner footerLinksMoblieContainer" v-if="isMobile()">
                    <a @click="render('/aboutUs')">About Us</a><br>
                    <a @click="render('/privacyPolicy')">Privacy Policy</a><br>
                    <a @click="render('/termsAndConditions')">Terms & Conditions</a>
                </div><br>
                <b>{{ getCurrentYear }} COYM - All Rights Reserved.</b>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'FooterComponent',
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
        render(page) {
            this.$router.push(page)
            window.scrollTo(0,0)
        }
    },
    computed: {
        getCurrentYear() {
            return new Date().getFullYear()
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/footerComponent.css';
</style>