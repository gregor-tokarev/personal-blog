<template>
  <div
    class="point-card"
    :class="{ 'point-card--horizontal': props.layout === 'horizontal' }"
  >
    <img
      class="point-card__img"
      :alt="props.point.title"
      :src="props.point.coverUrl"
    />

    <div class="point-card__body">
      <h2 class="point-card__title basic-title">
        {{ props.point.title }}
      </h2>
      <p class="point-card__text content-text">{{ props.point.intro }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Point } from "~/types/point";

const props = defineProps<{
  point: Point;
  layout: "horizontal" | "vertical";
}>();
</script>

<style scoped lang="scss">
.point-card {
  border-bottom: 2px solid var(--gray-200);
  cursor: pointer;

  @include apply-ps {
    border: 1px solid var(--gray-200);
  }

  &--horizontal {
    @include apply-ps {
      display: flex;

      .point-card__img {
        width: 49%;
        max-height: 420px;
      }
    }
  }

  &__img {
    max-height: 220px;
    width: 100%;
    object-position: top center;
    object-fit: cover;
  }

  &__body {
    padding: 15px;
  }

  &__title {
    color: var(--dark);
    margin-bottom: 20px;
  }

  &__text {
    color: var(--gray-400);
  }

  &__button {
    display: none;

    @include apply-ps {
      display: block;
      margin-top: 20px;
    }
  }
}
</style>
