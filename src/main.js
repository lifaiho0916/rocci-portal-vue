import Vue from "vue";
import "animate.css";
// ------------------------------------------------------------------ router
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";
const router = new VueRouter({
  mode: "history",
  routes: routes,
});
// ------------------------------------------------------------------ router guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Rocci | ";
  if (to.meta.nologin && !store.getters.isAuthenticated)
    return next({ name: "Index", params: { error: "Login Not Valid" } });
  return next();
});
// ------------------------------------------------------------------ root
import Root from "./Root.vue";
Vue.component("root", Root);
// ------------------------------------------------------------------ bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// ------------------------------------------------------------------ global
var emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
Vue.mixin({
  data: () => {
    return {
      acl_translate: {},
    };
  },
  methods: {
    validEmail(email) {
      return emailRegex.test(String(email).toLowerCase());
    },
    showSuccessTemp(message) {
      this.$bvToast.toast("-", {
        toaster: "b-toaster-top-left",
        title: message,
        variant: "success",
        solid: false,
        bodyClass: "hide",
        autoHideDelay: store.state.success_timeout,
      });
    },
    showErrorTemp(message) {
      this.$bvToast.toast("-", {
        toaster: "b-toaster-top-left",
        title: message,
        variant: "danger",
        solid: false,
        bodyClass: "hide",
        autoHideDelay: store.state.success_timeout,
      });
    },
    formatMoney(value) {
      return !value | (value == 0) | (value == "")
        ? ""
        : parseFloat(value)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatK(value) {
      return !value | (value == 0) | (value == "")
        ? ""
        : parseInt(value)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDateTime(value) {
      if (!value) return "";
      value = new Date(value);
      var time = value.toLocaleString().split(",")[1];
      return `${value.getDate()}/${
        value.getMonth() + 1
      }/${value.getFullYear()}  ${time}`;
    },
    auth(access) {
      if (store.getters.isAdmin) return true;
      return store.getters.acl && store.getters.acl.includes(access);
    },
    authAny(access) {
      if (store.getters.isAdmin) return true;
      return (
        store.getters.acl && store.getters.acl.some((x) => access.includes(x))
      );
    },
  },
});

// ------------------------------------------------------------------ store
import { store } from "./middlewares/Store";
// ------------------------------------------------------------------ Service
import Service from "@/middlewares/Service";
// ------------------------------------------------------------------
Vue.config.productionTip = false;
Vue.prototype.$service = Service;
export default new Vue({
  render: (h) => h(Root),
  router: router,
  store: store,
}).$mount("#app");
