<template lang="pug">
div
    .euw-gallery
        .euw-gallery__item(
            v-for="(item, idx) in items"
            @click="$emit('showPreview', item)"
        )
            .euw-gallery__title {{ item.title }}
            .euw-gallery__image
                img(
                    v-lazy="`https://i.imgur.com/${item.cover}.jpg`"
                    :alt="item.title"
                )
    .block
        b-progress(
            type="is-success"
            v-show="waitingForResponse"
        )
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { mapActions, mapMutations } from "vuex";

@Component({
    methods: {
        ...mapActions(["getGallery"]),
        ...mapMutations(["setFilterPage"])
    }
})
export default class ImgGallery extends Vue {
    getGallery!: Function;
    setFilterPage!: Function;

    waitingForResponse = true;

    get items() {
        return this.$store.state.items.filter(
            (item: GalleryImage) => !!item.cover
        );
    }
    get filterParams() {
        return this.$store.state.filter;
    }

    created() {
        this.loadGallery().then(() => {
            window.addEventListener("scroll", this.handleScroll);
        });

        this.$root.$on("filterChange", this.loadGallery);
    }

    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
        this.$root.$off("filterChange", this.loadGallery);
    }

    loadGallery() {
        this.$store.commit("SET_FILTER_KEY", { page: 0 });
        this.waitingForResponse = true;
        return this.getGallery().then(() => {
            this.waitingForResponse = false;
        });
    }

    handleScroll() {
        if (
            !this.waitingForResponse &&
            window.scrollY >= document.body.clientHeight - window.innerHeight
        ) {
            this.waitingForResponse = true;
            this.getGallery(true).then(() => {
                this.waitingForResponse = false;
            });
        }
    }
}
</script>

<style scoped>
.euw-gallery {
    display: flex;
    flex-wrap: wrap;
}
.euw-gallery__item {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    cursor: pointer;
}
.euw-gallery__image {
    overflow: hidden;
    align-items: center;
    justify-content: center;
}
@media screen and (min-width: 640px) {
    .euw-gallery__item {
        width: 50%;
        min-height: 320px;
    }
}
@media screen and (min-width: 960px) {
    .euw-gallery__item {
        width: 33.33%;
    }
}
@media screen and (min-width: 1280px) {
    .euw-gallery__item {
        width: 25%;
    }
}
</style>
