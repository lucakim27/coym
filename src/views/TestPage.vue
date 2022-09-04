<template>
    <div class="testContainer">
        <div class="testEachContainer" :style="mobileCheck">
            <h3>What's your MBTI type?</h3>
            <div class="testCenterChild">
                <select v-model="mbti">
                    <option :value="mbti" v-for="mbti in mbtiTypes" :key="mbti">{{ mbti }}</option>
                </select>
            </div>
        </div>
        <div class="testEachContainer" :style="mobileCheck">
            <h3>What's your type of hobby?</h3>
            <div class="testCenterChild">
                <select v-model="hobby">
                    <option :value="hobby" v-for="hobby in hobbies" :key="hobby">{{ hobby }}</option>
                </select>
            </div>
        </div>
        <div class="testEachContainer" :style="mobileCheck">
            <h3>What's your favorite subject?</h3>
            <div class="testCenterChild">
                <select v-model="subject">
                    <option :value="subject" v-for="subject in subjects" :key="subject">{{ subject }}</option>
                </select>
            </div>
        </div>
        <div class="testEachContainer" :style="mobileCheck">
            <div class="testCenterChild">
                <button @click="analyze()">Analyze</button>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent />
    </div>
</template>
<script>
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'TestPage',
    components: {
        FooterComponent
    },
    data() {
        return {
            mbti: 'ISTJ',
            hobby: 'A creative hobby',
            subject: 'English Language Arts',
            subjects: [
                'English Language Arts',
                'Social Studies',
                'Mathematics',
                'Sciences'
            ],
            mbtiTypes: [
                'ISTJ',
                'ISFJ',
                'INFJ',
                'INTJ',
                'ISTP',
                'ISFP',
                'INFP',
                'INTP',
                'ESTP',
                'ESFP',
                'ENFP',
                'ENTP',
                'ESTJ',
                'ESFJ',
                'ENFJ',
                'ENTJ'
            ],
            hobbies: [
                'A creative hobby',
                'A hobby to socialize',
                'A hobby to stay in shape',
                'A hobby to learn',
                'A hobby that makes money'
            ]
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
        analyze() {
            alert("We're under maintanence.")
        }
    },
    computed: {
        mobileCheck() {
            if (this.isMobile()) {
                return 'padding: 10px !important; margin: 10px !important;'
            } else {
                return 'padding: 30px !important; margin: 30px !important;'
            }
        }
    }
}
</script>
    <style scoped>
    @import '../assets/styles/test.css';
    </style>