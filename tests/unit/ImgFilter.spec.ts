import { mount, createLocalVue } from "@vue/test-utils";
import ImgFilter from "@/components/ImgFilter.vue";
import Buefy from "buefy";
import Vuex from "vuex";
import BaseSelect from "@/components/BaseSelect.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Buefy);

describe("ImgFilter.vue", () => {
    let mutations: any;
    let store: any;
    let state;

    beforeEach(() => {
        mutations = {
            SET_FILTER_KEY: jest.fn()
        };
        state = {
            filter: {
                section: "hot",
                sort: "viral",
                window: "day",
                page: 0,
                showViral: true
            }
        };

        store = new Vuex.Store({
            state,
            mutations
        });
    });

    it("renders all default filter inputs: Section, Sort, Viral", () => {
        const wrapper = mount(ImgFilter, {
            localVue,
            store
        });

        expect(wrapper.findAll("select")).toHaveLength(2);
        expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });

    it("renders 'rising' option if section is 'user'", () => {
        state = {
            filter: {
                section: "user"
            }
        };

        store = new Vuex.Store({
            state
        });

        const wrapper = mount(ImgFilter, {
            localVue,
            store
        });
        expect(wrapper.find('option[value="rising"]').exists()).toBe(true);
    });

    it("renders window filter if section is 'top'", () => {
        state = {
            filter: {
                section: "top"
            }
        };

        store = new Vuex.Store({
            state
        });

        const wrapper = mount(ImgFilter, {
            localVue,
            store
        });
        expect(wrapper.findAll("select")).toHaveLength(3);
    });

    it("runs mutation on filter change", () => {
        const wrapper = mount(ImgFilter, {
            localVue,
            store
        });
        wrapper.findComponent(BaseSelect).vm.$emit("input");
        expect(mutations.SET_FILTER_KEY).toHaveBeenCalled();
    });
});
