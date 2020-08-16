import { mount, createLocalVue } from "@vue/test-utils";
import BaseSelect from "@/components/BaseSelect.vue";
import Buefy from "buefy";

const localVue = createLocalVue();
localVue.use(Buefy);

const OPTIONS = [
    {
        value: "1",
        text: "one"
    },
    {
        value: "2",
        text: "two"
    }
];

describe("BaseSelect.vue", () => {
    it("renders select input", () => {
        const wrapper = mount(BaseSelect, {
            localVue,
            propsData: { options: OPTIONS }
        });

        expect(wrapper.find("select").exists()).toBe(true);
    });

    it("renders select label", () => {
        const wrapper = mount(BaseSelect, {
            localVue,
            propsData: { options: OPTIONS, label: "Label" }
        });

        expect(wrapper.find("label").exists()).toBe(true);
        expect(wrapper.find("label").text()).toBe("Label");
    });

    it("renders select input options", () => {
        const wrapper = mount(BaseSelect, {
            localVue,
            propsData: { options: OPTIONS }
        });

        expect(wrapper.find("option").exists()).toBe(true);
    });

    it("renders select input options with value and text", () => {
        const wrapper = mount(BaseSelect, {
            localVue,
            propsData: { options: OPTIONS }
        });

        expect(wrapper.findAll("option")).toHaveLength(2);
        expect(wrapper.find("option").attributes().value).toBe("1");
        expect(wrapper.find("option").text()).toBe("one");
    });

    it("renders select input and sets the :value option to be selected", () => {
        const wrapper = mount(BaseSelect, {
            localVue,
            propsData: { options: OPTIONS, value: "2" }
        });
        let select = wrapper.find("select").element as HTMLSelectElement;

        expect(select.value).toBe("2");
    });
});
