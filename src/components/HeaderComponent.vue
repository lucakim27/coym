<template>
    <div id="mySidenav" class="sidenav"><br>
        <a @click="renderPages('/test')">Test</a><hr>
        <a @click="renderPages('/people')">User</a><hr>
        <a @click="renderPages('/chart')">Chart</a><hr>
        <a @click="renderPages('/search')">Course / Module</a><hr>
        <a @click="this.showModal = true" v-if="showLoginIcon">Sign In</a><hr v-if="showLoginIcon">
        <a v-if="showProfileIcon" @click="renderPages('/setting')">Setting</a><hr v-if="showProfileIcon">
        <a v-if="showProfileIcon" @click="renderPages('/request')">Request</a><hr v-if="showProfileIcon">
        <a v-if="showProfileIcon" @click="renderProfile()">Your Profile</a><hr v-if="showProfileIcon">
        <a v-if="showProfileIcon" @click='logout()'>Sign Out</a><hr v-if="showProfileIcon">
    </div>
    <div>
        <Modal v-show="showModal" @closeModal="showModal = false" />
    </div>
    <div id="headerContainer">
        <header class="header">
            <img @click="renderPages('/')" src="../assets/images/favicon.png" height="50" alt="">
            <input class="headerInput" id="headerInput" type="text" placeholder="Search by course..."
                @input="searchChangeFunc($event)">
            <table id="options" class="headerOptions">
                <tr v-for="major in filteredMajorsList" :key="major.id">
                    <td scope="row">
                        <a @click="renderComment(major.id)">{{  major.name  }}</a><br><br>
                    </td>
                </tr>
            </table>
            <span @click="sidebarOpen()" class="sidebarOpenBtn">&#9776;</span>
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
            majorsList: [],
            filteredMajorsList: null
        }
    },
    created() {
        this.cookieValidation()
        this.getMajorList()
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
    methods: {
        cookieValidation() {
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
        renderComment(id) {
            if (document.URL.split('/').at(-2) === 'comment') {
                window.location.href = '/comment/' + id
            } else {
                document.getElementById('headerInput').value = ''
                document.getElementById('options').style.display = 'none'
                this.$router.push('/comment/' + id)
                window.scrollTo(0, 0)
            }

        },
        searchChangeFunc(event) {
            this.filteredMajorsList = []
            if (event.target.value.length > 0) {
                for (let i = 0; i < this.majorsList.length; i++) {
                    if (this.majorsList[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                        this.filteredMajorsList.push(this.majorsList[i])
                    }
                }
                document.getElementById('options').style.display = 'block'
            } else {
                document.getElementById('options').style.display = 'none'
            }
        },
        getMajorList() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getMajorList"
            }).then(function (response) {
                if (response.data.status) {
                    response.data.message.forEach(key => {
                        self.majorsList.push({ name: key.name, id: key.id })
                        self.filteredMajorsList = self.majorsList
                    })
                }
            })
        },
        renderPages(page) {
            document.getElementById("mySidenav").style.height = "0"
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
                        document.getElementById("mySidenav").style.height = "0"
                        window.scrollTo(0, 0)
                        self.$router.push('/profile/' + response.data.data.id.id)
                    }
                }
            })
        },
        profileDropdownClose(event) {
            if (!event.target.matches('.loginBtn') && !event.target.matches('.headerCommentsSelect') && !event.target.matches('.headerComments') && !event.target.matches('.dropdownUsername') && !event.target.matches('.sidebarOpenBtn') && !event.target.matches('.sidebarCloseBtn') && !event.target.matches('.sidenav')) {
                document.getElementById("mySidenav").style.height = "0"
            }
        },
        logout() {
            this.cookies.remove('user')
            window.location.reload()
        },
        sidebarOpen() {
            document.getElementById("mySidenav").style.height = document.getElementById("mySidenav").style.height === '100%' ?  '0' : '100%' 
        }
    }
}
</script>
<style scoped>
@import '../assets/componentStyles/headerComponent.css';
</style>