import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'vue-material-design-icons/styles.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import storage from './storage'
import VueNumberInput from '@chenfengyuan/vue-number-input';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

var token = localStorage.getItem('token');
var id = localStorage.getItem('id');
console.log(id)

if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

//createApp(App).use(router).use(VueAxios, axios).mount('#app')
createApp(App).use(router).use(storage).use(VueAxios, axios).component(VueNumberInput.name, VueNumberInput).mount('#app')