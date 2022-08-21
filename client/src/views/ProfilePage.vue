<template>
    <div class='profileContainer' v-if="!isMobile()">
        <div class='profileBothContainer'>
            <div class='profileMostViewedContainer'>
                <div class="profileMostViewedPages">
                    <h3 class="profileDesktopHeader">{{ this.getQueryVariable() }}</h3>
                    <div class='profileEachRow'>
                        <div>
                            <a>Comment History</a>
                            <hr>
                            <a class="profileLoader" v-if="commentDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="commentDetails !== null && commentDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in commentDetails" :key="comment.name">
                                <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                    <div class='profileEachRow'>
                        <div>
                            <a>Reply History</a>
                            <hr>
                            <a class="profileLoader" v-if="replyDetails === null">
                               <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="replyDetails !== null && replyDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in replyDetails" :key="comment.name">
                                <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                    <div class='profileEachRow'>
                        <div>
                            <a>Like History</a>
                            <hr>
                            <a class="profileLoader" v-if="likeDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="likeDetails !== null && likeDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in likeDetails" :key="comment.name">
                                <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isMobile()">
        <div class="profileMostViewedContainer profileMobileMostViewedContainer">
            <div class="profileMostViewedPages profileMobileContainer">
                <h3>{{ this.getQueryVariable() }}</h3>
                <div class='profileEachRow'>
                    <div>
                        <a>Comment History</a>
                        <hr>
                        <a class="profileLoader" v-if="commentDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="commentDetails !== null && commentDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in commentDetails" :key="comment.name">
                            <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                {{ comment.count }}</p>
                        </a>
                    </div>
                </div>
                <div class='profileEachRow'>
                    <div>
                        <a>Reply History</a>
                        <hr>
                        <a class="profileLoader" v-if="replyDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="replyDetails !== null && replyDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in replyDetails" :key="comment.name">
                            <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                {{ comment.count }}</p>
                        </a>
                    </div>
                </div>
                <div class='profileEachRow'>
                    <div>
                        <a>Like History</a>
                        <hr>
                        <a class="profileLoader" v-if="likeDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="likeDetails !== null && likeDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in likeDetails" :key="comment.name">
                            <p><router-link :to="'/comment?major=' + comment.name">{{ comment.name }}</router-link>:
                                {{ comment.count }}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'ProfilePage',
    components: {
        PulseLoader
    },
    data() {
        return {
            commentDetails: null,
            replyDetails: null,
            likeDetails: null
        }
    },
    methods: {
        getQueryVariable() {
            var query = window.location.search.substring(1)
            var vars = query.split('&')
            var returnValue = ''
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=')
                if (pair.length !== 1) {
                    for (var j = 0; j < pair.length; j++) {
                        if (pair[j] !== 'username') {
                            returnValue += pair[j]
                        }
                    }
                } else {
                    returnValue += pair[0]
                }
            }
            return decodeURIComponent(returnValue)
        },
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    },
    beforeMount() {
        let self = this
        axios({
            method: "GET",
            url: process.env.VUE_APP_ROOT_API + "/getUserCommentDetails",
            params: {
                username: this.getQueryVariable()
            }
        }).then(function (response) {
            if (response.data.status) {
                self.commentDetails = response.data.data
            }
        })
        axios({
            method: "GET",
            url: process.env.VUE_APP_ROOT_API + "/getUserReplyDetails",
            params: {
                username: this.getQueryVariable()
            }
        }).then(function (response) {
            if (response.data.status) {
                self.replyDetails = response.data.data
            }
        })
        axios({
            method: "GET",
            url: process.env.VUE_APP_ROOT_API + "/getUserLikeDetails",
            params: {
                username: this.getQueryVariable()
            }
        }).then(function (response) {
            if (response.data.status) {
                self.likeDetails = response.data.data
            }
        })
    }
}
</script>
<style scoped>
@import '../assets/styles/profile.css';
</style>