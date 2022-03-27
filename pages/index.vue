<template>
  <div class="index">
    <PointItem
      v-for="point in allPages"
      :key="point.id"
      :point="point"
    ></PointItem>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#app";
import PointItem from "~/components/PointItem.vue";
import { Point } from "~/types/point";

const { data: allPages } = await useFetch<Point[]>("/api/notion/all-pages");
</script>

<style scoped lang="scss"></style>
