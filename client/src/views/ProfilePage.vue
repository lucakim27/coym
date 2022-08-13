<template>
    <div id='container' v-if="!isMobile()">
        <div id='BothContainer'>
            <div id='mostViewedContainer'>
                <div class="mostViewedPages">
                    <h3 class="desktopHeader">{{ this.getQueryVariable() }}</h3>
                    <div class='eachRow'>
                        <div>
                            <a>Comment History</a>
                            <hr>
                            <a v-for="comment in commentDetails" :key="comment.name">
                                <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                    <div class='eachRow'>
                        <div>
                            <a>Reply History</a>
                            <hr>
                            <a v-for="comment in replyDetails" :key="comment.name">
                                <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                    <div class='eachRow'>
                        <div>
                            <a>Like History</a>
                            <hr>
                            <a v-for="comment in likeDetails" :key="comment.name">
                                <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
                                    {{ comment.count }}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isMobile()">
        <div id='mostViewedContainer' class="mobileMostViewedContainer">
            <div class="mostViewedPages mobileContainer">
                <h3>{{ this.getQueryVariable() }}</h3>
                <div class='eachRow'>
                    <div>
                        <a>Comment History</a>
                        <hr>
                        <a v-for="comment in commentDetails" :key="comment.name">
                            <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
                                {{ comment.count }}</p>
                        </a>
                    </div>
                </div>
                <div class='eachRow'>
                    <div>
                        <a>Reply History</a>
                        <hr>
                        <a v-for="comment in replyDetails" :key="comment.name">
                            <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
                                {{ comment.count }}</p>
                        </a>
                    </div>
                </div>
                <div class='eachRow'>
                    <div>
                        <a>Like History</a>
                        <hr>
                        <a v-for="comment in likeDetails" :key="comment.name">
                            <p><a v-bind:href="'/comment?major=' + comment.name">{{ comment.name }}</a>:
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