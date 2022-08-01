<template>
    <div class='mainContainer'>
        <div class='backgroundContainer'>        
            <div class="twoContainer">
                <div class="eachContainer">   
                    <h3>Username</h3>
                    <input type="text" placeholder="Your username..." v-model="username">
                </div>
                <div class="eachContainer">
                    <h3>Gender</h3>
                    <input type="text" placeholder="Your gender..." v-model="gender">
                </div>
            </div>
            <div class="twoContainer">
                <div class="eachContainer">
                    <h3>Major</h3>
                    <input type="text" placeholder="Your major..." v-model="major">
                </div>
                <div class="eachContainer">
                    <h3>Country</h3>
                    <input type="text" placeholder="Your country..." v-model="country">
                </div>
            </div>
            <div class="twoContainer">
                <div class="eachContainer">
                    <h3>School</h3>
                    <input type="text" placeholder="Your school..." v-model="school">
                </div>
                <div class="eachContainer">
                    <h3>Password (compulsory)</h3>
                    <input type="text" placeholder="Your password...">
                </div>
            </div>
            <div class="btnContainer">
                <button>Update</button>
            </div>
            <div class="deleteContainer">
                <button>Delete Account</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
    name: 'SettingsPage',
    data() {
        return {
            username: '',
            country: '',
            major: '',
            school: '',
            gender: ''
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
        }
        axios({
            method: "GET",
            url: "http://localhost:3000/getUserDetails",
            params: { username: this.username }
        }).then(function (response) {
            console.log(response.data.userDetails)
        })
    }
}
</script>
<style scoped>
@import '../assets/styles/settings.css';
</style>