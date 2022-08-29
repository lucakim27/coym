<template>
    <div id="mySidenav" class="sidenav"><br>
        <a @click="renderPages('/chart')">Chart</a>
        <hr>
        <a @click="renderPages('/people')">People</a>
        <hr>
        <div v-if="showLoginIcon">
            <a class="loginBtn" @click="this.showModal = true">Login</a>
        </div>
        <div v-if="showProfileIcon">
            <a @click="renderProfile()">Profile</a>
            <hr>
            <a @click="renderPages('/setting')">Setting</a>
            <hr>
            <a @click="renderPages('/request')">Request</a>
            <hr>
            <a @click='logout()' class="signOutBtn">Sign Out</a>    
        </div>
    </div>
    <div>
        <Modal v-show="showModal" @closeModal="showModal = false" />
    </div>
    <div id="headerContainer">
        <header>
            <img @click="renderPages('/')" src="../assets/images/favicon.png" height="50" alt="">
            <span v-if="sidebarOpenBtn" @click="sidebarOpen()" class="sidebarOpenBtn">&#9776;</span>
            <span v-if="sidebarCloseBtn" @click="sidebarClose()" class="sidebarCloseBtn">&times;</span>
        </header>
    </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
import Modal from './ModalComponent.vue'
export default {
    name: 'HeaderComponent',
    components: { Modal },
    data() {
        return {
            showLoginIcon: false,
            showProfileIcon: false,
            username: null,
            showModal: false,
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
                    self.showLoginIcon = false
                    self.showProfileIcon = true
                } else {
                    self.showProfileIcon = false
                    self.showLoginIcon = true      
                }
            })
        } else {
            self.showProfileIcon = false
            self.showLoginIcon = true
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
        onChange() {
            if (document.URL.split('/').at(-2) === 'comment') {
                window.location.href = '/comment/' + this.selectedOption
            } else {
                document.getElementById("mySidenav").style.height = "0"
                this.sidebarCloseBtn = false
                this.sidebarOpenBtn = true
                window.scrollTo(0, 0)
                this.$router.push('/comment/' + this.selectedOption)
            }
        },
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
            if (!event.target.matches('.loginBtn') && !event.target.matches('.headerCommentsSelect') && !event.target.matches('.headerComments') && !event.target.matches('.dropdownUsername') && !event.target.matches('.sidebarOpenBtn') && !event.target.matches('.sidebarCloseBtn') && !event.target.matches('.sidenav')) {
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
            document.getElementById("mySidenav").style.height = "100%"
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