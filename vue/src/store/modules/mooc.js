import axiosClient from "../../axios";

const state = {
    search: {
        serial: null,
        parkingLot: null,
    },
    addNew: {
        serial: '15R12736',
        frame_number: 'LJRC12395H2008362',
        packing_id: null,
        weight: '3305000',
        size: null,
        type: null,
        axis: null,
        note: null,
        images: [],
        addable_files: []
    },
};

const actions = {
    getMoocMaster({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("romooc/master").then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getAllMooc({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("romooc/all").then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getMoocList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("romooc", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addNewMooc({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("romooc", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateMooc({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("romooc/" + id, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
