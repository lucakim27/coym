<template>
    <div id="headerContainer">
        <header>
            <span v-on:click="sidebarOpen()">&#9776;</span>
            <div v-if='!loggedIn && username.length === 0' id="userId">
                <a href="/login" id="signIn">Sign in</a>
            </div>
            <svg v-if='loggedIn && username.length !== 0'
                style="cursor: pointer; position: absolute; right: 15px; top: 10px" data-toggle="modal"
                data-target="#myModal" xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="black"
                class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
        </header>
    </div>
</template>
<script>
import { useCookies } from "vue3-cookies"

export default {
    name: 'HeaderComponent',
    data() {
        return {
            username: '',
            loggedIn: false
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    mounted() {
        let user = this.cookies.get("user")
        if (user !== undefined) {
            this.username = this.cookies.get("user").username
            this.loggedIn = true
        }
    },
    methods: {
        sidebarOpen: function () {
            document.getElementById("mySidenav").style.width = "250px"
        }
    }
}
</script>
<style scoped>
#headerContainer {
position: fixed;
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
    font-family: fantasy;
    top: 15px;
    width: 100px;
    height: 40px;
    cursor: pointer;
    font-size: 30px;
}

header {
    height: 10px
}

header span {
    font-size: 40px;
    cursor: pointer;
    position: absolute;
    left: 15px; 
    top: 10px;
    /* color: white; */
}

header 

header h1 {
    margin-left: auto;
    margin-right: auto;
}
</style>