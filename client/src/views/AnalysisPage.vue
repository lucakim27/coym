<template>
    <div class='analysisContainer' v-if="!isMobile() && mostCommentedTable.length">
        <div class='analysisBothContainer'>
            <div class='analysisMostViewedContainer'>
                <div class="analysisMostViewedPages">
                    <div class='analysisEachRow' v-for="row in mostCommentedTable" :key="row.name">
                        <div>
                            <router-link :to="'/comment/' + row.id" class="analysisMajorTitle">{{ row.name }}</router-link><hr>
                            <div style="display: flex; justify-content: center" class="analysisCenterChild">
                                <a>Comment: {{ row.comment }}</a><br>
                                <a>Like: {{ row.like }}</a><br>
                                <a>Reply: {{ row.reply }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="analysisLoader" v-if="!mostCommentedTable.length">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-if="isMobile() && mostCommentedTable.length">
        <div class="analysisMostViewedContainer mobileAnalysisMostViewedContainer">
            <div class="analysisMostViewedPages mobileAnalysisContainer">
                <div class='analysisEachRow' v-for="row in mostCommentedTable" :key="row.name">
                    <div>
                        <router-link :to="'/comment/' + row.id" class="analysisMajorTitle">{{ row.name }}</router-link><hr>
                        <a>Like: {{ row.like }}</a><br>
                        <a>Reply: {{ row.reply }}</a><br>
                        <a>Comment: {{ row.comment }}</a>
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
    name: 'AnalysisPage',
    components: {
        PulseLoader
    },
    data() {
        return {
            mostCommentedTable: []
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
    },
    mounted() {
        let self = this
        axios.all([
            axios.get(process.env.VUE_APP_ROOT_API + "/getCommentCount"),
            axios.get(process.env.VUE_APP_ROOT_API + "/getReplyCount"),
            axios.get(process.env.VUE_APP_ROOT_API + "/getLikeCount"),
        ]).then(axios.spread((comment, reply, like) => {
            let count = []
            comment.data.message.forEach(key1 => {
                let check = false
                count.forEach(key2 => {
                    if (key1.name === key2.name) {
                        key2.comment += 1
                        check = true
                    }
                })
                if (!check) {
                    count.push({
                        id: key1.id, name: key1.name, comment: 1, reply: 0, like: 0
                    })
                }
            })
            reply.data.message.forEach(key1 => {
                let check = false
                count.forEach(key2 => {
                    if (key1.name === key2.name) {
                        key2.reply += 1
                        check = true
                    }
                })
                if (!check) {
                    count.push({
                        id: key1.id, name: key1.name, reply: 1, comment: 0, like: 0
                    })
                }
            })
            like.data.message.forEach(key1 => {
                let check = false
                count.forEach(key2 => {
                    if (key1.name === key2.name) {
                        key2.like += 1
                        check = true
                    }
                })
                if (!check) {
                    count.push({
                        id: key1.id, name: key1.name, like: 1, comment: 0, reply: 0
                    })
                }
            })
            self.mostCommentedTable = count
            console.log(self.mostCommentedTable)
        }))
    }
}
</script>
<style scoped>
@import '../assets/styles/analysis.css';
</style>