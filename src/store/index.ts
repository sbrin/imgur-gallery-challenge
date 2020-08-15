import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        filter: {
            section: "top",
            sort: "top",
            window: "week",
            page: ""
        },
        items: []
    },
    mutations: {},
    actions: {
        get
    },
    modules: {}
});
