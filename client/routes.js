import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Default from './app.vue'

import Home from './home.vue'

const routes = [
    {path: '/', component: Default, children: [
        {path: '/', component: Home, meta: {title: 'Home'}},
    ]},
]

let router = new Router({
    mode: 'history',
    routes,
})

export default router
