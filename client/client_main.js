import Vue from 'vue'
import router from './routes.js'
// import mixins from './mixins.js'
// import store from './vuex/store.js'
// import './styles/_main.scss'
// import VueAnalytics from 'vue-analytics'

// const gaID = 'UA-93531536-4' // Taylors Dev

// Vue.use(VueAnalytics, { id: gaID, router })
// Vue.mixin(mixins)

// Vue.prototype.$stripe = window.Stripe('pk_test_RDASsCW1w5o2Qd3qHRRkwV2f')

import App from './app.vue'

new Vue({
    router,
    template: '<app />',
    components: {
        App,
    },
    // store,
}).$mount('#app')
