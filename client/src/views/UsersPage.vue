<template>
  <div class='userContainer' v-if="!isMobile() && users.length">
    <div class="userOnlineDiv" :style="mobileCheck">
      <div class="userOnlineHead" v-if="!isMobile() && users.length">
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-gender-ambiguous"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z" />
          </svg></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" viewBox="0 0 512 512">
            <title>ionicons-v5-k</title>
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
          </svg></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" viewBox="0 0 512 512">
            <title>ionicons-v5-q</title>
            <polygon points="32 192 256 64 480 192 256 320 32 192"
              style="fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
            <polyline points="112 240 112 368 256 448 400 368 400 240"
              style="fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
            <line x1="480" y1="368" x2="480" y2="192"
              style="fill:white;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
            <line x1="256" y1="320" x2="256" y2="448"
              style="fill:white;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
          </svg></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" data-name="Layer 1"
            viewBox="0 0 24 24">
            <path
              d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z" />
          </svg></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" viewBox="0 0 512 512">
            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM349.8 349.8c5.594 12.03 .4375 26.31-11.56 31.94c-3.312 1.531-6.75 2.25-10.19 2.25c-9 0-17.66-5.125-21.75-13.81l-38.46-82.19H208v72c0 13.25-10.75 24-24 24s-24-10.75-24-24V152c0-13.25 10.75-24 24-24l88 .0044c44.13 0 80 35.88 80 80c0 28.32-14.87 53.09-37.12 67.31L349.8 349.8zM272 176h-64v64h64c17.66 0 32-14.34 32-32S289.7 176 272 176z" />
          </svg></div>
        <div class="userInputContainer">
          <input class="userInputText" id="input" placeholder="Username..." type="search"
            @input="searchChangeFunc($event)" />
        </div>
      </div>
      <div class="userOnlineBody mobileBody" v-if="users.length">
        <div v-for="user in filteredUsersList" :key="user.username">
          <div class='userEachRow'>
            <div class="userRow">
              <div>
                <router-link class="userMobileUsername" :to="'/profile/' + user.id">{{ user.username }}
                </router-link>
              </div>
              <div v-if="user.gender !== null && user.gender !== ''">{{ user.gender }}</div>
              <div v-if="user.gender === null">N/A</div>
              <div v-if="user.gender === ''">N/A</div>
              <div v-if="user.country !== null && user.country !== ''">{{ user.country }}</div>
              <div v-if="user.country === null">N/A</div>
              <div v-if="user.country === ''">N/A</div>
              <div v-if="user.major !== null && user.major !== ''">{{ user.major }}</div>
              <div v-if="user.major === null">N/A</div>
              <div v-if="user.major === ''">N/A</div>
              <div v-if="user.school !== null && user.school !== ''">{{ user.school }}</div>
              <div v-if="user.school === null">N/A</div>
              <div v-if="user.school === ''">N/A</div>
              <div>{{ user.joinedAt.slice(0, 10) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="userLoader" v-if="!users.length">
    <pulse-loader :loading="loading" :color="color"></pulse-loader>
  </div>
  <div v-if="isMobile() && users.length">
    <div class="userMostViewedContainer mobileUserMostViewedContainer" v-if="users.length">
      <div class="mostViewedPages">
        <div class="userMobileInputContainer">
          <input class="userInputText" id="input" placeholder="Search for username..." type="search"
            @input="searchChangeFunc($event)" />
        </div>
        <div class='userEachRow' v-for="user in filteredUsersList" :key="user.username">
          <p class="userAlignChild">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-person-circle"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <router-link class="mobileUsername" :to="'/profile/' + user.id">{{ user.username }}
            </router-link>
          </p>
          <p class="userAlignChild" v-if="user.gender !== null && user.gender !== '' && user.gender !== 'N/A'">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-gender-ambiguous"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z" />
            </svg>
            <a>{{ user.gender }}</a>
          </p>
          <p class="userAlignChild" v-if="user.country !== null && user.country !== ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 512 512">
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
            <a>{{ user.country }}</a>
          </p>
          <p class="userAlignChild" v-if="user.major !== null && user.major !== ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 512 512">
              <polygon points="32 192 256 64 480 192 256 320 32 192"
                style="fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
              <polyline points="112 240 112 368 256 448 400 368 400 240"
                style="fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
              <line x1="480" y1="368" x2="480" y2="192"
                style="fill:#000;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
              <line x1="256" y1="320" x2="256" y2="448"
                style="fill:#000;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
            </svg>
            <a>{{ user.major }}</a>
          </p>
          <p class="userAlignChild" v-if="user.school !== null && user.school !== ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" data-name="Layer 1"
              viewBox="0 0 24 24">
              <path
                d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z" />
            </svg>
            <a>{{ user.school }}</a>
          </p>
          <p class="userAlignChild">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 512 512">
              ! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License -
              https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright
              2022 Fonticons, Inc.
              <path
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM349.8 349.8c5.594 12.03 .4375 26.31-11.56 31.94c-3.312 1.531-6.75 2.25-10.19 2.25c-9 0-17.66-5.125-21.75-13.81l-38.46-82.19H208v72c0 13.25-10.75 24-24 24s-24-10.75-24-24V152c0-13.25 10.75-24 24-24l88 .0044c44.13 0 80 35.88 80 80c0 28.32-14.87 53.09-37.12 67.31L349.8 349.8zM272 176h-64v64h64c17.66 0 32-14.34 32-32S289.7 176 272 176z" />
            </svg>
            <a>{{ user.joinedAt.slice(0, 10) }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'UsersPage',
  components: {
    PulseLoader
  },
  data() {
    return {
      users: [],
      filteredUsersList: []
    }
  },
  methods: {
    searchChangeFunc(event) {
      this.filteredUsersList = []
      if (event.target.value.length) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username.toLowerCase().includes(event.target.value.toLowerCase())) {
            this.filteredUsersList.push(this.users[i])
          }
        }
      } else {
        this.filteredUsersList = this.users
      }
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    mobileCheck() {
      return this.isMobile() ? 'min-width: auto' : 'min-width: 90%'
    }
  },
  beforeMount() {
    let self = this
    axios({
      method: "GET",
      url: process.env.VUE_APP_ROOT_API + "/getAllUsers"
    }).then(function (response) {
      if (response.data.status) {
        response.data.data.slice().reverse().forEach(key => {
          self.users.push({
            id: key.id,
            username: key.username,
            gender: key.gender,
            school: key.school,
            major: key.major,
            country: key.country,
            joinedAt: key.createdAt
          })
        })
        self.filteredUsersList = self.users
      }
    })
  }
}
</script>
<style scoped>
@import '../assets/styles/users.css';
</style>