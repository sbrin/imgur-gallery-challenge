<template lang="pug">
div
    .columns.is-multiline
        .column.is-one-quarter(
            v-for="(item, idx) in items"
            
        )
            .box(
                @click="$emit('showPreview', item)"
            )
                .title.is-5 {{ item.title }}
                .content
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
        this.$store.commit("SET_GALLERY_ITEMS", []);
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
.box {
    cursor: pointer;
}
</style>
