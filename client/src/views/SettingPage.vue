<template>
    <div class='mainContainer' v-if="!isMobile()">
            <div class="twoContainer passwordContainer">
                <div class="eachContainer">
                    <h3>School</h3>
                    <input type="text" placeholder="Your school..." v-model="school">
                </div>
                <div class="eachContainer">
                    <h3>Gender</h3>
                    <input type="text" placeholder="Your gender..." v-model="gender">
                </div>
            </div>
            <div class="twoContainer passwordContainer">
                <div class="eachContainer">
                    <h3>Major</h3>
                    <input type="text" placeholder="Your major..." v-model="major">
                </div>
                <div class="eachContainer">
                    <h3>Country</h3>
                    <input type="text" placeholder="Your country..." v-model="country">
                </div>
            </div>
            <div class="twoContainer passwordContainer">
                <div class="eachContainer">
                    <h3>Password (*)</h3>
                    <input type="password" placeholder="Your password..." v-model="password">
                </div>
                <div class="eachContainer">
                    <h3>Password Confirm (*)</h3>
                    <input type="password" placeholder="Your password confirm..." v-model="passwordConfirm">
                </div>
            </div>
            <div class="btnContainer">
                <button @click="updateUserDetails">Update</button>
            </div>
    </div>
    <div v-if="isMobile()">
        <div class='backgroundContainer mobileContainer'>
            <div class="eachContainer">
                <h3>School</h3>
                <div class="centerChild">
                    <input type="text" placeholder="Your school..." v-model="school">
                </div>
            </div>
            <div class="eachContainer">
                <h3>Gender</h3>
                <div class="centerChild">
                    <input type="text" placeholder="Your gender..." v-model="gender">
                </div>
            </div>
            <div class="eachContainer">
                <h3>Major</h3>
                <div class="centerChild">
                    <input type="text" placeholder="Your major..." v-model="major">
                </div>
            </div>
            <div class="eachContainer">
                <h3>Country</h3>
                <div class="centerChild">
                    <input type="text" placeholder="Your country..." v-model="country">
                </div>
            </div>
            <div class="eachContainer">
                <h3>Password (*)</h3>
                <div class="centerChild">
                    <input type="password" placeholder="Your password..." v-model="password">
                </div>
            </div>
            <div class="eachContainer">
                <h3>Password Confirm (*)</h3>
                <div class="centerChild">
                    <input type="password" placeholder="Your password confirm..." v-model="passwordConfirm">
                </div>
            </div>
            <div class="btnContainer">
                <button @click="updateUserDetails">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
    name: 'SettingPage',
    data() {
        return {
            username: '',
            country: '',
            major: '',
            school: '',
            gender: '',
            password: '',
            passwordConfirm: ''
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    beforeMount() {
        let user = this.cookies.get("user")
        if (user !== null) {
            this.username = this.cookies.get("user").username
        }
        const self = this
        if (this.username !== '') {
            axios({
                method: "GET",
                // url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getUserDetails",
                url: "http://localhost:3000/getUserDetails",
                params: { username: this.username }
            }).then(function (response) {
                self.country = response.data.userDetails.country === null ? '' : response.data.userDetails.country
                self.major = response.data.userDetails.major === null ? '' : response.data.userDetails.major
                self.school = response.data.userDetails.school === null ? '' : response.data.userDetails.school
                self.gender = response.data.userDetails.gender === null ? '' : response.data.userDetails.gender
            })
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
        updateUserDetails() {
            if (this.username === '') {
                alert("You're not logged in.")
            } else if (this.password === '') {
                alert("Password is compulsory.")
            } else if (this.password !== this.passwordConfirm) {
                alert('Password is not matching')
            } else {
                axios({
                    method: "POST",
                    // url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/updateUserDetails",
                    url: "http://localhost:3000/updateUserDetails",
                    headers: { 'Content-Type': 'application/json' },
                    data: { username: this.username, country: this.country, major: this.major, school: this.school, gender: this.gender, password: this.password }
                }).then(function (response) {
                    if (!response.data.status) {
                        alert(response.data.message)
                    } else {
                        alert(response.data.message)
                        window.location.reload()
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
@import '../assets/styles/setting.css';
</style>