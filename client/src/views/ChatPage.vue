<template>
    <div class='container' v-if="!isMobile()">
        <div class='BothContainer'>
            <div class='mostViewedContainer'>
                <div v-for="user in users" :key="user">
                    <div class='eachRow' v-if="user.username !== username">
                        <p>
                            <a v-bind:href="'/chat?counterpart=' + user.username" v-bind:id="user.username">
                                {{ user.username }}
                            </a>
                        </p>
                    </div>
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
                    <button type="submit" class="sendChatBtn"><svg xmlns="http://www.w3.org/2000/svg" width='15' height='15' viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" class="ci-primary"/> </svg></button>
                </form>
            </div>
        </div>
    </div>
    <!-- Mobile Web View -->
    <div class='container' v-if="isMobile()">
        <div class='BothContainer'>
            <div class='chatUserContainer mostViewedContainer' v-if="!renderChat">
                <div v-for="user in users" :key="user">
                    <div class='eachRow' v-if="user.username !== username">
                        <p>
                            <a v-bind:href="'/chat?counterpart=' + user.username" v-bind:id="user.username">
                                {{ user.username }}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class='chatContainer mostCommentedContainer' v-if="renderChat">
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
                    <button type="submit" class="sendChatBtn"><svg xmlns="http://www.w3.org/2000/svg" width='15' height='15' viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" class="ci-primary"/> </svg></button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
// import io from 'socket.io-client'
import { useCookies } from "vue3-cookies"

export default {
    data() {
        return {
            username: '',
            message: '',
            counterpart: '',
            users: [],
            chats: []
            // socket: io('http://localhost:3001', {
            //     transports: ['websocket']
            // }),
            // renderChat: false
        }
    },
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    methods: {
        isMobile() {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return true
			} else {
				return false
			}
		},
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
            e.preventDefault()
            if (this.message === '') {
                alert("You have not typed anything yet.")
            } else {
                this.socket.emit('sendMessage',
                    this.username,
                    this.counterpart,
                    this.message
                )
                this.message = ''
            }
        }
    },
    mounted() {
        this.counterpart = this.getQueryVariable()
        let user = this.cookies.get("user")
        if (user !== null) {
            this.username = this.cookies.get("user").username

            if (this.counterpart === '') {
                this.socket.emit('chatPageJoin', this.username)
            } else {
                this.socket.emit('chatUserSelected', this.username, this.counterpart)
            }

            // this.socket.on('sendChatUser', (data) => {
            //     this.users = [...JSON.parse(data)]
            // })

            // this.socket.on('sendChat', (data) => {
            //     this.chats = [...JSON.parse(data)[0]]
            // })
        }

        if (this.counterpart === '') {
            this.renderChat = false
        } else {
            this.renderChat = true
        }


    },
    updated() {
        try {
            document.getElementById(this.counterpart).style.color = 'rgb(98, 203, 255)'
        } catch (e) {
            // console.log(e)
        }
    }
}
</script>
<style scoped>
@import '../assets/styles/chat.css';
</style>