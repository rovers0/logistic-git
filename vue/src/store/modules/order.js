import axiosClient from "../../axios";
import moment from 'moment';

const state = {
    search: {
        command_id: null,
        booking_id: null,
        booking_code: null,
        cont_code: null,
        plate: null,
        driver_id: null,
        date_from: null,
        date_to: null,
        command_type: null,
        customer_id: null,
        year: moment().format('YYYY'),
        month: moment().format('M'),
        status: null,
        limit: null,
    },
    addNew: {
        booking: {
            is_home_vehicle: false,
            is_has_partner: false,
            fee_transport_type: null,
            customer_id: null,
            partner_id: null,
            partner_cont_quantity: null,
            partner_cont_type: null,
            partner_price: null,
            partner_note: null,
            location_start: 'start',
            location_end: 'end',
            note: 'test'
        },
        invoice: {
            product_type: 1,
            carrier_id: 1,
            carrier_number: 'SHP7878',
            time_transport: null,
            time_down_the_line: null,
            method_command: 1,
            method_command_number: 1,
            booking_code: 'BK84574',
            driver_salary: '1000000',
            cont_quantity: 1,
            cont_type: '40',
            price: '5000000',
            km: 0,
            is_1_axle_vehicle: null,
            is_2_axle_vehicle: null,
            cont_salary: 0,
            route_salary: 0,
            commission: 0,
            quantity: 0,
        },
        conts: [{code: "C1", seal: "S9877", gross: "1000"}],
        route: {
            id: null,
            code: null,
            name: null,
        },
        drivers: [],
        taskTransports: {
            get_null_point: 'A',
            get_null_point_request: 'A',
            shipping_point: 'B',
            shipping_point_request: 'B',
            return_null_point: 'C',
            return_null_point_request: 'C',
        },
        trips: [
            {point: 'point1'}
        ]
    }
};

const actions = {
    getOrders({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("command-mobile", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getOrderDetail({ commit }, id) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`command-mobile/${id}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getFees({ commit }) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("fees").then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateOrder({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${data.id}`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateGetContGood({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/update-get-cont-good`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateCutMoocDownGood({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/update-cut-mooc-down-good`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateGetContEmpty({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/update-get-cont-empty`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateDownPacking({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/update-down-packing`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateCompleted({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/update-closed-command`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateIncurred({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`command-mobile/${id}/incurred`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteIncurred({ commit }, {id, incurred}) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete(`command-mobile/${id}/incurred/${incurred}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
