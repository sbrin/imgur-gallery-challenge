<template lang="pug">
    div
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImgGallery extends Vue {
    @Prop() private msg!: string;
}
</script>
