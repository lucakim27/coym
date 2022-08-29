<template>
    <div class='analysisContainer' v-if="!isMobile() && mostCommentedTable.length">
        <div class='analysisBothContainer'>
            <div class='analysisMostViewedContainer'>
                <div class="analysisMostViewedPages">
                    <Bar v-if="loaded" :chart-data="chartData"/>
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
                <Bar v-if="loaded" :chart-data="chartData"/>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent v-if="mostCommentedTable.length" />
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
            mostCommentedTable: [],
            loaded: false,
            chartData: null
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
            self.chartData = {
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
            for (var i = 0; i < count.length; i++) {
                self.chartData.labels.push(count[i].name)
                self.chartData.datasets[0].data.push(count[i].comment)
                self.chartData.datasets[1].data.push(count[i].reply)
                self.chartData.datasets[2].data.push(count[i].like)
            }            
            self.loaded = true
        }))
    }
}
</script>
<style scoped>
@import '../assets/styles/analysis.css';
</style>