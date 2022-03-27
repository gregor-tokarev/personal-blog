<template>
  <div class="point">
    <img :src="data.page.cover.external.url" :alt="title" class="point__img">
    <div class="point__info container">
      <h1 class="point__title super-title">{{ title }}</h1>
      <h3 class="point__intro hint-title">{{ intro }}</h3>
    </div>

    <ContentView class="point__content container" content-source="notion" :content="data.blocks.results"></ContentView>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAsyncData, useMeta } from "#app";
import ContentView from "~/components/ContentView.vue";

const route = useRoute();
const { data } = await useAsyncData(
  "page",
  () => $fetch(`/api/notion/one-page?pageId=${route.params.id}`)
);
const title = data.value.page.properties.Name.title[0].plain_text;
const intro = data.value.page.properties.intro.rich_text[0].plain_text;

useMeta({
  title
});
</script>

<style scoped lang="scss">
.point {
  padding-top: 30px;

  @include apply-ps {
    padding-top: 60px;
  }

  &__img {
    width: 100%;
    object-position: top;
    object-fit: cover;
    max-height: 520px;
  }

  &__info {
    padding: 20px 0 40px;
  }

  &__title {
    margin: 0 0 10px;
    color: var(--dark);
  }

  &__intro {
    color: var(--gray-400);
  }
}
</style>
