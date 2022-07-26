<template>
    <div class='container'>
        <div class='BothContainer'>
            <div class='mostViewedContainer'>
                <h2>Users</h2>
                <div class='eachRow' v-for="user in users" :key="user">
                    <p v-if="user.username !== username">
                        <a v-bind:href="'/chat?counterpart=' + user.username" v-bind:id="user.username">
                            {{ user.username }}
                        </a>
                    </p>
                    <p v-else>
                        <a v-bind:href="'/chat?counterpart=' + user.counterpart" v-bind:id="user.counterpart">
                            {{ user.counterpart }}
                        </a>
                    </p>
                </div>
            </div>
            <div class='mostCommentedContainer'>
                <div class="commentArea">
                    <div class='eachRow' v-for="chat in chats" :key="chat">
                        <div v-if="chat.username === username" class="userChat">
                            {{ chat.text }}
                        </div>
                        <div v-else-if="chat.username === counterpart" class="counterpartChat">
                            {{ chat.text }}
                        </div>
                        <!-- <p v-if="chat.username === username" style="text-align: right;">{{ chat.username }}: {{ chat.text }} {{ chat.date }}</p>
                        <p v-else-if="chat.username === counterpart" style="text-align: left;">{{ chat.username }}: {{ chat.text }} {{ chat.date }}</p> -->
                        <!-- <p>{{ chat.username }}: {{ chat.text }} {{ chat.date }}</p> -->
                    </div>
                </div>
                <form class="input" @submit.prevent="sendMessage">
                    <input type="text" placeholder="Enter your chat..." v-model="message">
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
import { useCookies } from "vue3-cookies"

export default {
    data() {
        return {
            username: '',
            message: '',
            counterpart: '',
            users: [],
            chats: [],
            socket: io('localhost:3001', {
                transports: ['websocket']
            })
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    methods: {
        getQueryVariable() {
            var query = window.location.search.substring(1)
            var vars = query.split('&')
            var returnValue = ''
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=')
                if (pair.length !== 1) {
                    for (var j = 0; j < pair.length; j++) {
                        if (pair[j] !== 'counterpart') {
                            returnValue += pair[j]
                        }
                    }
                } else {
                    returnValue += pair[0]
                }
            }
            return decodeURIComponent(returnValue)
        },
        sendMessage(e) {
            e.preventDefault();
            this.socket.emit('sendMessage',
                this.username,
                this.counterpart,
                this.message
            )
            this.message = ''
        }
    },
    mounted() {
        let user = this.cookies.get("user")
        if (user !== null) {
            this.username = this.cookies.get("user").username
        }

        this.counterpart = this.getQueryVariable()
        this.socket.emit('chatPageJoin', this.username, this.counterpart)

        this.socket.on('sendChatUser', (data) => {
            console.log(...JSON.parse(data)[0])
            this.users = [...JSON.parse(data)[0]]
        })

        this.socket.on('sendChat', (data) => {
            console.log(...JSON.parse(data)[0])
            this.chats = [...JSON.parse(data)[0]]
        })

    },
    updated() {
        try {
            document.getElementById(this.counterpart).style.color = 'rgb(98, 203, 255)'
        } catch (e) {
            console.log(e)
        }
    }
}
</script>
<style scoped>
@import '../assets/styles/chat.css';
</style>