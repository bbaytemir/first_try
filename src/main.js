import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

import moment from "moment";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});

import axios from "axios";

require("./assets/main.scss");
Vue.mixin({
  methods: {
    $checkExist: p => eval('this.'+p)
  }
});
Vue.config.productionTip = false;
// Vue.mixin({
//   data: function() {
//     return {
//       buildings: "global",
//     };
//   },
// });
const createVue = async function() {
  await axios
    .get("http://127.0.0.1:3000/api/buildings")
    .then((response) => {
      //
      Vue.prototype.buildings = response.data;
      console.log(response.data);
    })
    .catch((error) => console.log(error));
  2;

  Vue.prototype.sss = 11;
  new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
    created: async function() {},
  }).$mount("#app");
};
createVue();
