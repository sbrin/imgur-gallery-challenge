import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        filter: {
            section: "hot",
            sort: "viral",
            window: "day",
            page: "",
            showViral: true
        },
        items: []
    },
    mutations: {
        setFilterSection(state, payload: string) {
            if (payload !== "user" && state.filter.sort === "rising") {
                state.filter.sort = "viral";
            }
            state.filter.section = payload;
        },
        setFilterSort(state, payload: string) {
            state.filter.sort = payload;
        },
        setFilterWindow(state, payload: string) {
            state.filter.window = payload;
        },
        setFilterViral(state, payload: boolean) {
            state.filter.showViral = payload;
        },
        setItems(state, items) {
            state.items = items;
        }
    },
    actions: {
        getGallery(context) {
            const FILTER = context.state.filter;
            return axios
                .get(
                    `https://api.imgur.com/3/gallery/${FILTER.section}/${FILTER.sort}/${FILTER.window}/${FILTER.page}?showViral=${FILTER.showViral}&mature=false&album_previews=true`,
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
                    context.commit("setItems", response.data);
                });
        },
        getGalleryImage(context, galleryImageHash) {
            return axios
                .get(`https://api.imgur.com/3/image/${galleryImageHash}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
                    }
                })
                .then(response => response.data)
                .then(response => {
                    if (!response.data || response.success !== true) {
                        return Promise.reject();
                    }
                    return response.data;
                });
        }
    },
    modules: {}
});
