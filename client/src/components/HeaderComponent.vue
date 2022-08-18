<template>
    <div id="headerContainer">
        <header>
            <span v-on:click="sidebarOpen()">&#9776;</span>
            <svg class='signInIcon' @click="directToLogin()" v-if="loginIconShow" height='40' width="40"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" />
                </g>
            </svg>
            <h2>COYM</h2>
            <div class="dropdown">
                <svg v-if="profileIconShow" @click.prevent="toggleDropdown" class='profileSVG'
                    xmlns="http://www.w3.org/2000/svg" width="35" height="44" fill="black" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                <div id='profileDropdown' class="dropdown-content">
                    <a class="username dropdownUsername" @click="renderProfile(username)"
                        v-if="username !== null">{{ username }}</a>
                    <a class="username" v-if="username === null"> Anonymous </a>
                    <a @click="renderSetting()">Setting</a>
                    <a @click="renderRequest()">Request</a>
                    <a @click='logout()' class="signOutBtn">Sign out</a>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
    name: 'HeaderComponent',
    data() {
        return {
            username: null,
            state: false,
            loginIconShow: false,
            profileIconShow: false
        }
    },
    created() {
        let self = this
        if (self.cookies.get('user') !== null) {
            axios({
                method: "GET",
                url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/cookieValidation",
                // url: "http://localhost:3000/cookieValidation",
                params: {
                    username: self.cookies.get("user").username,
                    password: self.cookies.get("user").password
                }
            }).then(function (response) {
                if (response.data.status) {
                    self.username = response.data.username
                    self.loggedIn()
                }
            })
        } else {
            self.loggedIn()
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.close)
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    methods: {
        renderSetting() {
            document.getElementById('profileDropdown').style.height = '0'
            this.$router.push('/setting')
        },
        renderRequest() {
            document.getElementById('profileDropdown').style.height = '0'
            this.$router.push('/request')
        },
        renderProfile(username) {
            if (this.getTitle === 'PROFILE') {
                window.location.href = '/profile?username=' + username
            } else {
                document.getElementById('profileDropdown').style.height = '0'
                this.$router.push('/profile?username=' + username)
            }
        },
        toggleDropdown() {
            if (document.getElementById('profileDropdown').style.height === '320px') {
                document.getElementById('profileDropdown').style.height = '0'
            } else {
                document.getElementById('profileDropdown').style.height = '320px'
            }
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                document.getElementById('profileDropdown').style.height = '0'
            }
        },
        directToLogin() {
            this.$router.push('/login')
        },
        logout() {
            this.cookies.remove('user')
            window.location.reload()
        },
        sidebarOpen() {
            document.getElementById("mySidenav").style.width = "250px"
        },
        loggedIn() {
            if (this.username === null) {
                this.loginIconShow = true
            } else {
                this.profileIconShow = true
            }
        },
    },
    computed: {
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
@import '../assets/componentStyles/headerComponent.css';
</style>