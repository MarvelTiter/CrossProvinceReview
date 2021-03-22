import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import './element'
import './assets/css/global.css'
import './axios'

Vue.config.productionTip = false
Vue.prototype.$http.get('/config.json').then(res => {
    // vue
    store.commit('SetConfig', res.data)
    Vue.prototype.$http.defaults.baseURL = store.state.Config.baseUrl
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app')
})
