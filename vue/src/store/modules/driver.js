import axiosClient from "../../axios";

const state = {
    search: {
        input: null,
        status: null,
    },
    addNew:
    // {
    //     allowance: null,
    //     birthday: null,
    //     bith_place: null,
    //     commission_percent: null,
    //     end_date: null,
    //     experient_year: null,
    //     insurance: null,
    //     license: null,
    //     license_class: null,
    //     license_expired_date: null,
    //     name: null,
    //     passport: null,
    //     phone: null,
    //     receive_date: null,
    //     receive_user_id: null,
    //     relative_name: null,
    //     relative_phone: null,
    //     release_date: null,
    //     salary: null,
    //     save_date: null,
    //     start_date: null,
    //     vehicle_id: null
    // },
    {
        "allowance": "100000",
        "birthday": '2024-04-04',
        "bith_place": "some where",
        "commission_percent": "1",
        "end_date": "2024-04-04",
        "experient_year": "1",
        "insurance": "10000",
        "license": "16115162",
        "license_class": "B",
        "license_expired_date": "2024-04-04",
        "name": "Test",
        "passport": "05220521514105",
        "phone": "02547806162",
        "receive_date": "2024-04-04",
        "receive_user_id": "1",
        "relative_name": "someone",
        "relative_phone": "01235849626",
        "release_date": "2024-04-04",
        "salary": "100000",
        "save_date": "2024-04-04",
        "start_date": "2024-04-04",
        "vehicle_id": null,
        "email": "mail@mail.com"
    },
};

const actions = {
    addDriverNew({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("driver", data, {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateDriver({ commit }, {id, data}) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("driver/" + id, data, {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getDriverList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("driver", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getDriverMaster({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("driver/master", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
};

export default {
    state,
    actions
};
