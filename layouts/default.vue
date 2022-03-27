<template>
  <div class="layout">
    <Header class="layout__header"></Header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header";
</script>

<style scoped lang="scss"></style>
