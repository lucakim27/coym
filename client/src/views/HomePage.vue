<template>
    <div class='homeContainer'>
        <div class="homeLoader" v-if="isLoading">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
        <img v-show="isLoaded" @load="loaded" :style='mobileImg' src='../assets/images/main.jpg' class="mainImage">
        <div class="homeInput" :style="mobileInput">
            <input v-if="isMobile()" class="homeInputText mobileHomeInput" id="input" placeholder="Search for your major..."
                type="search" @input="searchChangeFunc($event)" />
            <input v-if="!isMobile()" class="homeInputText" id="input" placeholder="Search for your major..." type="search"
                @input="searchChangeFunc($event)" />
            <table id="options" class="mobileHomeOptions homeOptions" v-if="isMobile()">
                <tr v-for="(major, i) in filteredMajorsList" :key="i">
                    <td scope="row">
                        <a @click="renderComment(major)">{{ major }}</a>
                        <br>
                    </td>
                </tr>
            </table>
            <table id="options" class="homeOptions" v-if="!isMobile()">
                <tr v-for="(major, i) in filteredMajorsList" :key="i">
                    <td scope="row">
                        <a @click="renderComment(major)">{{ major }}</a>
                        <br>
                    </td>
                </tr>
            </table>
        </div>
        <div class='homeDescriptionContainer' :style="mobileDescription">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-house"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                    <path fill-rule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-people" viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-chat-text" viewBox="0 0 16 16">
                    <path
                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    <path
                        d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                    <path
                        d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-text-paragraph" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-mailbox" viewBox="0 0 16 16">
                    <path
                        d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                    <path
                        d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                </svg>
            </div>
            <b class="homeDescriptionExplanation">A college major commenting website where you would tremendously benefit from.</b><br>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'HomePage',
    components: {
        PulseLoader
    },
    data() {
        return {
            magic_flag: false,
            majorsList: [],
            filteredMajorsList: [],
            isLoaded: false,
            isLoading: false
        }
    },
    methods: {
        renderComment(major) {
            this.$router.push('/comment?major=' + major)
        },
        loaded() {
            this.isLoaded = true
            this.isLoading = false
        },
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
        searchChangeFunc(event) {
            this.filteredMajorsList = []
            if (event.target.value.length > 0) {
                for (let i = 0; i < this.majorsList.length; i++) {
                    if (this.majorsList[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                        this.filteredMajorsList.push(this.majorsList[i])
                    }
                }
                document.getElementById('options').style.display = 'block'
            } else {
                document.getElementById('options').style.display = 'none'
            }
        }
    },
    beforeMount() {
        let self = this
        axios({
            method: "GET",
            url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getMajorList"
            // url: "http://localhost:3000/getMajorList",
        }).then(function (response) {
            if (response.data.status) {
                response.data.message.forEach(key => {
                    self.majorsList.push(key.name)
                })
            }
        })
    },
    computed: {
        mobileImg() {
            if (this.isMobile()) {
                return 'height: 20% !important;'
            } else {
                return 'height: 650px !important;'
            }
        },
        imageSrc() {
            if (this.isMobile()) {
                return 'https://images.theconversation.com/files/222649/original/file-20180611-191974-12eqqqr.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'
            } else {
                return 'https://img.freepik.com/free-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=2000'
            }
        },
        mobileInput() {
            if (this.isMobile()) {
                return 'top: 65% !important;'
            } else {
                return ''
            }
        },
        mobileDescription() {
            if (this.isMobile()) {
                return 'top: 70% !important;'
            } else {
                return ''
            }
        }
    }
}
</script>
<style scoped>
@import '../assets/styles/home.css';
</style>