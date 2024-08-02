import axiosClient from "../../axios";
import moment from 'moment';

const state = {
    search: {
        route_id: null,
        booking_id: null,
        booking_code: null,
        date_from: null,
        date_to: null,
        product_type: null,
        customer_id: null,
        year: moment().format('YYYY'),
        month: moment().format('M'),
        quantity: null,
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
            cont_type: '40',
            price: '5000000',
            km: 0,
            is_1_axle_vehicle: null,
            is_2_axle_vehicle: null,
            cont_salary: 0,
            route_salary: 0,
            commission: 0,
            quantity: 1,
            location_start: 'start',
            location_end: 'end',
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
        ],
        images: []
    }
};

const actions = {
    getCustomers({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("customer").then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getBooking({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("booking", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getDetail({ commit }, id) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`booking/${id}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addBrand({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("brand", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addRoute({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("route", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addBooking({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("booking", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateBooking({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("booking/" + data.id, data.form).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteBooking({ commit }, id) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete("booking/" + id).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
