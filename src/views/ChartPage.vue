<template>
    <br><br><br>
    <div class='analysisContainer' v-if="!isMobile() && loaded">
        <div class='analysisBothContainer'>
            <div class='analysisMostViewedContainer'>
                <div class="wrapper">
                    <input type="radio" name="select" id="option-1" value="course" v-model="option">
                    <input type="radio" name="select" id="option-2" value="module" v-model="option">
                    <label for="option-1" class="option option-1">
                        <span>Course</span>
                    </label>
                    <label for="option-2" class="option option-2">
                        <span>Module</span>
                    </label>
                </div>
                <div class="analysisMostViewedPages" v-if="option === 'course'">
                    <Bar v-if="loaded" :chart-data="courseChartData" :chart-options="chartOptions"
                        :style="{ height: courseHeight + 'vh'}" />
                </div>
                <div class="analysisMostViewedPages" v-if="option === 'module'">
                    <Bar v-if="loaded" :chart-data="moduleChartData" :chart-options="chartOptions"
                        :style="{ height: moduleHeight + 'vh'}" />
                </div>
            </div>
        </div>
    </div>
    <div class="analysisLoader" v-if="!loaded">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-if="isMobile() && loaded">
        <div class="analysisMostViewedContainer mobileAnalysisMostViewedContainer">
            <div class="wrapper">
                <input type="radio" name="select" id="option-1" value="course" v-model="option">
                <input type="radio" name="select" id="option-2" value="module" v-model="option">
                <label for="option-1" class="option option-1">
                    <span>Course</span>
                </label>
                <label for="option-2" class="option option-2">
                    <span>Module</span>
                </label>
            </div>
            <div class="analysisMostViewedPages mobileAnalysisContainer" v-if="option === 'course'">
                <Bar v-if="loaded" :chart-data="courseChartData" :chart-options="chartOptions"
                    :style="{ height: courseHeight + 'vh'}" />
            </div>
            <div class="analysisMostViewedPages mobileAnalysisContainer" v-if="option === 'module'">
                <Bar v-if="loaded" :chart-data="moduleChartData" :chart-options="chartOptions"
                    :style="{ height: moduleHeight + 'vh'}" />
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
            courseHeight: 0,
            moduleHeight: 0,
            option: 'course',
            loaded: false,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                type: Object,
                default: () => { },
                indexAxis: "y",
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            courseChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Comment',
                        backgroundColor: '#9BB7D4',
                        data: []
                    }
                ]
            },
            moduleChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Comment',
                        backgroundColor: '#9BB7D4',
                        data: []
                    }
                ]
            }
        }
    },
    methods: {
        formatLabel(str, maxwidth) {
            let sections = []
            let words = str.split(" ")
            let temp = ""
            words.forEach(function (item, index) {
                if (temp.length > 0) {
                    let concat = temp + ' ' + item

                    if (concat.length > maxwidth) {
                        sections.push(temp)
                        temp = ""
                    }
                    else {
                        if (index == (words.length - 1)) {
                            sections.push(concat)
                            return
                        }
                        else {
                            temp = concat
                            return
                        }
                    }
                }
                if (index == (words.length - 1)) {
                    sections.push(item)
                    return
                }
                if (item.length < maxwidth) {
                    temp = item
                }
                else {
                    sections.push(item)
                }
            })
            return sections
        },
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
                axios.get(process.env.VUE_APP_ROOT_API + "/getModuleCommentCount")
            ]).then(axios.spread((course, module) => {
                for (let i = 0; i < course.data.message.length; i++) {
                    self.courseChartData.labels.push(self.formatLabel(course.data.message[i].name.replaceAll('-', ' ')))
                    self.courseChartData.datasets[0].data.push(course.data.message[i].count)
                    self.courseHeight += 15
                }
                for (let j = 0; j < module.data.message.length; j++) {
                    self.moduleChartData.labels.push(self.formatLabel(module.data.message[j].name.replaceAll('-', ' ')))
                    self.moduleChartData.datasets[0].data.push(module.data.message[j].count)
                    self.moduleHeight += 15
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