import { createStore } from 'vuex'

import actions from './actions/index'
import mutations from './mutations/index'
import state from './state/index'
import vehicle from './modules/vehicle'
import driver from './modules/driver'
import mooc from './modules/mooc'
import booking from './modules/booking'
import order from './modules/order'
import report from './modules/report'

const store = createStore({
    state: state,
    getters: {
        user: function(state) {
            return !state.user.data || Object.keys(state.user.data).length === 0 ? null : JSON.parse(state.user.data)
        },
    },
    actions: actions,
    mutations: mutations,
    modules: {
        vehicle,
        driver,
        mooc,
        booking,
        order,
        report
    }
})

export default store
