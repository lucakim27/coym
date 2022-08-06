<template>
    <div id="headerContainer">
        <header>
            <span v-if="getTitle !== 'LOGIN' && getTitle !== 'REGISTER'" v-on:click="sidebarOpen()">&#9776;</span>
            <div v-if='!loggedIn' id="userId">
                <a href="/login" v-if="getTitle !== 'LOGIN' && getTitle !== 'REGISTER'"><svg height='40' width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"/> </g> </svg></a>
            </div>
            <h1 v-if="getTitle !== 'LOGIN' && getTitle !== 'REGISTER'">{{ getTitle }}</h1>
            <svg v-if='loggedIn' @click="showModal = true" class='profileSVG' xmlns="http://www.w3.org/2000/svg"
                width="44" height="44" fill="black" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
        </header>
    </div>
    <div>
        <transition name="modal">
            <ModalComponent v-if="showModal" @close="showModal = false">
                <!-- <template v-slot:header>
                    <h3>User Profile</h3>
                    <span @closeModal="showModal = false">&times;</span>
                </template> -->
            </ModalComponent>
        </transition>
    </div>
</template>
<script>
import ModalComponent from './ModalComponent.vue'
import { useCookies } from "vue3-cookies"
// import io from 'socket.io-client'
import axios from 'axios'

export default {
    name: 'HeaderComponent',
    components: {
        ModalComponent
    },
    data() {
        return {
            loggedIn: false,
            showModal: false,
            // socket: io('http://localhost:3001', {
            //     transports: ['websocket']
            // })
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    beforeMount() {
        let self = this
        if (self.cookies.get('user') !== null) {
            axios({
                method: "GET",
                url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/cookieValidation",
                params: {
                    username: self.cookies.get("user").username,
                    password: self.cookies.get("user").password
                }
            }).then(function (response) {
                if (response.data.status) {
                    self.loggedIn = response.data.status
                    // self.socket.emit('join', response.data.username)
                }
            })
        }
    },
    methods: {
        sidebarOpen() {
            document.getElementById("mySidenav").style.width = "250px"
        },
        closeModal() {
            this.showModal = false
        }
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