import Vue from "vue";
import VueLazyload from "vue-lazyload";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@/plugins/axios";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

Vue.use(Buefy);
Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
