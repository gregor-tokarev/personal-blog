<template>
  <button class="button ui-text" :class="{'button--gray': props.type === 'gray'}" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from "@vue/runtime-core";

interface Props {
  type: "default" | "gray";
}

const props = withDefaults(defineProps<Props>(), {
  type: "default"
});
</script>

<style scoped lang="scss">
.button {
  padding: 5px 20px;
  background-color: var(--dark);
  color: var(--white);
  cursor: pointer;
  border: none;
  outline: none;

  &--gray {
    background-color: var(--gray-100);
    color: var(--dark);
  }
}
</style>
