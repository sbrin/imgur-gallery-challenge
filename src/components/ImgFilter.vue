<template lang="pug">
    .columns.is-mobile
        .column
            BaseSelect(
                label="Section"
                :value="filter.section"
                :options="listSections"
                @input="setFilterSection"
            )
        .column
            BaseSelect(
                label="Sort"
                :value="filter.sort"
                :options="listSortAvailable"
                @input="setFilterSort"
            )
        .column
            BaseSelect(
                v-if="filter.section === 'top'"
                label="Window"
                :value="filter.window"
                :options="listWindow"
                @input="setFilterWindow"
            )
        .column
            .field
                .block
                b-switch(
                    :value="filter.showViral"
                    @input="setFilterViral"
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
    methods: {
        ...mapMutations([
            "setFilterSection",
            "setFilterSort",
            "setFilterWindow",
            "setFilterViral"
        ])
    }
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
}
</script>
