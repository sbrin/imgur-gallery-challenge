<template lang="pug">
    .columns.is-mobile
        .column
            BaseSelect(
                label="Section"
                :value="filter.section"
                :options="listSections"
                @input="setFilter('section', $event)"
            )
        .column
            BaseSelect(
                label="Sort"
                :value="filter.sort"
                :options="listSortAvailable"
                @input="setFilter('sort', $event)"
            )
        .column
            BaseSelect(
                v-if="filter.section === 'top'"
                label="Window"
                :value="filter.window"
                :options="listWindow"
                @input="setFilter('window', $event)"
            )
        .column
            .field
                .block
                b-switch(
                    :value="filter.showViral"
                    @input="setFilter('viral', $event)"
                ) Viral
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import { mapMutations } from "vuex";

@Component({
    components: {
        BaseSelect
    },
    methods: {}
})
export default class ImgFilter extends Vue {
    listSections = [
        {
            value: "hot",
            text: "Hot"
        },
        {
            value: "top",
            text: "Top"
        },
        {
            value: "user",
            text: "User"
        }
    ];
    listSort = [
        {
            value: "viral",
            text: "Viral"
        },
        {
            value: "top",
            text: "Top"
        },
        {
            value: "time",
            text: "Time"
        },
        {
            value: "rising",
            text: "Rising"
        }
    ];
    listWindow = [
        {
            value: "day",
            text: "Day"
        },
        {
            value: "week",
            text: "Week"
        },
        {
            value: "month",
            text: "Month"
        },
        {
            value: "year",
            text: "Year"
        },
        {
            value: "all",
            text: "All"
        }
    ];

    get filter() {
        return this.$store.state.filter;
    }
    get listSortAvailable() {
        if (this.filter.section === "user") {
            return this.listSort;
        }
        return this.listSort.filter(item => item.value !== "rising");
    }

    setFilter(key: string, value: string) {
        this.$store.commit("SET_FILTER_KEY", { [key]: value });
        this.$root.$emit("filterChange");
    }
}
</script>
