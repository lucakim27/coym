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
                            <a v-if="commentDetails.length === 0">
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
                            <a v-if="replyDetails.length === 0">
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
                            <a v-if="likeDetails.length === 0">
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
                        <a v-if="commentDetails.length === 0">
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
                        <a v-if="replyDetails.length === 0">
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
                        <a v-if="likeDetails.length === 0">
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
export default {
    name: 'ProfilePage',
    data() {
        return {
            commentDetails: [],
            replyDetails: [],
            likeDetails: []

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
            url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getUserCommentDetails",
            // url: "http://localhost:3000/getUserCommentDetails",
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
            url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getUserReplyDetails",
            // url: "http://localhost:3000/getUserReplyDetails",
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
            url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getUserLikeDetails",
            // url: "http://localhost:3000/getUserLikeDetails",
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