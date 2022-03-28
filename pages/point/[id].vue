<template>
  <div class="point">
    <div class="point__progress-bar">
      <div
        class="point__progress-line"
        :style="{'width': readProgress + '%'}"
      ></div>
    </div>

    <img :src="data.page.cover.external.url" :alt="title" class="point__img">
    <div class="point__info container">
      <h1 class="point__title super-title">{{ title }}</h1>
      <h3 class="point__intro hint-title">{{ intro }}</h3>
    </div>

    <ContentView ref="content" class="point__content container" content-source="notion"
                 :content="data.blocks.results"></ContentView>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAsyncData, useMeta } from "#app";
import ContentView from "~/components/ContentView.vue";
import { useReadProgress } from "~/composables/useReadProgress";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { computed } from "@vue/reactivity";

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

const readProgress = useReadProgress();
const content = computed<HTMLElement | null>(() => document.querySelector(".point__content"));

function scrollHandler (event: Event) {
  const offsetTop = content.value?.offsetTop;
  if (!offsetTop) return;
  const scrolledHeight = window.scrollY;

  const isStartReading = offsetTop - (scrolledHeight) < 0;
  if (isStartReading) {
    const totalHeight = content.value?.scrollHeight - innerHeight
    const contentScrolled = scrolledHeight - offsetTop

    readProgress.value = contentScrolled / totalHeight * 100
  }
}

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});

</script>

<style scoped lang="scss">
.point {
  &__progress-bar {
    position: fixed;
    top: 72px;
    right: 0;
    left: 0;
    height: 4px;
    background-color: var(--gray-100);
    margin-bottom: 30px;

    @include apply-ps {
      display: none;
    }
  }

  &__progress-line {
    height: 100%;
    background-color: var(--dark);
  }

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
