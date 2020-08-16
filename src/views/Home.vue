<template lang="pug">
.section
  .container.box
    ImgFilter
  .container
    ImgGallery(
      @showPreview="showPreview"
      @closePreview="closePreview"
    )
  b-modal(
    :active.sync="isPreviewVisible"
    aria-role="dialog"
    aria-modal
    scroll="keep"
    width="640px"
  )
    ImgPreview(
      :image="image"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImgFilter from "@/components/ImgFilter.vue";
import ImgGallery from "@/components/ImgGallery.vue";
import ImgPreview from "@/components/ImgPreview.vue";

@Component({
    name: "Home",
    components: {
        ImgFilter,
        ImgGallery,
        ImgPreview
    }
})
export default class Home extends Vue {
    image = {};

    isPreviewVisible = false;

    showPreview(image: GalleryImage) {
        this.image = image;
        this.isPreviewVisible = true;
    }
    closePreview() {
        this.image = {};
        this.isPreviewVisible = false;
    }
}
</script>
