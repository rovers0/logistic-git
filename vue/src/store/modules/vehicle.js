import axiosClient from "../../axios";

const state = {
    search: {
        plate: null,
        parkingLot: null,
        axle: null
    },
    addNew:
    {
        plate: null,
        chassis: null,
        seri: null,
        axle: null,
        parkingLot: null,
        type: null,
        driver: null,
        note: null,
        image: null,
        attachment: null,
        images: [],
        addable_files: []
    },
    addNewDoc:
    {
        document_type: null,
        registration_date: null,
        expiration_date: null,
        effective_date: null,
        notice_duration: null,
        fees: null,
        note: null,
        images: [],
        addable_files: []
    },
};

const actions = {
    getVehicleMaster({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("vehicle/master").then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getVehicleList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("vehicle", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addNew({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("vehicle/add", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateVehicle({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("vehicle/" + id, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    vehicleDocuments({ commit }, {vehicle_id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("vehicle/" + vehicle_id + "/documents", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteVehicleMedia({ commit }, {id, mediaId}) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete("vehicle/" + id + "/destroy-media/" + mediaId,).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteVehicleDocumentMedia({ commit }, {id, mediaId}) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete("vehicle/" + id + "/destroy-document-media/" + mediaId,).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
