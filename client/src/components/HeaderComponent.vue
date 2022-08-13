<template>
    <div id="headerContainer">
        <header v-if="getTitle !== 'LOGIN' && getTitle !== 'REGISTER'">
            <span v-on:click="sidebarOpen()">&#9776;</span>
            <svg class='signInIcon' @click="directToLogin()"
                v-if="!loggedIn" height='40' width="40"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" />
                </g>
            </svg>
            <h2>COYM</h2>
            <div class="dropdown">
                <svg v-if="loggedIn"
                    @click.prevent="toggleDropdown" class='profileSVG' xmlns="http://www.w3.org/2000/svg" width="35"
                    height="44" fill="black" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                <div id='profileDropdown' class="dropdown-content" v-show="state">
                    <a class="username dropdownUsername" v-bind:href="'/profile?username=' + username" v-if="username !== null">{{ username }}</a>
                    <a class="username" v-if="username === null"> Anonymous </a>
                    <a href="/setting">Setting</a>
                    <a href="/request">Request</a>
                    <a @click='logout()' class="signOutBtn">Sign out</a>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import { useCookies } from "vue3-cookies"
export default {
    name: 'HeaderComponent',
    props: ["pass_data"],
    data() {
        return {
            username: '',
            state: false
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    updated() {
        this.username = this.pass_data
    },
    beforeUnmount() {
        document.removeEventListener('click', this.close)
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    methods: {
        toggleDropdown() {
            this.state = !this.state
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.state = false
            }
        },
        directToLogin() {
            window.location.href = '/login'
        },
        logout() {
            this.cookies.remove('user')
            window.location.reload()
        },
        sidebarOpen() {
            document.getElementById("mySidenav").style.width = "250px"
        }
    },
    computed: {
        loggedIn() {
            if (this.username === '' || this.username === null) {
                return false
            } else {
                return true
            }
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
@import '../assets/componentStyles/headerComponent.css';
</style>