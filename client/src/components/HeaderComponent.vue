<template>
    <div id="headerContainer">
        <header>
            <span v-on:click="sidebarOpen()">&#9776;</span>
            <svg class='signInIcon' @click="this.showModal = true" v-if="loginIconShow" height='40' width="40"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" />
                </g>
            </svg>
            <h2 @click="renderPages('/')">COYM</h2>
            <div class="dropdown">
                <svg v-if="profileIconShow" @click.prevent="toggleDropdown" class='profileSVG'
                    xmlns="http://www.w3.org/2000/svg" width="35" height="44" fill="black" viewBox="0 0 16 16">
                    <path class="profileSVGPath" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path class="profileSVGPath" fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                <div id='profileDropdown' class="dropdown-content">
                    <a class="dropdownUsername" @click="renderProfile(username)" v-if="username !== null">{{ username
                    }}</a>
                    <a class="username" v-if="username === null"> Anonymous </a>
                    <a @click="renderPages('/setting')">Setting</a>
                    <a @click="renderPages('/request')">Request</a>
                    <a @click='logout()' class="signOutBtn">Sign out</a>
                </div>
            </div>
        </header>
        <div>
            <Modal v-show="showModal" @close-modal="showModal = false" />
        </div>
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
            username: null,
            loginIconShow: false,
            profileIconShow: false,
            showModal: false
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
                    self.loginIconShow = false
                    self.profileIconShow = true
                } else {
                    self.loginIconShow = true
                    self.profileIconShow = false
                }
            })
        } else {
            self.loginIconShow = true
            self.profileIconShow = false
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
            document.getElementById('profileDropdown').style.height = '0'
            this.$router.push(page)
        },
        renderProfile(username) {
            if (new URL(window.location.href).pathname.slice(1, new URL(window.location.href).pathname.length).toUpperCase() !== 'PROFILE') {
                document.getElementById('profileDropdown').style.height = '0'
                this.$router.push('/profile?username=' + username)
            } else {
                window.location.href = '/profile?username=' + username
            }
        },
        toggleDropdown() {
            document.getElementById('profileDropdown').style.height = document.getElementById('profileDropdown').style.height === '320px' ? '0' : '320px'
        },
        profileDropdownClose(event) {
            if (!event.target.matches('.profileDropdown') && !event.target.matches('.profileSVG') && !event.target.matches('.profileSVGPath')) {
                document.getElementById('profileDropdown').style.height = '0'
            }
        },
        logout() {
            this.cookies.remove('user')
            window.location.reload()
        },
        sidebarOpen() {
            document.getElementById("mySidenav").style.width = "250px"
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/headerComponent.css';
</style>