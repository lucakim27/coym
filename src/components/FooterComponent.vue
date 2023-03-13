<template>
    <div class="footer">
        <footer>
            <div class="footerContainer">
                <img src="../assets/images/favicon.png" height="100">
                <h2>CommentOnYourMajor</h2>
                <div class="footerLinksConatiner">
                    <svg class="githubSVG" @click="directToGithub()" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" fill="white" data-v-32d57a20=""><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" data-v-32d57a20=""></path></svg>
                    <svg class="instagramSVG" @click="directToInstagram()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="32px" height="32px" viewBox="0 0 551.034 551.034" xml:space="preserve" data-v-32d57a20=""><g id="XMLID_13_" data-v-32d57a20=""><linearGradient id="XMLID_2_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)" data-v-32d57a20=""><stop offset="0" style="stop-color:#E09B3D;" data-v-32d57a20=""></stop><stop offset="0.3" style="stop-color:#C74C4D;" data-v-32d57a20=""></stop><stop offset="0.6" style="stop-color:#C21975;" data-v-32d57a20=""></stop><stop offset="1" style="stop-color:#7024C4;" data-v-32d57a20=""></stop></linearGradient><path id="XMLID_17_" style="fill:url(#XMLID_2_);" d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722   c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156   C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156   c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722   c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z" data-v-32d57a20=""></path><linearGradient id="XMLID_3_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)" data-v-32d57a20=""><stop offset="0" style="stop-color:#E09B3D;" data-v-32d57a20=""></stop><stop offset="0.3" style="stop-color:#C74C4D;" data-v-32d57a20=""></stop><stop offset="0.6" style="stop-color:#C21975;" data-v-32d57a20=""></stop><stop offset="1" style="stop-color:#7024C4;" data-v-32d57a20=""></stop></linearGradient><path id="XMLID_81_" style="fill:url(#XMLID_3_);" d="M275.517,133C196.933,133,133,196.933,133,275.516   s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6   c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083   C362.6,323.611,323.611,362.6,275.517,362.6z" data-v-32d57a20=""></path><linearGradient id="XMLID_4_" gradientUnits="userSpaceOnUse" x1="418.306" y1="4.5714" x2="418.306" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)" data-v-32d57a20=""><stop offset="0" style="stop-color:#E09B3D;" data-v-32d57a20=""></stop><stop offset="0.3" style="stop-color:#C74C4D;" data-v-32d57a20=""></stop><stop offset="0.6" style="stop-color:#C21975;" data-v-32d57a20=""></stop><stop offset="1" style="stop-color:#7024C4;" data-v-32d57a20=""></stop></linearGradient><circle id="XMLID_83_" style="fill:url(#XMLID_4_);" cx="418.306" cy="134.072" r="34.149" data-v-32d57a20=""></circle></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g><g data-v-32d57a20=""></g></svg>
                </div>
                <div class="footerLinksConatiner" v-if="!isMobile()">
                    <a @click="render('/aboutUs')">About Us</a><br><br>
                    <a @click="render('privacyPolicy')">Privacy Policy</a><br><br>
                    <a @click="render('/termsAndConditions')">Terms & Conditions</a>
                </div>
                <div class="footerLinksConatiner footerLinksMoblieContainer" v-if="isMobile()">
                    <a @click="render('/aboutUs')">About Us</a><br><br>
                    <a @click="render('/privacyPolicy')">Privacy Policy</a><br><br>
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
        directToGithub() {
            window.location.href = 'https://github.com/lucakim27/coym'
        },
        directToInstagram() {
            window.location.href = 'https://www.instagram.com/commentonyourmajor/'
        },
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