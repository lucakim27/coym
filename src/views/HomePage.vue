<template>
    <div class='homeContainer'>
        <div class="homeLoader" v-if="isLoading">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
        <img v-show="isLoaded" @load="loaded" :style='mobileImg' src='../assets/images/main.jpg' class="mainImage">
        <div>
            <center>
                <h2>
                    Find your course 
                </h2>
                <div>
                    <p style="padding-left: 20px; padding-right: 20px;"> We've collected course reviews from all over the world. Search for your course to get started. </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="150px" width="150px" version="1.1" id="Capa_1" viewBox="0 0 297 297" xml:space="preserve">
<path d="M293.337,259.152l-24.732-49.592c-4.232-8.483-12.772-13.754-22.288-13.754c-1.168,0-2.336,0.094-3.494,0.261l-7.2-14.438  c14.341-9.565,25.064-23.512,30.621-40.125c6.62-19.794,5.136-40.982-4.179-59.66c-10.195-20.442-28.311-34.943-49.638-40.621  C190.297,15.971,157.833,0,121.707,0C55.178,0,1.053,54.15,1.053,120.712c0,66.56,54.125,120.71,120.654,120.71  c39.74,0,75.04-19.333,97.036-49.079l6.278,12.59c-7.386,7.352-9.625,18.896-4.727,28.722l24.731,49.59  c4.23,8.484,12.77,13.756,22.288,13.756h0.001c3.812,0,7.633-0.9,11.049-2.603l3.821-1.905  C294.451,286.374,299.453,271.419,293.337,259.152z M244.268,90.719c6.945,13.925,8.052,29.721,3.116,44.478  c-4.936,14.757-15.322,26.709-29.247,33.652c-8.168,4.074-16.897,6.14-25.947,6.14c-22.259,0-42.253-12.364-52.181-32.269  c-14.337-28.745-2.614-63.795,26.13-78.131c8.167-4.073,16.897-6.139,25.947-6.139C214.346,58.45,234.342,70.814,244.268,90.719z   M181.104,39.337c-5.61,0.795-11.098,2.209-16.432,4.226c-0.605-1.676-1.224-3.326-1.874-4.924  c-1.837-4.514-3.822-8.653-5.936-12.417C165.58,29.479,173.72,33.921,181.104,39.337z M147.005,54.222H95.969  c7.258-22.021,17.427-34.336,25.738-34.336C129.854,19.886,139.781,33.019,147.005,54.222z M90.822,74.107h35.859  c-7.124,10.983-11.409,23.614-12.428,36.661H86.748C87.236,97.221,88.688,84.936,90.822,74.107z M32.371,74.107H70.69  c-2.085,11.559-3.385,23.905-3.83,36.661H21.429C22.717,97.653,26.531,85.27,32.371,74.107z M32.371,167.314  c-5.841-11.162-9.654-23.544-10.942-36.659H66.86c0.445,12.755,1.745,25.101,3.83,36.659H32.371z M46.022,187.199h29.263  c1.579,5.494,3.351,10.719,5.332,15.585c1.837,4.513,3.821,8.653,5.936,12.416C70.809,209.318,56.921,199.605,46.022,187.199z   M80.616,38.639c-1.98,4.864-3.753,10.09-5.331,15.583H46.023c10.899-12.405,24.787-22.118,40.529-28  C84.438,29.985,82.453,34.125,80.616,38.639z M86.748,130.654h28.519c1.285,7.109,3.564,14.157,6.947,20.94  c2.856,5.728,6.339,10.986,10.335,15.719H90.822C88.688,156.485,87.236,144.201,86.748,130.654z M121.707,221.536  c-8.312,0-18.48-12.314-25.738-34.337h51.476C140.187,209.222,130.019,221.536,121.707,221.536z M162.798,202.784  c1.546-3.797,2.96-7.818,4.259-12.01c7.254,2.44,14.941,3.837,22.864,4.06c-9.518,8.776-20.715,15.754-33.059,20.366  C158.976,211.438,160.961,207.297,162.798,202.784z M273.311,274.694l-3.821,1.906c-0.684,0.341-1.415,0.514-2.174,0.514  c-1.898,0-3.662-1.077-4.493-2.744l-24.731-49.591c-1.203-2.412-0.183-5.466,2.23-6.669l3.819-1.904  c0.684-0.341,1.416-0.514,2.175-0.514c1.897,0,3.661,1.076,4.492,2.742l24.731,49.593  C276.743,270.439,275.723,273.492,273.311,274.694z"/>
</svg>
            </center>
            <center>
                <h2>
                    Write a review
                </h2>
                <div>
                    <p style="padding-left: 20px; padding-right: 20px;"> Share your experience of your course by writing a review. </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#000000"/></svg>
            </center>
        </div>
        <div class="homeRecentCommentContainer" v-if="popularMajors !== null && recentComments !== null">
            <div class="homeRecentCommentHeader">
                <a class="homeRecentCommentHeaderTitle">Recent comments</a>
                <router-link class="homeDirect" :to="'/search'">See more</router-link>
            </div>
            <div class="homeEachRecentComment" v-for="comment in recentComments" :key="comment.id">
                <div class="homeUsernameAndDate">
                    <router-link class="homeUsername" :to="'/profile/' + comment.id">{{ comment.username }}</router-link>
                    <!-- <a class="homeDate">{{  comment.createdAt.slice(0, 10)  }}</a> -->
                </div>
                <div>
                    <p>{{  comment.comment  }}</p>
                </div>
            </div>
        </div>
        <div class="homeRecentCommentContainer" v-if="popularMajors !== null && recentComments !== null">
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
        <div class="homeLoader" v-if="popularMajors === null || recentComments === null">
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
            popularMajors: null
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
    }
}
</script>
<style scoped>
@import '../assets/styles/home.css';
</style>