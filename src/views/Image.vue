<template lang="pug">
.section
  .container
    .image-cover
        img(
            :src="`https://i.imgur.com/${galleryImageHash}.jpg`"
        )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
    components: {},
    methods: {
        ...mapActions(["getGalleryImage"])
    }
})
export default class GalleryImage extends Vue {
    getGalleryImage: Function;

    @Prop() private galleryImageHash!: string;

    created() {
        this.getGalleryImage(this.galleryImageHash);
    }
}
</script>
<style>
.image-cover {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
