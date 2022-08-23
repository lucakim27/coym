<template>
    <div class="modal-overlay" @click="$emit('closeSignInModal')">
        <div class="modal" @click.stop v-if="!isMobile()">
            <div class="loginContainer">
                <form class="loginForm" method="get" @submit.prevent="signIn">
                    <h1>Sign In</h1>
                    <input class="loginInput" type="text" name="username" v-model="loginUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="loginInput" type="password" name="password" v-model="loginPassword"
                        placeholder="Password..." required /><br /><br />
                    <button class="loginButton signInBtn" type="submit" value="login">Sign In</button><br><br>
                    <button class='goBackBtn loginButton' type="button" @click="$emit('closeSignInModal')"><svg
                            xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                        </svg></button>
                </form>
            </div>
        </div>
        <div class="modal mobileModal" @click.stop v-if="isMobile()">
            <div class="loginContainer">
                <form class="loginForm mobileLoginForm" method="get" @submit.prevent="signIn">
                    <h1>Sign In</h1>
                    <input class="loginInput" type="text" name="username" v-model="loginUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="loginInput" type="password" name="password" v-model="loginPassword"
                        placeholder="Password..." required /><br /><br />
                    <button class="loginButton signInBtn" type="submit" value="login">Sign In</button><br><br>
                    <button class='goBackBtn loginButton' type="button" @click="$emit('closeSignInModal')"><svg
                            xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                        </svg></button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
    name: 'ModalComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    data() {
        return {
            loginUsername: '',
            loginPassword: ''
        }
    },
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
        signIn() {
            const self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/signIn",
                params: {
                    username: this.loginUsername,
                    password: this.loginPassword
                }
            }).then(function (response) {
                if (response.data.status) {
                    self.$cookies.set("user", { username: self.loginUsername, password: self.loginPassword })
                    window.location.href = "/"
                } else {
                    alert(response.data.message)
                }
            })
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/modalComponent.css';
</style>