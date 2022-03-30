<template>
  <div class="icon" v-html="iconContent"></div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>();
console.dir(import.meta)
</script>

<style scoped lang="scss">

</style>
