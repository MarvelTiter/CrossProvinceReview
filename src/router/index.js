import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import login from '../views/Login.vue'
import home from '../views/Home.vue'
import UserManage from '../views/user/userManage.vue'
import DetectMain from '../views/DetectMain.vue'
import VehicleLogin from '../views/VehicleLogin.vue'
import VehicleOnline from '../views/VehicleOnline.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
        path: '/home',
        component: home,
        redirect: '/detect',
        children: [
            { path: '/users', component: UserManage, name: '用户管理' },
            { path: '/detect', component: DetectMain, name: '车辆列表' },
            { path: '/vehiclelogin', component: VehicleLogin, name: '车辆登录' },
            { path: '/vehicleonline', component: VehicleOnline, name: '车辆上线' },
            { path: '/setting', component: Setting, name: '系统设置' },
            { path: '/appearance', component: Setting, name: '外观检验' },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
const DefaultMenu = [
    { Icon: 'el-icon-s-grid', path: '/detect' },
    { Icon: 'el-icon-s-order', path: '/vehiclelogin' },
    { Icon: 'el-icon-finished', path: '/vehicleonline' },
    { Icon: 'el-icon-setting', path: '/setting' },
]

const ResetDefautMenu = {
    '/home': true,
    '/detect': true,
}
router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        return next()
    } else {
        if (store.state.token === '') {
            // return next('/login')
        }
    }
    store.commit('SetActive', to.path)

    // title update
    let name = ''
    if (to.name === '') {
        name = '欢迎！' + store.state.CurrentUser.USR_NAME
    } else {
        name = to.name
    }
    store.commit('SetTitle', name)

    // menu update
    if (ResetDefautMenu[to.path]) {
        store.commit('SetBottomMenu', DefaultMenu)
        store.commit('UpdateBottomBackButton', false)
    } else {
        store.commit('UpdateBottomBackButton', true)
    }
    next()
})

export default router
