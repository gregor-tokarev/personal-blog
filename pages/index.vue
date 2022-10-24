<template>
  <div class="index">
    <div class="index__content container">
      <PointCard
        class="index__card"
        v-for="(point, index) in allPages"
        @click="router.push({ name: 'point-id', params: { id: point.id } })"
        :layout="index === 0 ? 'horizontal' : 'vertical'"
        :key="point.id"
        :point="point"
      ></PointCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRouter } from "#app";
import { Point } from "~/types/point";
import PointCard from "~/components/PointCard.vue";

const { data: allPages } = await useFetch<Point[]>("/api/notion/all-pages");
const router = useRouter();
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

  &__card {
    &:first-child {
      grid-column: span 2;
    }
  }
}
</style>
