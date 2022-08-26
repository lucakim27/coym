<template>
    <div id="mySidenav" class="sidenav"><br>
        <a @click="renderPages('/')">Home</a>
        <hr>
        <a @click="renderPages('/users')">Users</a>
        <hr>
        <a @click="renderPages('/analysis')">Analysis</a>
        <hr>
        <a class="headerComments">
            Comments
            <select @change="onChange()" v-model="selectedOption" class="headerCommentsSelect">
                <option v-for="option in majorsList" :value="option.id" :key="option.id">{{ option.name }}</option>
            </select>
        </a>
        <hr>
    </div>
    <div id="mySidenav2" class="sidenav2"><br>
        <a @click="renderProfile()">{{ username }}'s Profile</a>
        <hr>
        <a @click="renderPages('/setting')">Setting</a>
        <hr>
        <a @click="renderPages('/request')">Request</a>
        <hr>
        <a @click='logout()'>Sign Out</a>
        <hr>
    </div>
    <div>
        <Modal v-show="showModal" @closeModal="showModal = false" />
    </div>
    <div id="headerContainer">
        <header>
            <img @click="renderPages('/')" src="../assets/images/favicon.png" height="50" alt="">
            <svg class='signInIcon' v-if="showLoginIcon" @click="this.showModal = true" height='40' width="40"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" />
                </g>
            </svg>
            <svg v-if="showProfileIcon" @click.prevent="sidebarOpen2()" class='profileSVG' xmlns="http://www.w3.org/2000/svg"
                width="35" height="44" fill="white" viewBox="0 0 16 16">
                <path class="profileSVGPath" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path class="profileSVGPath" fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
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
            sidebarCloseBtn: false,
            majorsList: [],
            selectedOption: null
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
    beforeMount() {
        let self = this
        axios({
            method: "GET",
            url: process.env.VUE_APP_ROOT_API + "/getMajorList"
        }).then(function (response) {
            if (response.data.status) {
                response.data.message.forEach(key => {
                    self.majorsList.push({ name: key.name, id: key.id })
                })
            }
        })
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
            document.getElementById("mySidenav2").style.height = "0"
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
                        document.getElementById("mySidenav2").style.height = "0"
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
            if (!event.target.matches('.headerCommentsSelect') && !event.target.matches('.headerComments') && !event.target.matches('.dropdownUsername') && !event.target.matches('.sidebarOpenBtn') && !event.target.matches('.sidebarCloseBtn') && !event.target.matches('.sidenav')) {
                document.getElementById("mySidenav").style.height = "0"
                this.sidebarCloseBtn = false
                this.sidebarOpenBtn = true
            }
            if (!event.target.matches('.profileSVG') && !event.target.matches('.profileSVGPath') && !event.target.matches('.sidenav2')) {
                document.getElementById("mySidenav2").style.height = "0"
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
        },
        sidebarOpen2() {
            if (document.getElementById("mySidenav2").style.height === "100%") {
                document.getElementById("mySidenav2").style.height = "0"
            } else {
                document.getElementById("mySidenav2").style.height = "100%"
            }
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/headerComponent.css';
</style>