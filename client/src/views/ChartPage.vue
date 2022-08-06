<template>
    <div id='container' v-if="!isMobile()">
        <div id='BothContainer'>
            <div id='mostViewedContainer'>
                <h1>Visit</h1>
                <div class="mostViewedPages">
                    <div class='eachRow' v-for="row in sortedMostVisitedTable" :key="row.name">
                        <p>
                            <a class="tooltip" v-bind:href="'/comment?major=' + row.name">{{ row.name }}
                                <span class="tooltiptext">Click to visit</span>
                            </a>: {{ row.view }}
                        </p>
                    </div>
                </div>
            </div>
            <div id='mostCommentedContainer'>
                <h1>Comment</h1>
                <div class="mostCommentedPages">
                    <div class='eachRow' v-for="row in sortedMostCommentedTable" :key="row.name">
                        <p>
                            <a class="tooltip" v-bind:href="'/comment?major=' + row.name">{{ row.name }}
                                <span class="tooltiptext">Click to visit</span>
                            </a>: {{ row.comment }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Mobile Web View -->
    <div v-if="isMobile()">
        <div id='mostViewedContainer' class="mobileMostViewedContainer">
                <h1 class="mobileHeader">Visit</h1>
                <div class="mostViewedPages">
                    <div class='eachRow' v-for="row in sortedMostVisitedTable" :key="row.name">
                        <p>
                            <a class="tooltip" v-bind:href="'/comment?major=' + row.name">{{ row.name }}
                                <span class="tooltiptext">Click to visit</span>
                            </a>: {{ row.view }}
                        </p>
                    </div>
                </div>
            </div>
            <div id='mostCommentedContainer' class="mobileMostCommentedContainer">
                <h1 class="mobileHeader">Comment</h1>
                <div class="mostCommentedPages">
                    <div class='eachRow' v-for="row in sortedMostCommentedTable" :key="row.name">
                        <p>
                            <a class="tooltip" v-bind:href="'/comment?major=' + row.name">{{ row.name }}
                                <span class="tooltiptext">Click to visit</span>
                            </a>: {{ row.comment }}
                        </p>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ChartPage',
    data() {
        return {
            mostVisitedTable: [],
            mostCommentedTable: []
        }
    },
    computed: {
        sortedMostVisitedTable() {
            return this.sortDescending(this.mostVisitedTable, 'view')
        },
        sortedMostCommentedTable() {
            return this.sortDescending(this.mostCommentedTable, 'comment')
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
        sortDescending(list, key) {
            function compare(a, b) {
                a = a[key]
                b = b[key]

                var type = (typeof (a) === 'string' ||
                    typeof (b) === 'string') ? 'string' : 'number'
                var result

                if (type === 'string') {
                    result = a.localeCompare(b)
                } else {
                    result = b - a
                }
                return result
            }

            return list.sort(compare)
        }
    },
    mounted() {
        let self = this
        axios({
            method: "GET",
            url: "http://localhost:3000/getCount",
            params: {}
        }).then(function (response) {
            if (response.data.status) {
                for (var i = 0; i < response.data.message.length; i++) {
                    if (response.data.message[i].view !== 0) {
                        self.mostVisitedTable.push(response.data.message[i])
                    }
                    if (response.data.message[i].comment !== 0) {
                        self.mostCommentedTable.push(response.data.message[i])
                    }
                }
            }
        })
    }
};
</script>
<style scoped>
@import '../assets/styles/chart.css';
</style>