<template>
    <br><br><br><br>
    <div class="searchInput" :style="mobileInput">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        <div class="searchBarContainer">
            <form class="searchForm">
                <input type="search" class="searchInputText" placeholder="Search for your major..."
                    @input="searchChangeFunc($event)" required>
                <i class="fa fa-search"></i>
            </form>
        </div>
        <div class="searchLoader" v-if="!loaded">
            <pulse-loader :loading="loading" :color="color"></pulse-loader>
        </div>
        <table v-if="loaded" id="options" class="searchOptions">
            <tr v-for="major in filteredMajorsList" :key="major.id">
                <td scope="row">
                    <a @click="renderComment(major.id)">{{  major.name  }}</a>
                    <hr>
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
            filteredMajorsList: [],
            loaded: false
        }
    },
    methods: {
        renderComment(id) {
            this.$router.push('/comment/' + id)
            window.scrollTo(0, 0)
        },
        searchChangeFunc(event) {
            this.filteredMajorsList = []
            if (event.target.value.length > 0) {
                for (let i = 0; i < this.majorsList.length; i++) {
                    if (this.majorsList[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                        this.filteredMajorsList.push(this.majorsList[i])
                    }
                }
            } else {
                this.filteredMajorsList = this.majorsList
            }
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
                    self.filteredMajorsList = self.majorsList
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