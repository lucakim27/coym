<template>
    <br><br><br><br>
    <div class="searchInput" :style="mobileInput">
        <div class="searchLoader" v-if="!loaded">
            <pulse-loader :loading="loading" :color="color"></pulse-loader>
        </div>
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
        <table v-if="loaded && option === 'course'" id="options" class="searchOptions">
            <tr v-for="major in majorsList" :key="major.id">
                <td scope="row">
                    <a @click="renderComment(major.id)">{{ major.name }}</a><br><br>
                </td>
            </tr>
        </table>
        <table v-if="loaded && option === 'module'" id="options" class="searchOptions">
            <tr v-for="module in modulesList" :key="module.id">
                <td scope="row">
                    <a @click="renderModule()">{{ module.name }}</a><br><br>
                </td>
            </tr>
        </table>
    </div>
    <div>
        <FooterComponent v-if="loaded" />
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'SearchPage',
    components: {
        PulseLoader,
        FooterComponent
    },
    data() {
        return {
            option: 'course',
            majorsList: [],
            modulesList: [],
            loaded: false
        }
    },
    methods: {
        renderModule() {
            alert("We're under maintenance.")
        },
        renderComment(id) {
            this.$router.push('/comment/' + id)
            window.scrollTo(0, 0)
        },
        getList() {
            let self = this
            axios.all([
                axios.get(process.env.VUE_APP_ROOT_API + "/getMajorList"),
                axios.get(process.env.VUE_APP_ROOT_API + "/getModuleList")
            ]).then(axios.spread((major, course) => {
                self.majorsList = major.data.message
                self.modulesList = course.data.message
                self.loaded = true
            }))
        }
    },
    beforeMount() {
        this.getList()
    }
}
</script>
<style scoped>
@import '../assets/styles/search.css';
</style>