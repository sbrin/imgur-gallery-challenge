<template lang="pug">
    .columns
        .columns.column.is-mobile
            .column
                BaseSelect(
                    label="Section"
                    :value="filterParams.section"
                    :options="listSections"
                    @input="setFilter('section', $event)"
                )
            .column
                BaseSelect(
                    label="Sort"
                    :value="filterParams.sort"
                    :options="listSortAvailable"
                    @input="setFilter('sort', $event)"
                )
        .columns.column.is-mobile
            .column
                .field
                    .block
                    b-switch(
                        :value="filterParams.showViral"
                        @input="setFilter('viral', $event)"
                    ) Viral
            .column
                BaseSelect(
                    v-if="filterParams.section === 'top'"
                    label="Window"
                    :value="filterParams.window"
                    :options="listWindow"
                    @input="setFilter('window', $event)"
                )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";

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

    get filterParams() {
        return this.$store.state.filter;
    }
    get listSortAvailable() {
        if (this.filterParams.section === "user") {
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
