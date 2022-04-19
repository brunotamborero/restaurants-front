import {createWebHistory, createRouter} from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Restaurant from '@/views/Restaurant.vue'
import RestaurantOptions from '@/views/RestaurantOptions.vue'
import AddDishes from '@/views/AddDishes.vue'
import AddTables from '@/views/AddTables.vue'
import Order from '@/views/Order.vue'

import MakeOrder from '@/views/MakeOrder.vue'
import MakeOrderDishes from '@/views/MakeOrderDishes.vue'
import Profile from '@/views/Profile.vue'
import CreateOrder from "@/views/CreateOrder";
import Pay from "@/views/Pay";

const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Order/:id',
        name: 'Order',
        component: Order
    },
    {
        path: '/User',
        name: 'User',
        component: Profile
    },
    {
        path: '/createorder/:idrestaurant/:idtable',
        name: 'Createorder',
        component: CreateOrder
    },
    {
        path: '/order/:idorder/pay',
        name: 'Pay',
        component: Pay
    },
    {
        path: '/CreateOrderDishes/:id',
        name: 'CreateOrderDishes',
        component: MakeOrderDishes
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/MakeOrder',
        name: 'MakeOrder',
        component: MakeOrder
    },
    {
        path: '/Restaurant',
        name: 'Restaurant',
        component: Restaurant
    },
    {
        path: '/Restaurant/:id',
        name: 'RestaurantOptions',
        component: RestaurantOptions
    },
    {
        path: '/MakeOrder/:id',
        name: 'MakeOrderDishes',
        component: MakeOrderDishes
    },
    {
        path: '/Restaurant/:id/addDishes',
        name: 'AddDishes',
        component: AddDishes
    },
    {
        path: '/Restaurant/:id/addTables',
        name: 'addTable',
        component: AddTables
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