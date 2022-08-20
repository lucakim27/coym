<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop v-if="!isMobile()">
            <div class="loginContainer" v-if="login">
                <form class="loginForm" method="get" @submit.prevent="signIn">
                    <h1>Sign In</h1>
                    <input class="loginInput" type="text" name="username" v-model="loginUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="loginInput" type="password" name="password" v-model="loginPassword"
                        placeholder="Password..." required /><br /><br />
                    <button class="loginButton signInBtn" type="submit" value="login">Sign In</button><br><br>
                    <button class="loginButton" type="button" @click="directToSignUp()">Sign Up</button><br><br>
                    <button class='goBackBtn loginButton' type="button" @click="$emit('close-modal')"><svg
                            xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                        </svg></button>
                </form>
            </div>
            <div class="registerContainer" v-if="register">
                <form class="registerForm" method="post" @submit.prevent="signUp">
                    <h1>Sign Up</h1>
                    <p class="regitserParagraph">* Longer than 7 characters without any spaces.</p>
                    <input class="registerInput" type="text" name="username" v-model="registerUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="registerInput" type="password" name="password" v-model="registerPassword"
                        placeholder="Password..." required /><br /><br />
                    <input class="registerInput" type="password" name="repassword" v-model="registerPasswordConfirm"
                        placeholder="Password Confirm..." required /><br /><br />
                    <button class="registerButton" type="submit" value="register">Sign Up</button><br><br>
                    <button class='registerButton goBackRegisterBtn' type="button" @click="directToSignIn()"><svg
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
            <div class="loginContainer" v-if="login">
                <form class="loginForm mobileLoginForm" method="get" @submit.prevent="signIn">
                    <h1>Sign In</h1>
                    <input class="loginInput" type="text" name="username" v-model="loginUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="loginInput" type="password" name="password" v-model="loginPassword"
                        placeholder="Password..." required /><br /><br />
                    <button class="loginButton signInBtn" type="submit" value="login">Sign In</button><br><br>
                    <button class="loginButton" type="button" @click="directToSignUp()">Sign Up</button><br><br>
                    <button class='goBackBtn loginButton' type="button" @click="$emit('close-modal')"><svg
                            xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                        </svg></button>
                </form>
            </div>
            <div class="registerContainer" v-if="register">
                <form class="registerForm mobileRegisterForm" method="post" @submit.prevent="signUp">
                    <h1>Sign Up</h1>
                    <p class="regitserParagraph">* Longer than 7 characters without any spaces.</p>
                    <input class="registerInput" type="text" name="username" v-model="registerUsername"
                        placeholder="Username..." required /><br /><br />
                    <input class="registerInput" type="password" name="password" v-model="registerPassword"
                        placeholder="Password..." required /><br /><br />
                    <input class="registerInput" type="password" name="repassword" v-model="registerPasswordConfirm"
                        placeholder="Password Confirm..." required /><br /><br />
                    <button class="registerButton" type="submit" value="register">Sign Up</button><br><br>
                    <button class='registerButton goBackRegisterBtn' type="button" @click="directToSignIn()"><svg
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
    name: 'LoginModalComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    data() {
        return {
            login: true,
            regitser: false,
            loginUsername: '',
            loginPassword: '',
            registerUsername: '',
            registerPassword: '',
            registerPasswordConfirm: ''
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
        directToSignIn() {
            this.login = true
            this.register = false
        },
        directToSignUp() {
            this.login = false
            this.register = true
        },
        signIn() {
            const self = this
            axios({
                method: "GET",
                url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/signIn",
                // url: "http://localhost:3000/signIn",
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
        },
        signUp() {
            const self = this
            axios({
                method: "POST",
                url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/signUp",
                // url: "http://localhost:3000/signUp",
                headers: { 'Content-Type': 'application/json' },
                data: { username: this.registerUsername, password: this.registerPassword, passwordConfirm: this.registerPasswordConfirm }
            }).then(function (response) {
                if (!response.data.status) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                    self.directToSignIn()
                }
            })
        },
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/modalComponent.css';
</style>