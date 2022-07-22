<template>
    <div id='container'>
        <div id='BothContainer'>
            <div id='mostViewedContainer'>
                <h1>Most Visited Pages</h1>
                <div class='eachRow' v-for="row in sortedMostVisitedTable" :key="row.page">
                    <p>
                        <a v-bind:href="'/comment?major=' + row.page">{{ row.page }}</a>: {{ row.view }}
                    </p>
                </div>
            </div>
            <div id='mostCommentedContainer'>
                <h1>Most Commented Pages</h1>
                <div class='eachRow' v-for="row in sortedMostCommentedTable" :key="row.page">
                    <p>
                        <a v-bind:href="'/comment?major=' + row.page">{{ row.page }}</a>: {{ row.comment }}
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
#container {
    height: 800px;
    margin-top: 100px;
    text-align: center;
}

#BothContainer {
    display: flex;
    padding: 10px;
    /* margin-top: 40px; */
    justify-content: center;
}

#mostViewedContainer {
    height: 83vh;
    min-width: 40%;
    flex: 0;
    /* border-style: solid; */
    padding: 10px;
    margin-right: 30px;
    border-radius: 10px;
    background: rgb(146, 156, 161);
    overflow-y: scroll;
}

#mostViewedContainer h1,
#mostCommentedContainer h1 {
    color: white;
}

#mostCommentedContainer {
    height: 83vh;
    min-width: 40%;
    flex: 0;
    /* border-style: solid; */
    padding: 10px;
    margin-left: 30px;
    border-radius: 10px;
    background: rgb(146, 156, 161);
    overflow-y: scroll;
}

.eachRow {
    background: rgb(89, 95, 98);
    border-radius: 10px;
}

.eachRow p {
    padding: 20px;
    color: white;
}

.eachRow p a {
    color: rgb(255, 255, 255);
    text-decoration: none;
}

.eachRow p a:hover {
    color: rgb(98, 203, 255);
}
</style>