import axiosClient from "../../axios";

const state = {
    search: {
        serial: null,
        parkingLot: null,
    },
    addNew: {
        serial: null,
        frame_number: null,
        packing_id: null,
        weight: null,
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
    moocDocuments({ commit }, {mooc_id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("romooc/" + mooc_id + "/documents", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteMoocMedia({ commit }, {id, mediaId}) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete("romooc/" + id + "/destroy-media/" + mediaId,).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteMoocDocumentMedia({ commit }, {id, mediaId}) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete("romooc/" + id + "/destroy-document-media/" + mediaId,).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
