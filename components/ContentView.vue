<template>
  <div v-html="content" class="content">
  </div>
</template>

<script setup lang="ts">
import { contentSource } from "~/types/content";
import { computed } from "@vue/reactivity";
import { NotionParser } from "~/lib/notion-parser";

const props = defineProps<{ contentSource: contentSource; content: any }>();

const content = computed<any>(() => {
  if (props.contentSource === "notion") {
    const parser = new NotionParser(props.content)
    return parser.getHtml()
  }
});
</script>

<style scoped lang="scss"></style>
