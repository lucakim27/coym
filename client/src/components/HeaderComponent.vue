<script>
import ModalComponent from './ModalComponent.vue'
import { useCookies } from "vue3-cookies"
import io from 'socket.io-client'

export default {
    name: 'HeaderComponent',
    components: {
        ModalComponent
    },
    data() {
        return {
            username: '',
            loggedIn: false,
            showModal: false,
            socket: io('localhost:3001', { transports: ['websocket'] })
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    mounted() {
        let user = this.cookies.get("user")
        if (user !== null) {
            this.username = this.cookies.get("user").username
            this.loggedIn = true
            this.socket.emit('join', this.username)
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
<template>
    <div id="headerContainer">
        <header>
            <span v-on:click="sidebarOpen()">&#9776;</span>
            <div v-if='!loggedIn && username.length === 0' id="userId">
                <a href="/login" v-if="getTitle !== 'LOGIN' && getTitle !== 'REGISTER'">Sign in</a>
            </div>
            <h1>{{ getTitle }}</h1>
            <svg v-if='loggedIn && username.length !== 0' @click="showModal = true"
                style="cursor: pointer; position: absolute; right: 15px; top: 10px" xmlns="http://www.w3.org/2000/svg"
                width="44" height="44" fill="black" class="bi bi-person-circle" viewBox="0 0 16 16">
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
<style scoped>
#headerContainer {
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgb(255, 255, 255);
    height: 70px;
    color: black;
    text-align: center;
    z-index: 99999999999999999 !important;
}

#userId {
    margin-right: -90px;
    position: absolute;
    right: 100px;
    background-color: rgb(255, 255, 255);
    font-family: Arial;
    top: 15px;
    width: 100px;
    height: 40px;
    cursor: pointer;
    font-size: 30px;
}

header {
    height: 10px
}

header div a {
    text-decoration: none;
    color: black;
}

header div a:hover {
    color: rgb(0, 136, 255);
}

header span {
    font-size: 40px;
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 10px;
}

header h1 {
    font-family: fantasy;
    margin-top: 5px;
    font-size: 45px;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
}
</style>