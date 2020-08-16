<template lang="pug">
    .card
        .card-header
            p.card-header-title {{ image.title }}
        .card-image
            figure.image.euw-image
                img(
                    :src="`https://i.imgur.com/${image.cover}.jpg`"
                    :alt="image.title"
                )
        .card-content
            p.subtitle.is-6 {{ image.description }}
        .card-footer
            .card-footer-item 👍 {{ image.ups }}
            .card-footer-item 👎 {{ image.downs }}
            .card-footer-item ⭐️ {{ image.score }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImgPreview extends Vue {
    @Prop() private image!: GalleryImage;
}
</script>