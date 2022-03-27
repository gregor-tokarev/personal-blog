<template>
  <div class="point-card">
    <img @click="detailOnMobile" class="point-card__img" :alt="props.point.title" :src="props.point.coverUrl">

    <div class="point-card__body">
      <h2 @click="detailOnMobile" class="point-card__title basic-title">{{ props.point.title }}</h2>
      <p class="point-card__text content-text">{{ props.point.intro }}</p>

      <nuxt-link :to="{name: 'point-id', params: {id: props.point.id}}">
        <Button class="point-card__button">Read full</Button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/Button.vue";
import { Point } from "~/types/point";
import { useRouter } from "#app";

const props = defineProps<{ point: Point }>();
const router = useRouter();

function detailOnMobile () {
  console.log(screen.width);
  if (screen.width < 750) {
    router.push({
      name: "point-id",
      params: { id: props.point.id }
    });
  }
}
</script>

<style scoped lang="scss">
.point-card {
  border-bottom: 2px solid var(--gray-200);

  @include apply-ps {
    border: 1px solid var(--gray-200);
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
