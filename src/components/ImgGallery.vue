<template lang="pug">
    .gallery
        .gallery__image(v-for="(item, idx) in items")
            .gallery__title {{ item.title }}
            router-link(
                :to="item.id"
            )
                img(
                    :src="`https://i.imgur.com/${item.cover}.jpg`"
                    loading="lazy"
                    :alt="item.title"
                )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
    methods: { ...mapActions(["getGallery"]) }
})
export default class ImgGallery extends Vue {
    getGallery: Function;

    get items() {
        return this.$store.state.items.filter(item => !!item.cover);
    }

    created() {
        this.getGallery();
    }
}
</script>

<style>
.gallery {
    display: flex;
    flex-wrap: wrap;
}
.gallery__image {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    max-height: 240px;
}
@media screen and (min-width: 640px) {
    .gallery__image {
        width: 33.33%;
    }
}
@media screen and (min-width: 960px) {
    .gallery__image {
        width: 25%;
    }
}
@media screen and (min-width: 1280px) {
    .gallery__image {
        width: 20%;
    }
}
</style>
