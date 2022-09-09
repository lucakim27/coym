<template>
    <div class='homeContainer'>
        <div class="homeLoader" v-if="isLoading">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
        <img v-show="isLoaded" @load="loaded" :style='mobileImg' src='../assets/images/main.jpg' class="mainImage">
        <div class="homeRecentCommentContainer" v-if="popularMajors !== null && recentComments !== nul || popularModules !== null">
            <div class="homeRecentCommentHeader">
                <a class="homeRecentCommentHeaderTitle">Recent comments</a>
                <router-link class="homeDirect" :to="'/search'">See more</router-link>
            </div>
            <div class="homeEachRecentComment" v-for="comment in recentComments" :key="comment.id">
                <div class="homeUsernameAndDate">
                    <router-link class="homeUsername" :to="'/profile/' + comment.id">{{ comment.username }}</router-link>
                    <a class="homeDate">{{  comment.createdAt.slice(0, 10)  }}</a>
                </div>
                <div>
                    <p>{{  comment.comment  }}</p>
                </div>
            </div>
        </div>
        <div class="homeRecentCommentContainer" v-if="popularMajors !== null && recentComments !== null || popularModules !== null">
            <div class="homeRecentCommentHeader">
                <a class="homeRecentCommentHeaderTitle">Popular courses</a>
                <router-link class="homeDirect" :to="'/chart'">See more </router-link>
            </div>
            <div class="homeEachRecentComment" v-for="major in popularMajors" :key="major.name">
                <div class="homeMajorNameAndCount">
                    <router-link class="homeUsername" :to="'/comment/' + major.id">{{ major.name }}</router-link>
                </div>
            </div>
        </div>
        <div class="homeRecentCommentContainer" v-if="popularMajors !== null && recentComments !== null || popularModules !== null">
            <div class="homeRecentCommentHeader">
                <a class="homeRecentCommentHeaderTitle">Popular modules</a>
                <router-link class="homeDirect" :to="'/chart'">See more </router-link>
            </div>
            <div class="homeEachRecentComment" v-for="module in popularModules" :key="module.name">
                <div class="homeMajorNameAndCount">
                    <router-link class="homeUsername" :to="'/module/' + module.id">{{ module.name }}</router-link>
                </div>
            </div>
        </div>
        <div class="homeLoader" v-if="popularMajors === null || recentComments === null || popularModules === null">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
    </div>
    <div>
        <FooterComponent v-if="recentComments !== null && popularMajors !== null"/>
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'HomePage',
    components: {
        PulseLoader,
        FooterComponent
    },
    data() {
        return {
            isLoaded: false,
            isLoading: false,
            recentComments: null,
            popularMajors: null,
            popularModules: null
        }
    },
    methods: {
        renderPages(page) {
            this.$router.push(page)
            window.scrollTo(0, 0)
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
        getRecentComments() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getRecentComments"
            }).then(function (response) {
                if (response.data.status) {
                    self.recentComments = response.data.message
                }
            })
        },
        getPopularMajors() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getPopularMajors"
            }).then(function (response) {
                if (response.data.status) {
                    self.popularMajors = response.data.message
                }
            })
        },
        getPopularModules() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getPopularModules"
            }).then(function (response) {
                if (response.data.status) {
                    self.popularModules = response.data.message
                }
            })
        }
    },
    computed: {
        mobileImg() {
            return this.isMobile() ? 'height: 20% !important;' : 'height: 650px !important;'
        },
        mobileDescription() {
            return this.isMobile() ? 'top: 70% !important;' : ''
        }
    },
    beforeMount() {
        this.getRecentComments()
        this.getPopularMajors()
        this.getPopularModules()
    }
}
</script>
<style scoped>
@import '../assets/styles/home.css';
</style>