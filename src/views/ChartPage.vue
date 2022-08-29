<template>
    <div class='analysisContainer' v-if="!isMobile() && loaded">
        <div class='analysisBothContainer'>
            <div class='analysisMostViewedContainer'>
                <div class="analysisMostViewedPages">
                    <Bar v-if="loaded" :chart-data="chartData" />
                </div>
            </div>
        </div>
    </div>
    <div class="analysisLoader" v-if="!loaded">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-if="isMobile() && loaded">
        <div class="analysisMostViewedContainer mobileAnalysisMostViewedContainer">
            <div class="analysisMostViewedPages mobileAnalysisContainer">
                <Bar v-if="loaded" :chart-data="chartData" />
            </div>
        </div>
    </div>
    <div>
        <FooterComponent v-if="loaded" />
    </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'ChartPage',
    components: {
        PulseLoader,
        FooterComponent,
        Bar
    },
    data() {
        return {
            loaded: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Comment',
                        backgroundColor: '#ff6384',
                        data: []
                    },
                    {
                        label: 'Reply',
                        backgroundColor: '#36a2eb',
                        data: []
                    },
                    {
                        label: 'Like',
                        backgroundColor: '#ffce56',
                        data: []
                    }
                ]
            }
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
        getCommentReplyLikeCount() {
            let self = this
            axios.all([
                axios.get(process.env.VUE_APP_ROOT_API + "/getCommentCount"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getReplyCount"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getLikeCount"),
            ]).then(axios.spread((comment, reply, like) => {
                let count = []
                count.push(...comment.data.message)
                for (var i = 0; i < reply.data.message.length; i++) {
                    let exist = false
                    for (var j = 0; j < count.length; j++) {
                        if (reply.data.message[i].name === count[j].name) {
                            exist = true
                            count[j].reply = reply.data.message[i].count
                        }
                    }
                    if (!exist) {
                        count.push(reply.data.message[i])
                    }
                }
                for (var e = 0; e < like.data.message.length; e++) {
                    let exist = false
                    for (var f = 0; f < count.length; f++) {
                        if (like.data.message[e].name === count[f].name) {
                            exist = true
                            count[f].like = like.data.message[e].count
                        }
                    }
                    if (!exist) {
                        count.push(like.data.message[e])
                    }
                }
                for (var d = 0; d < count.length; d++) {
                    self.chartData.labels.push(count[d].name)
                    self.chartData.datasets[0].data.push(count[d].count)
                    self.chartData.datasets[1].data.push(count[d].reply)
                    self.chartData.datasets[2].data.push(count[d].like)
                }
                self.loaded = true
            }))
        }
    },
    mounted() {
        this.getCommentReplyLikeCount()
    }
}
</script>
<style scoped>
@import '../assets/styles/analysis.css';
</style>