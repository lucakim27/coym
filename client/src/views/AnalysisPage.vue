<template>
    <div id='container' v-if="!isMobile()">
        <div id='BothContainer'>

            <div id='mostViewedContainer'>
                <div class="mostViewedPages">

                    <div class='eachRow' v-for="row in mostCommentedTable" :key="row.name">

                        <div>
                            <a v-bind:href="'/comment?major=' + row.name" class="majorTitle">{{ row.name }}</a><hr>
                            <div style="display: flex; justify-content: center" class="centerChild">
                                <a>Comment: {{ row.comment }}</a><br>
                                <a>Like: {{ row.like }}</a><br>
                                <a>Reply: {{ row.reply }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- Mobile Web View -->
    <div v-if="isMobile()">
        <div id='mostViewedContainer' class="mobileMostViewedContainer">
            <div class="mostViewedPages mobileContainer">
                <div class='eachRow' v-for="row in mostCommentedTable" :key="row.name">
                    <div>
                        <a v-bind:href="'/comment?major=' + row.name" class="majorTitle">{{ row.name }}</a><hr>
                        <a>Comment: {{ row.comment }}</a><br>
                        <a>Like: {{ row.like }}</a><br>
                        <a>Reply: {{ row.reply }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'AnalysisPage',
    data() {
        return {
            mostCommentedTable: []
        }
    },
    computed: {
        // sortedMostVisitedTable() {
        //     return this.sortDescending(this.mostVisitedTable, 'view')
        // },
        // sortedMostCommentedTable() {
        //     return this.sortDescending(this.mostCommentedTable, 'comment')
        // }
    },
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
        // sortDescending(list, key) {
        //     function compare(a, b) {
        //         a = a[key]
        //         b = b[key]

        //         var type = (typeof (a) === 'string' ||
        //             typeof (b) === 'string') ? 'string' : 'number'
        //         var result

        //         if (type === 'string') {
        //             result = a.localeCompare(b)
        //         } else {
        //             result = b - a
        //         }
        //         return result
        //     }

        //     return list.sort(compare)
        // }
    },
    mounted() {
        let self = this


        axios.all([

            // axios.get("https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getCommentCount"),
            axios.get("http://localhost:3000/getCommentCount"), 

            // axios.get("https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getReplyCount"),
            axios.get("http://localhost:3000/getReplyCount"), 

            // axios.get("https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getLikeCount"),
            axios.get("http://localhost:3000/getLikeCount"), 

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
                        name: key1.name, comment: 1, reply: 0, like: 0
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
                        name: key1.name, reply: 1, comment: 0, like: 0
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
                        name: key1.name, like: 1, comment: 0, reply: 0
                    })
                }
            })

            self.mostCommentedTable = count

        }))


    }
};
</script>
<style scoped>
@import '../assets/styles/analysis.css';
</style>