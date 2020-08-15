<template lang="pug">
  div
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgFilter from "@/components/ImgFilter.vue";

@Component({
    name: "Home",
    components: {
        ImgFilter
    }
})
export default class Home extends Vue {
    @Prop() private msg!: string;
}
</script>
