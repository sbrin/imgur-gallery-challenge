<template lang="pug">
.section
  .container
    ImgFilter
  .container
    ImgGallery
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgFilter from "@/components/ImgFilter.vue";
import ImgGallery from "@/components/ImgGallery.vue";

@Component({
    name: "Home",
    components: {
        ImgFilter,
        ImgGallery
    }
})
export default class Home extends Vue {
    @Prop() private msg!: string;
}
</script>
