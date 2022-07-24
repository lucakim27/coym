<template>
    <div class='container'>
        <div class='BothContainer'>
            <div class='mostViewedContainer'>
                <h2>Users</h2>
                <div class='eachRow' v-for="user in users" :key="user">
                    <p>
                        <a v-bind:href="'/chat?counterpart=' + user" v-bind:id="user">
                            {{ user }}
                        </a>
                    </p>
                </div>
            </div>
            <div class='mostCommentedContainer'>
                <div class='eachRow' v-for="(msg, index) in messages" :key="index">
                    <p>{{ msg.user }}: {{ msg.message }}</p>
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
            users: ['user1', 'user2', 'user3'],
            messages: [],
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
        document.getElementById(this.getQueryVariable()).style.color = 'orange'

        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data]
        })

    }
}
</script>
<style scoped>
@import '../assets/styles/chat.css';
</style>