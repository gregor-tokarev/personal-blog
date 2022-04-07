<template>
  <div class="index">
    <div class="index__content container">
      <PointCard
        v-for="point in allPages"
        :key="point.id"
        :point="point"
      ></PointCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#app";
import { Point } from "~/types/point";
import PointCard from "~/components/PointCard.vue";

const { data: allPages } = await useFetch<Point[]>("/api/notion/all-pages");
</script>

<style scoped lang="scss">
.index {
  padding-top: 106px;

  @include apply-ps {
    padding-top: 136px;
  }

  &__content {
    margin: 0;
    display: grid;
    align-items: start;
    grid-template-columns: 1fr;

    @include apply-ps {
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @include container;
    }
  }
}
</style>
