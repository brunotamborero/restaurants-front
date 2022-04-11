import {createWebHistory, createRouter} from 'vue-router'
import Estudiantes from '@/views/Estudiantes.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Order from '@/views/Order.vue'

const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Estudiantes',
        name: 'Estudiantes',
        component: Estudiantes
    },
    {
        path: '/Order',
        name: 'Order',
        component: Order
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;