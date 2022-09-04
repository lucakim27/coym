<template>
    <br><br><br><br>
    <div class="searchInput" :style="mobileInput">
        <div class="searchLoader" v-if="!loaded">
            <pulse-loader :loading="loading" :color="color"></pulse-loader>
        </div>
        <table v-if="loaded" id="options" class="searchOptions">
            <tr v-for="major in majorsList" :key="major.id">
                <td scope="row">
                    <a @click="renderComment(major.id)">{{  major.name  }}</a>
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
        getMajorList() {
            let self = this
            axios({
                method: "GET",
                url: process.env.VUE_APP_ROOT_API + "/getMajorList"
            }).then(function (response) {
                if (response.data.status) {
                    response.data.message.forEach(key => {
                        self.majorsList.push({ name: key.name, id: key.id })
                    })
                    self.loaded = true
                }
            })
        }
    },
    beforeMount() {
        this.getMajorList()
    }
}
</script>
    <style scoped>
    @import '../assets/styles/search.css';
    </style>