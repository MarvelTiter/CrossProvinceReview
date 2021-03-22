import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        HeaderTitle: '',
        CurrentUser: {},
        Config: {},
        SelectedStation: '',
        activePath: '',
        ShowBack: false,
        TabPosition: 'top',
        MenuList: [
            { Icon: 'el-icon-s-order', path: '/vehiclelogin' },
            { Icon: 'el-icon-finished', path: '/vehicleonline' },
            { Icon: 'el-icon-setting' },
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
        StationSelectedSave(state, stnid) {
            state.SelectedStation = stnid
        },
        SetActive(state, path) {
            state.activePath = path
        },
        SetTitle(state, title) {
            state.HeaderTitle = title
        },
        SetBottomMenu(state, menulist) {
            state.MenuList = menulist
        },
        UpdateBottomBackButton(state, value) {
            state.ShowBack = value
        },
        SetTabPosition(state, pos) {
            state.TabPosition = pos
        },
    },
    actions: {},
    modules: {},
});
