<template>
  <nuxt-link
    :to="{ name: 'point-id', params: { id: props.point.id } }"
    class="point-item"
  >
    <img
      v-if="props.point.coverUrl"
      :src="props.point.coverUrl"
      alt=""
      class="point-item__cover"
    />
  </nuxt-link>
</template>

<script setup lang="ts">
import { Point } from "~/types/point";

const props = defineProps<{ point: Point }>();
</script>

<style scoped lang="scss"></style>
