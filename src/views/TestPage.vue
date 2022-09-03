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
            <h3>What's your hobby?</h3>
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
            hobby: '3D printing',
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
                '3D printing',
                'Amateur radio',
                'Scrapbook',
                'Amateur radio',
                'Acting',
                'Baton twirling',
                'Board games',
                'Book restoration',
                'Cabaret',
                'Calligraphy',
                'Candle making',
                'Computer programming',
                'Coffee roasting',
                'Cooking',
                'Colouring',
                'Cosplaying',
                'Couponing',
                'Creative writing',
                'Crocheting',
                'Cryptography',
                'Dance',
                'Digital arts',
                'Drama',
                'Drawing',
                'Do it yourself',
                'Electronics',
                'Embroidery',
                'Fashion',
                'Flower arranging',
                'Foreign language learning',
                'Gaming',
                'Tabletop games',
                'Role-playing games',
                'Gambling',
                'Genealogy',
                'Glassblowing',
                'Gunsmithing',
                'Homebrewing',
                'Ice skating',
                'Jewelry making',
                'Jigsaw puzzles',
                'Juggling',
                'Knapping',
                'Knitting',
                'Kabaddi',
                'Knife making',
                'Lacemaking',
                'Lapidary',
                'Leather crafting',
                'Lego building',
                'Lockpicking',
                'Machining',
                'Macrame',
                'Metalworking',
                'Magic',
                'Model building',
                'Listening to music',
                'Origami',
                'Painting',
                'Playing musical instruments',
                'Pet',
                'Poi',
                'Pottery',
                'Puzzles',
                'Quilting',
                'Reading',
                'Scrapbooking',
                'Sculpting',
                'Sewing',
                'Singing',
                'Sketching',
                'Soapmaking',
                'Sports',
                'Stand-up comedy',
                'Sudoku',
                'Table tennis',
                'Taxidermy',
                'Video gaming',
                'Watching movies',
                'Web surfing',
                'Whittling',
                'Wood carving',
                'Woodworking',
                'World Building',
                'Writing',
                'Yoga',
                'Yo-yoing',
                'Air sports',
                'Archery',
                'Astronomy',
                'Backpacking',
                'Base jumping',
                'Baseball',
                'Basketball',
                'Beekeeping',
                'Bird watching',
                'Blacksmithing',
                'Board sports',
                'Bodybuilding',
                'Brazilian jiu-jitsu',
                'Community',
                'Cycling',
                'Dowsing',
                'Driving',
                'Fishing',
                'Flag football',
                'Flying',
                'Flying disc',
                'Foraging',
                'Gardening',
                'Geocaching',
                'Ghost hunting',
                'Graffiti',
                'Handball',
                'Hiking',
                'Hooping',
                'Horseback riding',
                'Hunting',
                'Inline skating',
                'Jogging',
                'Kayaking',
                'Kite flying',
                'Kitesurfing',
                'Larping',
                'Letterboxing',
                'Metal detecting',
                'Motor sports',
                'Mountain biking',
                'Mountaineering',
                'Mushroom hunting',
                'Mycology',
                'Netball',
                'Nordic skating',
                'Orienteering',
                'Paintball',
                'Parkour',
                'Photography',
                'Polo',
                'Rafting',
                'Rappelling',
                'Rock climbing',
                'Roller skating',
                'Rugby',
                'Running',
                'Sailing',
                'Sand art',
                'Scouting',
                'Scuba diving',
                'Sculling',
                'Rowing',
                'Shooting',
                'Shopping',
                'Skateboarding',
                'Skiing',
                'Skim Boarding',
                'Skydiving',
                'Slacklining',
                'Snowboarding',
                'Stone skipping',
                'Surfing',
                'Swimming',
                'Taekwondo',
                'Tai chi',
                'Urban exploration',
                'Vacation',
                'Vehicle restoration',
                'Water sports'
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