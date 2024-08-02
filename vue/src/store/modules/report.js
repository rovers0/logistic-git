import axiosClient from "../../axios";
import moment from 'moment';

const state = {
    searchReportByVehicle: {
        plate: null,
        year: moment().format('YYYY'),
        month: moment().format('M'),
        status: null,
        limit: null,
    },
    addNew: {
    }
};

const actions = {
    getReport({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("report", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getReportDetail({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("report/detail", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getReportByVehicle({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("report/vehicle", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getReportMaster({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("report/master", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
