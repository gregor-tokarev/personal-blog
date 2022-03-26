<template>
  <div class="point">
    {{ page }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFetch } from "#app";

const route = useRoute();
const { data: page } = await useFetch(
  `/api/notion/one-page?pageId=${route.params.id}`
);
</script>

<style scoped lang="scss"></style>
