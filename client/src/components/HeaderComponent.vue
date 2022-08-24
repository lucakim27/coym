<template>
    <div id="mySidenav" class="sidenav">
        <hr>
        <div v-if="!loggedIn">
            <a @click="this.showSignInModal = true">Sign In</a>
            <hr>
            <a @click="this.showSignUpModal = true">Sign Up</a>
            <hr>
        </div>
        <div v-if="loggedIn">
            <a class="dropdownUsername" @click="renderProfile()">{{ username }}</a>
            <hr>
            <a class="settingLink" @click="renderPages('/setting')">Setting</a>
            <hr>
            <a class="requestLink" @click="renderPages('/request')">Request</a>
            <hr>
            <a @click='logout()' class="signOutBtn">Sign out</a>
            <hr>
        </div>
        <a @click="renderPages('/')">Home</a>
        <hr>
        <a @click="renderPages('/users')">Users</a>
        <hr>
        <a @click="renderPages('/analysis')">Analysis</a>
    </div>
    <div>
        <signInModal v-show="showSignInModal" @closeSignInModal="showSignInModal = false" />
        <signUpModal v-show="showSignUpModal" @closeSignUpModal="showSignUpModal = false" />
    </div>
    <div id="headerContainer">
        <header>
            <h2 @click="renderPages('/')">COYM</h2>
            <span v-if="sidebarOpenBtn" @click="sidebarOpen()" class="sidebarOpenBtn">&#9776;</span>
            <span v-if="sidebarCloseBtn" @click="sidebarClose()" class="sidebarCloseBtn">&times;</span>
        </header>
    </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
import signInModal from './signInModalComponent.vue'
import signUpModal from './signUpModalComponent.vue'
export default {
    name: 'HeaderComponent',
    components: { signInModal, signUpModal },
    data() {
        return {
            loggedIn: false,
            username: null,
            showSignInModal: false,
            showSignUpModal: false,
            sidebarOpenBtn: true,
            sidebarCloseBtn: false
        }
    },
    created() {
        let self = this
        if (self.cookies.get('user') !== null) {
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/cookieValidation",
                params: {
                    username: self.cookies.get("user").username,
                    password: self.cookies.get("user").password
                }
            }).then(function (response) {
                if (response.data.status) {
                    self.username = response.data.username
                    self.loggedIn = true
                }
            })
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.profileDropdownClose)
    },
    mounted() {
        document.addEventListener('click', this.profileDropdownClose)
    },
    methods: {
        renderPages(page) {
            document.getElementById("mySidenav").style.height = "0"
            this.sidebarCloseBtn = false
            this.sidebarOpenBtn = true
            window.scrollTo(0, 0)
            this.$router.push(page)
        },
        renderProfile() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getUserID",
                params: {
                    username: this.username
                }
            }).then(function (response) {
                if (response.data.status) {
                    if (document.URL.split('/').at(-2) === 'profile') {
                        window.location.href = '/profile/' + response.data.data.id.id
                    } else {
                        document.getElementById("mySidenav").style.height = "0"
                        self.sidebarCloseBtn = false
                        self.sidebarOpenBtn = true
                        window.scrollTo(0, 0)
                        self.$router.push('/profile/' + response.data.data.id.id)
                    }
                }
            })
        },
        profileDropdownClose(event) {
            if (!event.target.matches('#headerContainer') && !event.target.matches('.dropdownUsername') && !event.target.matches('.sidebarOpenBtn') && !event.target.matches('.sidebarCloseBtn') && !event.target.matches('.sidenav')) {
                document.getElementById("mySidenav").style.height = "0"
                this.sidebarCloseBtn = false
                this.sidebarOpenBtn = true
            }
        },
        logout() {
            this.cookies.remove('user')
            window.location.reload()
        },
        sidebarOpen() {
            this.sidebarOpenBtn = false
            this.sidebarCloseBtn = true
            document.getElementById("mySidenav").style.height = "320px"
        },
        sidebarClose() {
            this.sidebarCloseBtn = false
            this.sidebarOpenBtn = true
            document.getElementById("mySidenav").style.height = "0"
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/headerComponent.css';
</style>