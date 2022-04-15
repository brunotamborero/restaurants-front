import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'vue-material-design-icons/styles.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

var token = localStorage.getItem('token');


if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    console.log('HOLAAAAA');

createApp(App).use(router).use(VueAxios, axios).mount('#app')