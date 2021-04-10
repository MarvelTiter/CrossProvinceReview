import router from '../router'

// {
// 	path:{
// 		key:action
// 	}
// }
const actions = {}

function Register(key, path, callback) {
	var pageAction = actions[path]
	if (!pageAction) actions[path] = {}
	actions[path][key] = callback
}

window.addEventListener('keydown', e => {
	var path = router.currentRoute.path
	var pageAction = actions[path]
	if (!pageAction) return
	var action = actions[path][e.key]
	if (!action) return
	action()
})

export default {
	Register: Register,
}
