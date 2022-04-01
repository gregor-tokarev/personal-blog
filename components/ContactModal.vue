<template>
  <div v-show="props.modelValue" class="modal">
    <div @click="showBody = false" class="modal__overlay"></div>
    <transition
      name="contact-modal"
      @after-leave="emit('update:modelValue', false)"
    >
      <div v-if="showBody" class="modal__body">
        <div class="modal__block">
          <div class="modal__label hint-title">Work Email:</div>
          <a href="mailto:e@tokarev.work" class="modal__link basic-title"
            >e@tokarev.work</a
          >
        </div>
        <div class="modal__block">
          <div class="modal__label hint-title">Telegram:</div>
          <a href="https://t.me/gregortokarev" class="modal__link basic-title"
            >@gregortokarev</a
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useState } from "#app";
import { toRefs, watch } from "@vue/runtime-core";

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emits>();

const showBody = useState("showBody", () => props.modelValue);
watch(toRefs(props).modelValue, (modelValue) => {
  showBody.value = modelValue;
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $modal-overlay-index;
    background-color: var(--dark-40);
  }

  &__body {
    position: relative;
    z-index: $modal-body-index;
    background-color: var(--white);
    padding: 30px 25px 55px;
    flex-grow: 1;

    @include apply-ps {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 65px 0;
    }
  }

  &__block {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    @include apply-ps {
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 100px;
      }
    }
  }

  &__label {
    color: var(--gray-400);
  }

  &__link {
    color: var(--dark);
    text-decoration: underline;
    cursor: pointer;
  }
}

.contact-modal-enter-active,
.contact-modal-leave-active {
  transition: all 0.2s;
}

.contact-modal-enter-from,
.contact-modal-leave-to {
  transform: translateY(100%);
}

.contact-modal-leave-from,
.contact-modal-enter-to {
  transform: translateY(0);
}
</style>
