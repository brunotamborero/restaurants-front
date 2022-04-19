import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist'
import router from "@/router";


const storage = createStore({
    state: {
        isAuthenticated: false,
        username: '',
        id: null
    },
    mutations: {
        setAuthenticated(state, value)
        {
            state.isAuthenticated = value;
        },
        setUsername(state, username)
        {
            state.username = username;
        },
        setId(state, id)
        {
            state.id = id;
        },
        logout(state)
        {
            router.push('/Login');
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            state.username = '';
            state.id = null;

        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
});

export default storage