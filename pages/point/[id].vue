<template>
  <div class="point">
    <ContentView content-source="notion" :content="data.blocks.results"></ContentView>
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

useMeta({
  title: data.value.page.properties.Name.title[0].plain_text
});
</script>

<style scoped lang="scss"></style>
