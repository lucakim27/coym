<template>
    <br><br><br><br>
    <div class="searchInput" :style="mobileInput">
        <div class="searchLoader" v-if="!loaded">
            <pulse-loader :loading="loading" :color="color"></pulse-loader>
        </div>
        <table v-if="loaded" id="options" class="searchOptions">
            <tr v-for="major in majorsList" :key="major.id">
                <td scope="row">
                    <a @click="renderComment(major.id)">{{ major.name }}</a><hr>
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
            majorsList: [],
            loaded: false
        }
    },
    methods: {
        renderComment(id) {
            this.$router.push('/comment/' + id)
            window.scrollTo(0, 0)
        },
        getList() {
            let self = this
            axios.all([
                axios.get(process.env.VUE_APP_ROOT_API + "/getMajorList")
            ]).then(axios.spread((major) => {
                self.majorsList = major.data.message
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