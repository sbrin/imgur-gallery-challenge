import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import GALLERY from "@/response";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        filter: {
            section: "hot",
            sort: "viral",
            window: "day",
            page: 0,
            showViral: true
        },
        items: []
    },
    mutations: {
        SET_FILTER_KEY(state, filter) {
            state.filter = {
                ...state.filter,
                ...filter
            };
        },
        SET_GALLERY_ITEMS(state, items) {
            state.items = items;
        },
        APPEND_GALLERY_ITEMS(state, items) {
            state.items = state.items.concat(items);
        }
    },
    actions: {
        getGallery(context, append = false) {
            if (append) {
                context.commit("SET_FILTER_KEY", {
                    page: context.state.filter.page + 1
                });
            } else {
                context.commit("SET_FILTER_KEY", {
                    page: 0
                });
            }
            const FILTER = context.state.filter;
            return axios
                .get(
                    `https://api.imgur.com/3/gallery/${FILTER.section}/${FILTER.sort}/${FILTER.window}/${FILTER.page}?showViral=${FILTER.showViral}&mature=false&album_previews=false`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
                        }
                    }
                )
                .then(response => response.data)
                .then(response => {
                    if (!response.data || response.success !== true) {
                        return Promise.reject();
                    }
                    if (append) {
                        context.commit("APPEND_GALLERY_ITEMS", response.data);
                    } else {
                        context.commit("SET_GALLERY_ITEMS", response.data);
                    }
                });
        }
    },
    modules: {}
});
