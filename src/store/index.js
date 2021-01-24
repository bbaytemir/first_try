import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
      window.$cookies.set("user", user, "user details");
    },
  },
  getters: {
    isUser: (state) => {
      if (state.user == null) {
        state.user = window.$cookies.get("user");
        // commit('setUser', state.user);
        console.log(state.user);
      }
      // console.log(
      //   "getuser" +
      //     (state.user != null &&
      //       state.user.status === "ok")
      // );
      return state.user != null && state.user.status === "ok";
    },
    getUser: (state) => {
     return state.user;
    },
  },
  actions: {},
  modules: {},
});
