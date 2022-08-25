<template>
    <div class='profileContainer' v-if="!isMobile()">
        <div class='profileBothContainer'>
            <div class='profileMostViewedContainer'>
                <div class="profileMostViewedPages">
                    <h3 class="profileDesktopHeader" v-if="userDetails !== null">{{ userDetails.username }}</h3>
                    <div class='profileEachRow'>
                        <div>
                            <a>User Details</a>
                            <hr>
                            <a class="profileLoader" v-if="userDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="userDetails !== null">
                                <p v-if="userDetails.gender === null">Gender: N/A</p>
                                <p v-if="userDetails.gender === ''">Gender: N/A</p>
                                <p v-if="userDetails.gender !== null && userDetails.gender !== ''">Gender: {{ userDetails.gender }}</p>
                                <p v-if="userDetails.country === null">Country: N/A</p>
                                <p v-if="userDetails.country === ''">Country: N/A</p>
                                <p v-if="userDetails.country !== null && userDetails.country !== ''">Country: {{ userDetails.country }}</p>
                                <p v-if="userDetails.major === null">Major: N/A</p>
                                <p v-if="userDetails.major === ''">Major: N/A</p>
                                <p v-if="userDetails.major !== null && userDetails.major !== ''">Major: {{ userDetails.major }}</p>
                                <p v-if="userDetails.school === null">School: N/A</p>
                                <p v-if="userDetails.school === ''">School: N/A</p>
                                <p v-if="userDetails.school !== null && userDetails.school !== ''">School: {{ userDetails.school}}</p>
                            </a>
                        </div>
                    </div>
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
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
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
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
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
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
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
                <h3 v-if="userDetails !== null">{{ userDetails.username }}</h3>
                <div class='profileEachRow'>
                        <div>
                            <a>User Details</a>
                            <hr>
                            <a class="profileLoader" v-if="userDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="userDetails !== null">
                                <p v-if="userDetails.gender === null">Gender: N/A</p>
                                <p v-if="userDetails.gender === ''">Gender: N/A</p>
                                <p v-if="userDetails.gender !== null && userDetails.gender !== ''">Gender: {{ userDetails.gender }}</p>
                                <p v-if="userDetails.country === null">Country: N/A</p>
                                <p v-if="userDetails.country === ''">Country: N/A</p>
                                <p v-if="userDetails.country !== null && userDetails.country !== ''">Country: {{ userDetails.country }}</p>
                                <p v-if="userDetails.major === null">Major: N/A</p>
                                <p v-if="userDetails.major === ''">Major: N/A</p>
                                <p v-if="userDetails.major !== null && userDetails.major !== ''">Major: {{ userDetails.major }}</p>
                                <p v-if="userDetails.school === null">School: N/A</p>
                                <p v-if="userDetails.school === ''">School: N/A</p>
                                <p v-if="userDetails.school !== null && userDetails.school !== ''">School: {{ userDetails.school}}</p>
                            </a>
                        </div>
                    </div>
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
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
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
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
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
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent />
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'ProfilePage',
    components: {
        PulseLoader,
        FooterComponent
    },
    data() {
        return {
            userDetails: null,
            commentDetails: null,
            replyDetails: null,
            likeDetails: null
        }
    },
    methods: {
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
        axios.all([
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserDetailsByID/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserCommentDetails/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserReplyDetails/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserLikeDetails/${this.$route.params.id}`),
        ]).then(axios.spread((account, comment, reply, like) => {
            if (account.data.status && comment.data.status && reply.data.status && like.data.status) {
                self.userDetails = account.data.data.username
                self.commentDetails = comment.data.data
                self.replyDetails = reply.data.data
                self.likeDetails = like.data.data
            }
        }))

    }
}
</script>
<style scoped>
@import '../assets/styles/profile.css';
</style>