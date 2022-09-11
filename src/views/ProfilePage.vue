<template>
    <div class="profileMostViewedContainer profileMobileMostViewedContainer">
        <div class="profileMostViewedPages profileMobileContainer">
            <a class="profileLoader" v-if="userDetails === null && !loaded">
                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
            </a>
            <div style="display: flex;" class="profileUsernameContainer" v-if="userDetails !== null && loaded">
                <h3 v-if="userDetails !== null">{{ userDetails.username }}</h3>
            </div>
            <div class='profileEachRow' v-if="userDetails !== null && loaded">
                <div class="profileUserDetailsContainer profileUserDetailsMobileContainer">
                    <div class="profileCenterTitle">
                        <b>User Details</b>
                    </div>
                    <hr>
                    <a v-if="userDetails !== null" class="userDetailContainer">
                        <div
                            v-if="userDetails.gender !== null && userDetails.gender !== '' && userDetails.gender !== 'N/A'">
                            <svg style="margin-top: -5px; margin-left: -4px;" xmlns="http://www.w3.org/2000/svg"
                                width="40" height="40" viewBox="0 0 24 24" fill="black">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12.1888 7L12.1909 5L19.1909 5.00746L19.1834 12.0075L17.1834 12.0053L17.1873 8.41678L14.143 11.4611C15.4612 13.4063 15.2587 16.0743 13.5355 17.7975C11.5829 19.7501 8.41709 19.7501 6.46447 17.7975C4.51184 15.8449 4.51184 12.6791 6.46447 10.7264C8.16216 9.02873 10.777 8.80709 12.7141 10.0615L15.7718 7.00382L12.1888 7ZM7.87868 12.1406C9.05025 10.9691 10.9497 10.9691 12.1213 12.1406C13.2929 13.3122 13.2929 15.2117 12.1213 16.3833C10.9497 17.5549 9.05025 17.5549 7.87868 16.3833C6.70711 15.2117 6.70711 13.3122 7.87868 12.1406Z"
                                    fill="black" />
                            </svg>
                            <p style="margin-left: -7px;">{{
                            userDetails.gender
                            }}</p>
                        </div>
                        <div
                            v-if="userDetails.country !== null && userDetails.country !== ''&& userDetails.country !== 'N/A'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                                viewBox="0 0 512 512">
                                <path d="M267,474l-.8-.13A.85.85,0,0,0,267,474Z" />
                                <path
                                    d="M448.9,187.78a5.51,5.51,0,0,0-10.67-.63h0A5.52,5.52,0,0,1,433,191H417.53a5.48,5.48,0,0,1-2.84-.79l-22.38-13.42a5.48,5.48,0,0,0-2.84-.79h-35.8a5.48,5.48,0,0,0-3.06.93l-44.15,29.43A5.52,5.52,0,0,0,304,211v41.74a5.51,5.51,0,0,0,2.92,4.87l57.89,30.9a5.55,5.55,0,0,1,2.92,4.8L368,316.8a5.53,5.53,0,0,0,2.85,4.75l23.26,12.87a5.54,5.54,0,0,1,2.85,4.83v48.6a5.52,5.52,0,0,0,9.17,4.14c9.38-8.26,22.83-20.32,24.62-23.08q4.44-6.87,8.33-14.07a207.39,207.39,0,0,0,13.6-31C465.36,287.13,455.34,221.14,448.9,187.78Z" />
                                <path
                                    d="M286.4,302.8l-61.33-46a4,4,0,0,0-2.4-.8h-29.1a3.78,3.78,0,0,1-2.68-1.11l-13.72-13.72a4,4,0,0,0-2.83-1.17H121.15a3.79,3.79,0,0,1-2.68-6.47l8.42-8.42a3.78,3.78,0,0,1,2.68-1.11h32.37a8,8,0,0,0,7.7-5.83l6.89-24.5a4,4,0,0,1,2-2.47L206,177.06a3.79,3.79,0,0,0,2.05-3.37v-12.5a3.82,3.82,0,0,1,.68-2.17L223.33,138a3.75,3.75,0,0,1,1.78-1.38l20.43-7.67a3.79,3.79,0,0,0,2.46-3.55V114a3.8,3.8,0,0,0-1.69-3.16L225.83,97.22A3.83,3.83,0,0,0,222,97l-27.88,13.94a3.78,3.78,0,0,1-4-.41L176.9,100.08a3.8,3.8,0,0,1,.1-6l10.74-7.91a3.78,3.78,0,0,0-.09-6.16L170.92,68.34a3.78,3.78,0,0,0-4-.22c-6.05,3.31-23.8,13.11-30.1,17.52a209.48,209.48,0,0,0-68.16,80c-1.82,3.76-4.07,7.59-4.29,11.72s-3.46,13.35-4.81,17.08a3.78,3.78,0,0,0,.24,3.1l35.69,65.58a3.74,3.74,0,0,0,1.38,1.44l37.55,22.54a3.78,3.78,0,0,1,1.81,2.73l7.52,54.54a3.82,3.82,0,0,0,1.61,2.61l29.3,20.14a4,4,0,0,1,1.65,2.48l15.54,73.8a3.6,3.6,0,0,0,.49,1.22c1.46,2.36,7.28,11,14.3,12.28-.65.18-1.23.59-1.88.78a47.63,47.63,0,0,1,5,1.16c2,.54,4,1,6,1.43,3.13.62,3.44,1.1,4.94-1.68,2-3.72,4.29-5,6-5.46a3.85,3.85,0,0,0,2.89-2.9l10.07-46.68a4,4,0,0,1,1.6-2.42l45-31.9a4,4,0,0,0,1.69-3.27V306A4,4,0,0,0,286.4,302.8Z" />
                                <path
                                    d="M262,48s-3.65.21-4.39.23q-8.13.24-16.22,1.12A207.45,207.45,0,0,0,184.21,64c2.43,1.68-1.75,3.22-1.75,3.22L189,80h35l24,12,21-12Z" />
                                <path
                                    d="M354.23,120.06l16.11-14a4,4,0,0,0-.94-6.65l-18.81-8.73a4,4,0,0,0-5.3,1.9l-7.75,16.21a4,4,0,0,0,1.49,5.11l10.46,6.54A4,4,0,0,0,354.23,120.06Z" />
                                <path
                                    d="M429.64,140.67l-5.83-9c-.09-.14-.17-.28-.25-.43-1.05-2.15-9.74-19.7-17-26.51-5.45-5.15-7-3.67-7.43-2.53a3.77,3.77,0,0,1-1.19,1.6L369.1,127.11a4,4,0,0,1-2.51.89H351.66a4,4,0,0,0-2.83,1.17l-12,12a4,4,0,0,0,0,5.66l12,12a4,4,0,0,0,2.83,1.17h75.17a4,4,0,0,0,4-4.17l-.55-13.15A4,4,0,0,0,429.64,140.67Z" />
                                <path
                                    d="M256,72a184,184,0,1,1-130.1,53.9A182.77,182.77,0,0,1,256,72m0-40C132.3,32,32,132.3,32,256S132.3,480,256,480,480,379.7,480,256,379.7,32,256,32Z" />
                            </svg>
                            <p>{{
                            userDetails.country
                            }}</p>
                        </div>
                        <div v-if="userDetails.major !== null && userDetails.major !== ''">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black"
                                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="30"
                                height="30" viewBox="0 0 512.001 512.001"
                                style="margin-top: -0px; enable-background:new 0 0 512.001 512.001;"
                                xml:space="preserve">
                                <g>
                                    <g>
                                        <path
                                            d="M64.682,0v349.827v30.422v81.125h75.125v50.628l41.293-16.055l41.293,16.055v-50.628h224.925v-81.125v-30.422V0H64.682z     M95.104,30.422h20.281v319.405H95.104V30.422z M139.807,430.952H95.104v-10.141h44.704V430.952z M170.229,467.533v-6.159v-40.562    h21.742v40.562v6.159l-10.871-4.226L170.229,467.533z M416.897,430.952H222.394v-10.141h194.503V430.952z M416.897,390.389    H222.394h-82.586H95.104v-10.141h321.793V390.389z M416.897,349.827H145.807V30.422h271.091V349.827z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect x="212.496" y="84.329" width="137.719" height="30.422" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect x="212.496" y="135.032" width="137.719" height="30.422" />
                                    </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </svg>
                            <p>{{ userDetails.major }}
                            </p>
                        </div>
                        <div v-if="userDetails.school !== null && userDetails.school !== ''">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                                data-name="Layer 1" viewBox="0 0 24 24">
                                <path
                                    d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z" />
                            </svg>
                            <p>{{ userDetails.school
                            }}</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                version="1.1" id="Layer_1" x="0px" y="0px" width="30" height="30" fill="black"
                                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                <g>
                                    <g>
                                        <rect y="478.609" width="512" height="33.391" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M256,0c-22.928,10.021-38.957,40.479-38.957,61.217c0,21.515,17.441,38.957,38.957,38.957s38.957-17.441,38.957-38.957    C294.957,40.479,278.928,10.021,256,0z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M411.826,200.348H278.261v-66.783h-44.522v66.783H100.174c-30.609,0-55.652,25.043-55.652,55.652v5.565    c23.599,0,36.453,10.555,45.841,18.262c8.109,6.658,13.004,10.677,24.651,10.677c11.646,0,16.54-4.019,24.649-10.677    c9.386-7.707,22.241-18.262,45.84-18.262s36.453,10.555,45.84,18.262c8.11,6.658,13.005,10.677,24.651,10.677    c11.646,0,16.541-4.019,24.649-10.677c9.386-7.707,22.24-18.262,45.839-18.262c23.6,0,36.457,10.555,45.844,18.262    c8.111,6.658,13.006,10.677,24.655,10.677s16.544-4.019,24.655-10.677c9.387-7.707,22.243-18.262,45.844-18.262V256    C467.478,225.391,442.435,200.348,411.826,200.348z" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M442.823,305.634c-9.387,7.708-22.243,18.262-45.843,18.262c-23.601,0-36.457-10.555-45.844-18.262    c-8.111-6.658-13.006-10.677-24.655-10.677c-11.646,0-16.54,4.019-24.649,10.677c-9.386,7.707-22.241,18.262-45.84,18.262    c-23.599,0-36.453-10.555-45.841-18.262c-8.11-6.658-13.004-10.677-24.651-10.677c-11.646,0-16.541,4.019-24.649,10.677    c-9.385,7.707-22.24,18.262-45.839,18.262c-23.599,0-36.453-10.555-45.841-18.262c-8.109-6.658-13.004-10.677-24.651-10.677    v150.261h422.957V294.957C455.829,294.957,450.934,298.976,442.823,305.634z" />
                                    </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </svg>
                            <p>{{ userDetails.createdAt.slice(0, 10)
                            }}</p>
                        </div>
                        <div v-if="userDetails.url !== null && userDetails.url !== ''">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"
                                version="1.1" fill="none" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="1.5">
                                <path d="m2.75 10.25h9.5m-8.5-4.5h9.5m-2.5-4-1.5 12.5m-2.5-12.5-1.5 12.5" />
                            </svg>
                            <p><a :href="userDetails.url">{{ userDetails.sns }}</a></p>
                        </div>
                    </a>
                </div>
            </div>
            <div class='profileEachRow' v-if="courseChartData.labels.length && loaded">
                <div>
                    <div class="profileCenterTitle">
                        <b>Course History</b>
                    </div>
                    <hr>
                    <a>
                        <Bar :chart-data="courseChartData" :chart-options="chartOptions" :style="{ height: courseHeight + 'vh' }" />
                    </a>
                </div>
            </div>
            <div class='profileEachRow' v-if="moduleChartData.labels.length && loaded">
                <div>
                    <div class="profileCenterTitle">
                        <b>Module History</b>
                    </div>
                    <hr>
                    <a>
                        <Bar :chart-data="moduleChartData" :chart-options="chartOptions" :style="{ height: moduleHeight + 'vh' }" />
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent v-if="userDetails !== null && loaded" />
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
    name: 'ProfilePage',
    components: {
        PulseLoader,
        FooterComponent,
        Bar
    },
    data() {
        return {
            moduleHeight: 0,
            courseHeight: 0,
            loaded: false,
            userDetails: null,
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
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                type: Object,
                default: () => {},
                indexAxis: "y",
                plugins: {
                    legend: {
                        display: false
                    }
                }
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
        getAllUserDetails() {
            let self = this
            axios.all([
                axios.get(`${process.env.VUE_APP_ROOT_API}/getUserDetailsByID/${this.$route.params.id}`),
                axios.get(`${process.env.VUE_APP_ROOT_API}/getUserCommentDetails/${this.$route.params.id}`),
                axios.get(`${process.env.VUE_APP_ROOT_API}/getUserModuleCommentDetails/${this.$route.params.id}`)
            ]).then(axios.spread((account, course, module) => {
                if (account.data.status && course.data.status && module.data.status) {
                    self.userDetails = account.data.data.username

                    course.data.data.forEach(key => {
                        self.courseChartData.labels.push(self.formatLabel(key.name.replaceAll('-', ' ')))
                        self.courseChartData.datasets[0].data.push(key.count)
                        self.courseHeight += 15
                    })

                    module.data.data.forEach(key => {
                        self.moduleChartData.labels.push(self.formatLabel(key.name.replaceAll('-', ' ')))
                        self.moduleChartData.datasets[0].data.push(key.count)
                        self.moduleHeight += 15
                    })

                    self.loaded = true
                }
            }))
        }
    },
    beforeMount() {
        this.getAllUserDetails()
    }
}
</script>
<style scoped>
@import '../assets/styles/profile.css';
</style>