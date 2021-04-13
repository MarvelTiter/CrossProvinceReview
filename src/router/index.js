import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import login from '../views/Login.vue'
import home from '../views/Home.vue'
import UserManage from '../views/user/userManage.vue'
import Welcome from '../views/Welcome.vue'
import Collect from '../views/InfoCollect.vue'
import Review from '../views/Review.vue'
import Setting from '../views/setting/Setting'

Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: login },
	{
		path: '/home',
		component: home,
		redirect: '/welcome',
		name: 'home',
		children: [
			{ path: '/users', component: UserManage, name: 'user' },
			{ path: '/welcome', component: Welcome, name: 'welcome' },
			{ path: '/collect', component: Collect, name: 'collect' },
			{ path: '/setting', component: Setting, name: 'setting' },
		],
	},
	{ path: '/review', component: Review, name: 'review' },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})
// const DefaultMenu = [
//     { icon: 'el-icon-s-grid', path: '/detect' },
//     { icon: 'el-icon-s-order', path: '/vehiclelogin' },
//     { icon: 'el-icon-finished', path: '/vehicleonline' },
// ]

// const ResetDefautMenu = {
//     '/home': true,
// }
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		store.commit('ClearCache')
		return next()
	} else {
		if (store.state.token === '') {
			return next('/login')
		}

		if (to.path === '/welcome' || to.path === '/home') {
			store.commit('AddCache', 'home')
		}
	}
	store.commit('SetActive', to.path)

	next()
})

export default router
