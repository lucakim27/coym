<template>
    <div class='profileContainer' v-if="!isMobile()">
        <div class='profileBothContainer'>
            <div class='profileMostViewedContainer'>
                <div class="profileMostViewedPages">
                    <div style="display: flex;" class="profileUsernameContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                            class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <h3 v-if="userDetails !== null">{{ userDetails.username }}</h3>
                    </div>
                    <div class='profileEachRow'>
                        <div class="profileUserDetailsContainer">
                            <a>User Details</a>
                            <hr>
                            <a class="profileLoader" v-if="userDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="userDetails !== null" class="profileUserDetailsDesktopContainer">
                                <div>
                                    <svg style="margin-top: -5px; margin-right: -0px;"
                                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                        fill="white">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12.1888 7L12.1909 5L19.1909 5.00746L19.1834 12.0075L17.1834 12.0053L17.1873 8.41678L14.143 11.4611C15.4612 13.4063 15.2587 16.0743 13.5355 17.7975C11.5829 19.7501 8.41709 19.7501 6.46447 17.7975C4.51184 15.8449 4.51184 12.6791 6.46447 10.7264C8.16216 9.02873 10.777 8.80709 12.7141 10.0615L15.7718 7.00382L12.1888 7ZM7.87868 12.1406C9.05025 10.9691 10.9497 10.9691 12.1213 12.1406C13.2929 13.3122 13.2929 15.2117 12.1213 16.3833C10.9497 17.5549 9.05025 17.5549 7.87868 16.3833C6.70711 15.2117 6.70711 13.3122 7.87868 12.1406Z"
                                            fill="white" />
                                    </svg>
                                    <p v-if="userDetails.gender === null">N/A</p>
                                    <p v-if="userDetails.gender === ''">N/A</p>
                                    <p v-if="userDetails.gender !== null && userDetails.gender !== ''">{{
                                            userDetails.gender
                                    }}</p>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                        viewBox="0 0 512 512">
                                        <path d="M267,474l-.8-.13A.85.85,0,0,0,267,474Z" />
                                        <path
                                            d="M448.9,187.78a5.51,5.51,0,0,0-10.67-.63h0A5.52,5.52,0,0,1,433,191H417.53a5.48,5.48,0,0,1-2.84-.79l-22.38-13.42a5.48,5.48,0,0,0-2.84-.79h-35.8a5.48,5.48,0,0,0-3.06.93l-44.15,29.43A5.52,5.52,0,0,0,304,211v41.74a5.51,5.51,0,0,0,2.92,4.87l57.89,30.9a5.55,5.55,0,0,1,2.92,4.8L368,316.8a5.53,5.53,0,0,0,2.85,4.75l23.26,12.87a5.54,5.54,0,0,1,2.85,4.83v48.6a5.52,5.52,0,0,0,9.17,4.14c9.38-8.26,22.83-20.32,24.62-23.08q4.44-6.87,8.33-14.07a207.39,207.39,0,0,0,13.6-31C465.36,287.13,455.34,221.14,448.9,187.78Z" />
                                        <path
                                            d="M286.4,302.8l-61.33-46a4,4,0,0,0-2.4-.8h-29.1a3.78,3.78,0,0,1-2.68-1.11l-13.72-13.72a4,4,0,0,0-2.83-1.17H121.15a3.79,3.79,0,0,1-2.68-6.47l8.42-8.42a3.78,3.78,0,0,1,2.68-1.11h32.37a8,8,0,0,0,7.7-5.83l6.89-24.5a4,4,0,0,1,2-2.47L206,177.06a3.79,3.79,0,0,0,2.05-3.37v-12.5a3.82,3.82,0,0,1,.68-2.17L223.33,138a3.75,3.75,0,0,1,1.78-1.38l20.43-7.67a3.79,3.79,0,0,0,2.46-3.55V114a3.8,3.8,0,0,0-1.69-3.16L225.83,97.22A3.83,3.83,0,0,0,222,97l-27.88,13.94a3.78,3.78,0,0,1-4-.41L176.9,100.08a3.8,3.8,0,0,1,.1-6l10.74-7.91a3.78,3.78,0,0,0-.09-6.16L170.92,68.34a3.78,3.78,0,0,0-4-.22c-6.05,3.31-23.8,13.11-30.1,17.52a209.48,209.48,0,0,0-68.16,80c-1.82,3.76-4.07,7.59-4.29,11.72s-3.46,13.35-4.81,17.08a3.78,3.78,0,0,0,.24,3.1l35.69,65.58a3.74,3.74,0,0,0,1.38,1.44l37.55,22.54a3.78,3.78,0,0,1,1.81,2.73l7.52,54.54a3.82,3.82,0,0,0,1.61,2.61l29.3,20.14a4,4,0,0,1,1.65,2.48l15.54,73.8a3.6,3.6,0,0,0,.49,1.22c1.46,2.36,7.28,11,14.3,12.28-.65.18-1.23.59-1.88.78a47.63,47.63,0,0,1,5,1.16c2,.54,4,1,6,1.43,3.13.62,3.44,1.1,4.94-1.68,2-3.72,4.29-5,6-5.46a3.85,3.85,0,0,0,2.89-2.9l10.07-46.68a4,4,0,0,1,1.6-2.42l45-31.9a4,4,0,0,0,1.69-3.27V306A4,4,0,0,0,286.4,302.8Z" />
                                        <path
                                            d="M262,48s-3.65.21-4.39.23q-8.13.24-16.22,1.12A207.45,207.45,0,0,0,184.21,64c2.43,1.68-1.75,3.22-1.75,3.22L189,80h35l24,12,21-12Z" />
                                        <path
                                            d="M354.23,120.06l16.11-14a4,4,0,0,0-.94-6.65l-18.81-8.73a4,4,0,0,0-5.3,1.9l-7.75,16.21a4,4,0,0,0,1.49,5.11l10.46,6.54A4,4,0,0,0,354.23,120.06Z" />
                                        <path
                                            d="M429.64,140.67l-5.83-9c-.09-.14-.17-.28-.25-.43-1.05-2.15-9.74-19.7-17-26.51-5.45-5.15-7-3.67-7.43-2.53a3.77,3.77,0,0,1-1.19,1.6L369.1,127.11a4,4,0,0,1-2.51.89H351.66a4,4,0,0,0-2.83,1.17l-12,12a4,4,0,0,0,0,5.66l12,12a4,4,0,0,0,2.83,1.17h75.17a4,4,0,0,0,4-4.17l-.55-13.15A4,4,0,0,0,429.64,140.67Z" />
                                        <path
                                            d="M256,72a184,184,0,1,1-130.1,53.9A182.77,182.77,0,0,1,256,72m0-40C132.3,32,32,132.3,32,256S132.3,480,256,480,480,379.7,480,256,379.7,32,256,32Z" />
                                    </svg>
                                    <p v-if="userDetails.country === null">N/A</p>
                                    <p v-if="userDetails.country === ''">N/A</p>
                                    <p v-if="userDetails.country !== null && userDetails.country !== ''">{{
                                            userDetails.country
                                    }}</p>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="30"
                                        height="30" viewBox="0 0 512.001 512.001"
                                        style="margin-top:2px; enable-background:new 0 0 512.001 512.001;"
                                        xml:space="preserve">
                                        <g>
                                            <g>
                                                <path
                                                    d="M64.682,0v349.827v30.422v81.125h75.125v50.628l41.293-16.055l41.293,16.055v-50.628h224.925v-81.125v-30.422V0H64.682z     M95.104,30.422h20.281v319.405H95.104V30.422z M139.807,430.952H95.104v-10.141h44.704V430.952z M170.229,467.533v-6.159v-40.562    h21.742v40.562v6.159l-10.871-4.226L170.229,467.533z M416.897,430.952H222.394v-10.141h194.503V430.952z M416.897,390.389    H222.394h-82.586H95.104v-10.141h321.793V390.389z M416.897,349.827H145.807V30.422h271.091V349.827z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <rect x="212.496" y="84.329" width="137.719" height="30.422" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <rect x="212.496" y="135.032" width="137.719" height="30.422" />
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <p v-if="userDetails.major === null"> N/A</p>
                                    <p v-if="userDetails.major === ''">N/A</p>
                                    <p v-if="userDetails.major !== null && userDetails.major !== ''">{{
                                            userDetails.major
                                    }}</p>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                        data-name="Layer 1" viewBox="0 0 24 24">
                                        <path
                                            d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z" />
                                    </svg>
                                    <p v-if="userDetails.school === null"> N/A</p>
                                    <p v-if="userDetails.school === ''">N/A</p>
                                    <p v-if="userDetails.school !== null && userDetails.school !== ''">{{
                                            userDetails.school
                                    }}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class='profileEachRow'>
                        <div>
                            <a>Comment History</a>
                            <hr>
                            <a class="profileLoader" v-if="commentDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="commentDetails !== null && commentDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in commentDetails" :key="comment.name">
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
                            </a>
                        </div>
                    </div>
                    <div class='profileEachRow'>
                        <div>
                            <a>Reply History</a>
                            <hr>
                            <a class="profileLoader" v-if="replyDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="replyDetails !== null && replyDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in replyDetails" :key="comment.name">
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
                            </a>
                        </div>
                    </div>
                    <div class='profileEachRow'>
                        <div>
                            <a>Like History</a>
                            <hr>
                            <a class="profileLoader" v-if="likeDetails === null">
                                <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                            </a>
                            <a v-if="likeDetails !== null && likeDetails.length === 0">
                                <p>There's no history</p>
                            </a>
                            <a v-for="comment in likeDetails" :key="comment.name">
                                <p>
                                    <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>
                                    :
                                    {{ comment.count }}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isMobile()">
        <div class="profileMostViewedContainer profileMobileMostViewedContainer">
            <div class="profileMostViewedPages profileMobileContainer">
                <div style="display: flex;" class="profileUsernameContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <h3 v-if="userDetails !== null">{{ userDetails.username }}</h3>
                </div>
                <div class='profileEachRow'>
                    <div class="profileUserDetailsContainer profileUserDetailsMobileContainer">
                        <a>User Details</a>
                        <hr>
                        <a class="profileLoader" v-if="userDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="userDetails !== null">
                            <div>
                                <svg style="margin-top: -5px; margin-left: -4px;"
                                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                        fill="white">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12.1888 7L12.1909 5L19.1909 5.00746L19.1834 12.0075L17.1834 12.0053L17.1873 8.41678L14.143 11.4611C15.4612 13.4063 15.2587 16.0743 13.5355 17.7975C11.5829 19.7501 8.41709 19.7501 6.46447 17.7975C4.51184 15.8449 4.51184 12.6791 6.46447 10.7264C8.16216 9.02873 10.777 8.80709 12.7141 10.0615L15.7718 7.00382L12.1888 7ZM7.87868 12.1406C9.05025 10.9691 10.9497 10.9691 12.1213 12.1406C13.2929 13.3122 13.2929 15.2117 12.1213 16.3833C10.9497 17.5549 9.05025 17.5549 7.87868 16.3833C6.70711 15.2117 6.70711 13.3122 7.87868 12.1406Z"
                                            fill="white" />
                                    </svg>
                                <p style="margin-left: -7px;" v-if="userDetails.gender === null">N/A</p>
                                <p style="margin-left: -7px;" v-if="userDetails.gender === ''">N/A</p>
                                <p style="margin-left: -7px;" v-if="userDetails.gender !== null && userDetails.gender !== ''">{{ userDetails.gender
                                }}</p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                    viewBox="0 0 512 512">
                                    <path d="M267,474l-.8-.13A.85.85,0,0,0,267,474Z" />
                                    <path
                                        d="M448.9,187.78a5.51,5.51,0,0,0-10.67-.63h0A5.52,5.52,0,0,1,433,191H417.53a5.48,5.48,0,0,1-2.84-.79l-22.38-13.42a5.48,5.48,0,0,0-2.84-.79h-35.8a5.48,5.48,0,0,0-3.06.93l-44.15,29.43A5.52,5.52,0,0,0,304,211v41.74a5.51,5.51,0,0,0,2.92,4.87l57.89,30.9a5.55,5.55,0,0,1,2.92,4.8L368,316.8a5.53,5.53,0,0,0,2.85,4.75l23.26,12.87a5.54,5.54,0,0,1,2.85,4.83v48.6a5.52,5.52,0,0,0,9.17,4.14c9.38-8.26,22.83-20.32,24.62-23.08q4.44-6.87,8.33-14.07a207.39,207.39,0,0,0,13.6-31C465.36,287.13,455.34,221.14,448.9,187.78Z" />
                                    <path
                                        d="M286.4,302.8l-61.33-46a4,4,0,0,0-2.4-.8h-29.1a3.78,3.78,0,0,1-2.68-1.11l-13.72-13.72a4,4,0,0,0-2.83-1.17H121.15a3.79,3.79,0,0,1-2.68-6.47l8.42-8.42a3.78,3.78,0,0,1,2.68-1.11h32.37a8,8,0,0,0,7.7-5.83l6.89-24.5a4,4,0,0,1,2-2.47L206,177.06a3.79,3.79,0,0,0,2.05-3.37v-12.5a3.82,3.82,0,0,1,.68-2.17L223.33,138a3.75,3.75,0,0,1,1.78-1.38l20.43-7.67a3.79,3.79,0,0,0,2.46-3.55V114a3.8,3.8,0,0,0-1.69-3.16L225.83,97.22A3.83,3.83,0,0,0,222,97l-27.88,13.94a3.78,3.78,0,0,1-4-.41L176.9,100.08a3.8,3.8,0,0,1,.1-6l10.74-7.91a3.78,3.78,0,0,0-.09-6.16L170.92,68.34a3.78,3.78,0,0,0-4-.22c-6.05,3.31-23.8,13.11-30.1,17.52a209.48,209.48,0,0,0-68.16,80c-1.82,3.76-4.07,7.59-4.29,11.72s-3.46,13.35-4.81,17.08a3.78,3.78,0,0,0,.24,3.1l35.69,65.58a3.74,3.74,0,0,0,1.38,1.44l37.55,22.54a3.78,3.78,0,0,1,1.81,2.73l7.52,54.54a3.82,3.82,0,0,0,1.61,2.61l29.3,20.14a4,4,0,0,1,1.65,2.48l15.54,73.8a3.6,3.6,0,0,0,.49,1.22c1.46,2.36,7.28,11,14.3,12.28-.65.18-1.23.59-1.88.78a47.63,47.63,0,0,1,5,1.16c2,.54,4,1,6,1.43,3.13.62,3.44,1.1,4.94-1.68,2-3.72,4.29-5,6-5.46a3.85,3.85,0,0,0,2.89-2.9l10.07-46.68a4,4,0,0,1,1.6-2.42l45-31.9a4,4,0,0,0,1.69-3.27V306A4,4,0,0,0,286.4,302.8Z" />
                                    <path
                                        d="M262,48s-3.65.21-4.39.23q-8.13.24-16.22,1.12A207.45,207.45,0,0,0,184.21,64c2.43,1.68-1.75,3.22-1.75,3.22L189,80h35l24,12,21-12Z" />
                                    <path
                                        d="M354.23,120.06l16.11-14a4,4,0,0,0-.94-6.65l-18.81-8.73a4,4,0,0,0-5.3,1.9l-7.75,16.21a4,4,0,0,0,1.49,5.11l10.46,6.54A4,4,0,0,0,354.23,120.06Z" />
                                    <path
                                        d="M429.64,140.67l-5.83-9c-.09-.14-.17-.28-.25-.43-1.05-2.15-9.74-19.7-17-26.51-5.45-5.15-7-3.67-7.43-2.53a3.77,3.77,0,0,1-1.19,1.6L369.1,127.11a4,4,0,0,1-2.51.89H351.66a4,4,0,0,0-2.83,1.17l-12,12a4,4,0,0,0,0,5.66l12,12a4,4,0,0,0,2.83,1.17h75.17a4,4,0,0,0,4-4.17l-.55-13.15A4,4,0,0,0,429.64,140.67Z" />
                                    <path
                                        d="M256,72a184,184,0,1,1-130.1,53.9A182.77,182.77,0,0,1,256,72m0-40C132.3,32,32,132.3,32,256S132.3,480,256,480,480,379.7,480,256,379.7,32,256,32Z" />
                                </svg>
                                <p v-if="userDetails.country === null">N/A</p>
                                <p v-if="userDetails.country === ''">N/A</p>
                                <p v-if="userDetails.country !== null && userDetails.country !== ''">{{
                                        userDetails.country
                                }}</p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="30"
                                        height="30" viewBox="0 0 512.001 512.001"
                                        style="margin-top: -0px; enable-background:new 0 0 512.001 512.001;"
                                        xml:space="preserve">
                                        <g>
                                            <g>
                                                <path
                                                    d="M64.682,0v349.827v30.422v81.125h75.125v50.628l41.293-16.055l41.293,16.055v-50.628h224.925v-81.125v-30.422V0H64.682z     M95.104,30.422h20.281v319.405H95.104V30.422z M139.807,430.952H95.104v-10.141h44.704V430.952z M170.229,467.533v-6.159v-40.562    h21.742v40.562v6.159l-10.871-4.226L170.229,467.533z M416.897,430.952H222.394v-10.141h194.503V430.952z M416.897,390.389    H222.394h-82.586H95.104v-10.141h321.793V390.389z M416.897,349.827H145.807V30.422h271.091V349.827z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <rect x="212.496" y="84.329" width="137.719" height="30.422" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <rect x="212.496" y="135.032" width="137.719" height="30.422" />
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                <p v-if="userDetails.major === null"> N/A</p>
                                <p v-if="userDetails.major === ''">N/A</p>
                                <p v-if="userDetails.major !== null && userDetails.major !== ''">{{ userDetails.major }}
                                </p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                    data-name="Layer 1" viewBox="0 0 24 24">
                                    <path
                                        d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z" />
                                </svg>
                                <p v-if="userDetails.school === null"> N/A</p>
                                <p v-if="userDetails.school === ''">N/A</p>
                                <p v-if="userDetails.school !== null && userDetails.school !== ''">{{ userDetails.school
                                }}</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class='profileEachRow'>
                    <div>
                        <a>Comment History</a>
                        <hr>
                        <a class="profileLoader" v-if="commentDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="commentDetails !== null && commentDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in commentDetails" :key="comment.name">
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
                        </a>
                    </div>
                </div>
                <div class='profileEachRow'>
                    <div>
                        <a>Reply History</a>
                        <hr>
                        <a class="profileLoader" v-if="replyDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="replyDetails !== null && replyDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in replyDetails" :key="comment.name">
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
                        </a>
                    </div>
                </div>
                <div class='profileEachRow'>
                    <div>
                        <a>Like History</a>
                        <hr>
                        <a class="profileLoader" v-if="likeDetails === null">
                            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                        </a>
                        <a v-if="likeDetails !== null && likeDetails.length === 0">
                            <p>There's no history</p>
                        </a>
                        <a v-for="comment in likeDetails" :key="comment.name">
                            <p>
                                <router-link :to="'/comment/' + comment.id">{{ comment.name }}</router-link>:
                                {{ comment.count }}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <FooterComponent />
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name: 'ProfilePage',
    components: {
        PulseLoader,
        FooterComponent
    },
    data() {
        return {
            userDetails: null,
            commentDetails: null,
            replyDetails: null,
            likeDetails: null
        }
    },
    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    },
    beforeMount() {
        let self = this
        axios.all([
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserDetailsByID/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserCommentDetails/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserReplyDetails/${this.$route.params.id}`),
            axios.get(`${process.env.VUE_APP_ROOT_API}/getUserLikeDetails/${this.$route.params.id}`),
        ]).then(axios.spread((account, comment, reply, like) => {
            if (account.data.status && comment.data.status && reply.data.status && like.data.status) {
                self.userDetails = account.data.data.username
                self.commentDetails = comment.data.data
                self.replyDetails = reply.data.data
                self.likeDetails = like.data.data
            }
        }))

    }
}
</script>
<style scoped>
@import '../assets/styles/profile.css';
</style>