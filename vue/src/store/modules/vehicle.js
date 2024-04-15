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
};

export default {
    state,
    actions
};
