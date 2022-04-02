<template>
  <div v-html="content" class="content"></div>
</template>

<script setup lang="ts">
import { contentSource } from "~/types/content";
import { computed } from "@vue/reactivity";
import { NotionParser } from "~/lib/notion-parser";

const props = defineProps<{ contentSource: contentSource; content: any }>();

const content = computed<any>(() => {
  if (props.contentSource === "notion") {
    const parser = new NotionParser(props.content);
    return parser.getHtml();
  }
});
</script>

<style scoped lang="scss">
.content {
  color: var(--gray-400);

  :deep(h1) {
    margin: 30px 0 5px;
    color: var(--dark);

    @include apply-ps {
      margin: 30px 0 20px;
    }
  }

  :deep(ul) {
    list-style-position: inside;
  }

  :deep(p) {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    @include apply-ps {
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
