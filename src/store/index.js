import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		HeaderTitle: '',
		CurrentUser: {},
		Config: {},
		CacheList: [],
		CurrentJob: {},
		MenuList: [
			{
				icon: 'el-icon-tickets',
				path: '/collect',
				active: false,
				name: '',
			},
			{
				icon: 'el-icon-user',
				path: '/users',
				active: false,
				name: '',
			},
			{
				icon: 'el-icon-setting',
				active: false,
				name: '',
				path: '/setting',
			},
		],
	},
	mutations: {
		UpdateToken(state, token) {
			state.token = token
		},
		SetUser(state, user) {
			state.CurrentUser = user
		},
		SetConfig(state, config) {
			state.Config = config
		},
		SetJob(state, job) {
			state.CurrentJob = job
		},
		SetActive(state, path) {
			for (const e of state.MenuList) {
				e.active = false
				if (e.path == path) {
					e.active = true
				}
			}
		},
		SetTitle(state, title) {
			state.HeaderTitle = title
		},
		AddCache(state, component) {
			if (state.CacheList.indexOf(component) == -1) {
				state.CacheList.push(component)
			}
		},
		RemoveCache(state, component) {
			var index = state.CacheList.indexOf(component)
			state.CacheList = state.CacheList.splice(index, 1)
		},
		ClearCache(state) {
			state.CacheList = []
		},
	},
	actions: {},
	modules: {},
})
