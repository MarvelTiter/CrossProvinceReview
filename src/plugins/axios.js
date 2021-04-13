import Vue from 'vue'
import axios from 'axios'
import store from '../store/index.js'
import { Message } from 'element-ui'

// axios
Vue.prototype.$http = axios
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
	function(config) {
		config.headers['Token'] = store.state.token
		return config
	},
	function(error) {
		return Promise.reject(error)
	},
)

// 响应拦截器
axios.interceptors.response.use(
	function(response) {
		if (response.status === 200) {
			var d = response.data
			if (d.status == 'Fail') {
				Message.error(response.data.value)
			}
		}
		return response
	},
	function(error) {
		var status = (error.response && error.response.status) || 'unknow'
		var msg = error.message || ''
		if (status === 401) msg = '登录过期，请重新登录'
		else if (status === 403) msg = '无权限访问资源'
		Message.error(`请求状态[${status}] : ${msg}`)
		// if (error.response.status === 500) {
		// 	Message.error('请求资源出错')
		// }
		// if (error.message.toLowerCase().indexOf('network') > -1) {
		// 	Message.error('无法连接远程服务器:' + error.message)
		// }
		// if (error.response.status === 401) {
		// 	Message.error('登录凭证已超时，请重新登录')
		// } else if (error.response.status === 404) {
		// 	Message.error('请求资源不存在')
		// }
		return Promise.reject(error)
	},
)
