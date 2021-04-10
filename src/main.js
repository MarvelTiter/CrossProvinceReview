import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import './element'
import './assets/css/global.css'
import './plugins/axios'
import EventHub from './plugins/event'

Vue.config.productionTip = false
Vue.prototype.$http.get('/config.json').then(res => {
    // vue
    store.commit('SetConfig', res.data)
    Vue.prototype.$eventHub = EventHub
    Vue.prototype.$http.defaults.baseURL = store.state.Config.BasicInfo.BaseUrl
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app')
})
