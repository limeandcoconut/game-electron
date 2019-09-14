import Vue from 'vue'
import router from './routes.js'
import App from './app.vue'


new Vue({
    router,
    template: '<app />',
    components: {
        App,
    },
}).$mount('#app')
