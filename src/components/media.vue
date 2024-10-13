<script setup>
//Import of ref, Axios and media data
import { links } from './links.js';
import axios from 'axios';
import { ref, watch } from 'vue';

const isOnline = ref(false)

// Enviromental info for login in the API
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

//User info to login in the API
const broadcasterId = '903650668'
const tokenUrl = 'https://id.twitch.tv/oauth2/token'
const helix = `https://api.twitch.tv/helix/streams?user_id=${broadcasterId}`

// Obtain URL parameters for the POST
const formData = new URLSearchParams()
formData.append('client_id', clientId)
formData.append('client_secret', clientSecret)
formData.append('grant_type', 'client_credentials')

axios.post(tokenUrl, formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
.then(tokenResponse => {
  const accessToken = tokenResponse.data.access_token

  axios.get(helix, {
    headers:{
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id': clientId,
    },
  })
  .then(streamResponse => {
    const streamInfo = streamResponse.data.data[0]
    isOnline.value = !!streamInfo

    console.log('channel Status:', isOnline.value)
  })
  .catch(error => {
    console.error('Error trying to obtain channel info:', error)
  })
})
.catch(error => {
  console.error('Token access error:', error)
})


watch(isOnline, newValue => {
  console.log('Channel Status changed to:', newValue)
})

//Function to open links listed in the links.js
function openLinks(url) {
  try {
    console.log(url);
    if (url) {
      window.open(url);
    } else {
      throw new Error('URL is undefined or empty');
    }
  } catch (error) {
    console.error('Error opening link:', error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center" v-for="link in links">
    <button class="flex justify-center items-center bg-gray-300/90 h-14 min-w-[320px] border-[3px] border-black  btn z-3"
        :data-content="link.nombre" @click="openLinks(link.url)"></button>
    <p v-if="link.nombre === 'Twitch' && isOnline === true" class="absolute top-0 left-0 text-white text-center bg-green-400 w-full rounded-b-lg z-4">LIVE ON TWITCH</p>
    <p v-if="link.nombre === 'Twitch'&& isOnline === false" class="absolute top-0 left-0 text-white text-center bg-red-500 w-full rounded-b-lg z-4">OFFLINE</p>  
  </div>
</template>

<style scoped>
.btn {
  box-shadow: 0 1em 1em rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn::before {
  content: '';
  position: absolute;
  width: 1100%;
  height: 3500%;
  background: var(--conic-gradient);
}

.btn::after {
  content: attr(data-content);
  position: absolute;
  background-color:#2F3044;
  width: 96%;
  height: 86%;
  border-radius: 0.4em;
  font-size: 2.5rem;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  transform: scale(1.1);
}

.btn:hover::before {
  animation: spin 2s infinite linear;
}

.btn:hover::after{
  background-color: #471bac;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>