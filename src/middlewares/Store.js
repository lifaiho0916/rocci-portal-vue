import Vue from "vue";
import Vuex from "vuex";
import connection from "@/middlewares/Connection";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch (err) {
        return {};
      }
    })(),
  },
  getters: {
    isAuth: (state) => !!state.token && !!state.user,
    isAdmin: (state) =>
      !!state.token && !!state.user && state.user.type == "admin",
    acl: (state) => state.user.access_control,
  },
  mutations: {
    auth_success(state, data) {
      localStorage.setItem("token", (state.token = data.token));
      localStorage.setItem("user", JSON.stringify((state.user = data.user)));
    },
    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify((state.user = user)));
    },
    clearAll(state) {
      localStorage.clear("");
      state.token = null;
    },
    signOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
      state.user = {};
    },
  },
  actions: {
    signIn({ commit }, credentials) {
      return new Promise((resolve) => {
        connection.post("portal/signIn", credentials, (err, result) => {
          commit("clearAll");
          if (err) return resolve(err);
          if (!result.token) return resolve("Incorrect credintials");
          const token = result.token;
          const user = result.user;
          commit("auth_success", { token, user });
          resolve();
        });
      });
    },
    updateUser({ commit }) {
      return new Promise((resolve) => {
        connection.get("portal/getCurrent", null, (err, result) => {
          if (err) return resolve(err);
          commit("setUser", result.user);
          resolve();
        });
      });
    },
    signOut({ commit }) {
      return new Promise((resolve) => {
        commit("signOut");
        resolve();
      });
    },
  },
});
