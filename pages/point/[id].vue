<template>
  <div class="point">
    <div class="point__progress-bar">
      <div
        class="point__progress-line"
        :style="{ width: readProgress + '%' }"
      ></div>
    </div>

    <img :src="data.page.cover.external.url" :alt="title" class="point__img" />
    <div class="point__wrapper container">
      <article class="point__article">
        <div class="point__info">
          <h1 class="point__title super-title">{{ title }}</h1>
          <h3 class="point__intro hint-title">{{ intro }}</h3>
        </div>

        <ContentView
          ref="content"
          class="point__content"
          content-source="notion"
          :content="data.blocks.results"
        ></ContentView>
      </article>

      <!-- table of contents -->
<!--      <aside class="point__toc">
        <Toc :read-progress="readProgress" :headings="toc"></Toc>
      </aside>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAsyncData, useHead } from "#app";
import ContentView from "~/components/ContentView.vue";
import { useReadProgress } from "~/composables/useReadProgress";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { computed } from "@vue/reactivity";
import Toc from "~/components/Toc.vue";

const route = useRoute();
const { data } = await useAsyncData(`page-${route.params.id}`, () =>
  $fetch(`/api/notion/one-page?pageId=${route.params.id}`)
);
const title = data.value.page.properties.Name.title[0].plain_text;
const intro = data.value.page.properties.intro.rich_text[0].plain_text;

useHead({
  title,
});

// Read progress calculation
const readProgress = useReadProgress();
const content = computed<HTMLElement | null>(() =>
  document.querySelector(".point__article")
);

function scrollHandler() {
  const offsetTop = content.value?.offsetTop;
  if (!offsetTop) return;
  const scrolledHeight = window.scrollY;

  const isStartReading = offsetTop - scrolledHeight < 0;
  if (isStartReading) {
    const totalHeight = content.value?.scrollHeight - innerHeight;
    const contentScrolled = scrolledHeight - offsetTop;

    readProgress.value = (contentScrolled / totalHeight) * 100;
  } else {
    readProgress.value = 0;
  }
}

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});

// Table of contents generation
const toc = computed<{ name: string; anchor: string }[]>(() => {
  return data.value.blocks.results
    .filter((block) => block.type === "heading_1")
    .map((block) => ({
      name: block.heading_1.rich_text[0].plain_text,
      anchor: block.id,
    }));
});
</script>

<style scoped lang="scss">
.point {
  padding-top: 76px;

  &__progress-bar {
    position: fixed;
    top: 76px;
    right: 0;
    left: 0;
    height: 4px;
    background-color: var(--gray-100);
  }

  &__progress-line {
    height: 100%;
    background-color: var(--dark);
  }

  &__img {
    width: 100%;
    object-position: top;
    object-fit: cover;
    max-height: 520px;
  }

  &__wrapper {
    padding-top: 20px;

    @include apply-ps {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding-top: 30px;
    }
  }

  &__article {
    margin: 0 auto;
    @include apply-ps {
      flex-basis: 83%;
    }
  }

  &__toc {
    display: none;

    @include apply-ps {
      position: sticky;
      top: 100px;
      display: unset;
      flex-basis: 15%;
    }
  }

  &__info {
    padding: 0 0 40px;
  }

  &__title {
    margin: 0 0 10px;
    color: var(--dark);
  }

  &__intro {
    padding: 10px 15px;
    background-color: var(--gray-100);
    color: var(--gray-400);

    @include apply-ps {
      padding: 15px 20px;
    }
  }
}
</style>
