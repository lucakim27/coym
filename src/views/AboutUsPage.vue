<template>
    <div class="privacyPolicyContainer aboutUsContainer" v-if="!isMobile() && loaded">
        <div class="privacyPolicyChild">
            <div class="privacyPolicyRow">
                <h3>About COYM</h3>
                <p>What does COYM stand for? It stands for Comment On Your Major.</p>
                <p>COYM is the neat, simple platform for college major reviews. Founded in 2022, we've collected <a> {{
                     comment 
                    }} comments </a>, <a> {{  reply  }} replies </a> and <a> {{  like 
                    }} likes </a> to the reviews in about 300 college majors and <a> {{  account  }} users </a>
                    signed up on the website.</p>
                <p>Each school year, millions of high school graduates need to pick their majors. For decades, they've
                    only had word-of-mouth and forums to rely on to help with their decisions- until today. Our goal is
                    to help high school graduates make better informed decisions during college admissions
                    season.
                </p>
                <p>You can read, comment, like and reply, see the details of others, and
                    connect with them via personal links.</p>
                <p>Questions? send us an email through contact us page.</p>
            </div>
        </div>
    </div>
    <a class="privacyPolicyLoader" v-if="!loaded">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </a>
    <div class="privacyPolicyMobileContainer aboutUsContainer" v-if="isMobile() && loaded">
        <div class="privacyPolicyChild">
            <div class="privacyPolicyMobileRow">
                <h3>About COYM</h3>
                <p>What does COYM stand for? It stands for Comment On Your Major.</p>
                <p>COYM is the neat, simple platform for college major reviews. Founded in 2022, we've collected <a> {{
                     comment 
                    }} comments </a>, <a> {{  reply  }} replies </a> and <a> {{  like 
                    }} likes </a> to the reviews in about 300 college majors and <a> {{  account  }} users </a>
                    signed up on the website.</p>
                <p>Each school year, millions of high school graduates need to pick their majors. For decades, they've
                    only had word-of-mouth and forums to rely on to help with their decisions- until today. Our goal is
                    to help high school graduates make better informed decisions during college admissions
                    season.
                </p>
                <p>You can read, comment, like and reply, see the details of others, and
                    connect with them via personal links.</p>
                <p>Questions? send us an email through contact us page.</p>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent v-if="loaded"/>
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'privacyPolicyPage',
    components: {
        FooterComponent,
        PulseLoader
    },
    data() {
        return {
            comment: null,
            reply: null,
            like: null,
            account: null,
            loaded: false
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
        getTotalCount() {
            let self = this
            axios.all([
                axios.get(process.env.VUE_APP_ROOT_API + "/getTotalCommentCount"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getTotalReplyCount"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getTotalLikeCount"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getTotalAccountCount"),
            ]).then(axios.spread((comment, reply, like, account) => {
                self.comment = comment.data.message[0]['COUNT(*)']
                self.reply = reply.data.message[0]['COUNT(*)']
                self.like = like.data.message[0]['COUNT(*)']
                self.account = account.data.message[0]['COUNT(*)']
                self.loaded = true
            }))
        }
    },
    mounted() {
        this.getTotalCount()
    }
}
</script>
<style scoped>
@import '../assets/styles/privacyPolicy.css';
</style>