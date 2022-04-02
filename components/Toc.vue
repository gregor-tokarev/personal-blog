<template>
  <div class="toc">
    <div class="toc__line">
      <div
        class="toc__progress"
        :style="{
          transform: `scaleY(${props.readProgress / 100})`,
          height: `${lineHeight}px`,
        }"
      ></div>
    </div>

    <a
      v-for="(heading, index) in props.headings"
      :key="heading.anchor"
      :href="'#' + heading.anchor"
      class="toc__section ui-text"
    >
      <div class="toc__item">
        <div>
          <div v-html="CheckSvg" class="toc__checkbox"></div>
          <div
            v-if="index !== props.headings.length - 1"
            class="toc__border"
          ></div>
        </div>
        {{ heading.name }}
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import CheckSvg from "~/assets/icons/check.svg?raw";
import { computed } from "@vue/reactivity";

interface Props {
  readProgress: number;
  headings: { anchor: string; name: string }[];
}

const props = defineProps<Props>();

const lineHeight = computed<number>(() => {
  return (30 + 104) * props.headings.length - 104;
});
</script>

<style scoped lang="scss">
$checkbox-size: 30px;
$checkbox-border: 1.5px;

.toc {
  &__line {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    mask-image: url("/img/toc-mask.svg");
    width: $checkbox-size;
    overflow: hidden;
  }

  &__progress {
    height: 100%;
    width: $checkbox-size;
    background-color: var(--dark);
    transform-origin: 0 0;
    transform: scaleY(0);
  }

  &__section {
  }

  &__item {
    display: flex;
    align-items: flex-start;
  }

  &__border {
    margin-left: calc($checkbox-size / 2);
    width: 6px;
    height: 104px;
    transform: translateX(-50%);
    border-left: 1px solid var(--dark);
    border-right: 1px solid var(--dark);
  }

  &__checkbox {
    position: relative;
    z-index: $header-index;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: $checkbox-size;
    height: $checkbox-size;
    border-radius: 50%;
    border: $checkbox-border solid var(--dark);
    margin-right: 5px;
  }
}
</style>
