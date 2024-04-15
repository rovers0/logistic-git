import axiosClient from "../../axios";

export default {
  checkLogin() {
    return axiosClient.get("user").then((res) => {
      return res;
    });
  },
  login({ commit }, user) {
    commit('setLoading', true, { root: true })
    return axiosClient.post("/login", user).then(({ data }) => {
      commit('setLoading', false, { root: true })
      commit("setUser", data.user);
      commit("setToken", data.token);
    })
    .catch((error) => {
      commit('setLoading', false, { root: true })
      console.log(error)
      return false
  });
  },
  logout({ commit }) {
    commit('setLoading', true, { root: true })
    return axiosClient.post("/logout").then((response) => {
      commit('setLoading', false, { root: true })
      commit("logout");
      return response;
    });
  },
  async changePassword({ commit }, payload) {
    commit('setLoading', true, { root: true })
    return axiosClient.post("/change-password", payload)
    .then((res) => {
      commit('setLoading', false, { root: true })
      return res.data
    })
    .catch((error) => {
      commit('setLoading', false, { root: true })
      console.log(error)
      return false
  });
  },
  changeMenuType({ commit }, data) {
    commit('setLoading', true, { root: true })
    return axiosClient.post("/changeMenuType", data).then((response) => {
      commit('setLoading', false, { root: true })
      return response;
    });
  },
};
