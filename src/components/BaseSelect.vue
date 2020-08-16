<template lang="pug">
b-field(:label="label")
    b-select(
        v-model="val"
        @input="$emit('input', val)"
    )
        option(
            v-for="(option, idx) in options"
            :value="option.value"
            :key="idx"
        ) {{ option.text }}
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class BaseSelect extends Vue {
    @Prop() private label!: string;
    @Prop() private options!: Array<SelectOption>;
    @Prop() private value!: string;

    val = "";

    @Watch("value")
    valueChanged(newValue: string) {
        this.val = newValue;
    }

    created() {
        this.val = this.value;
    }
}
</script>
