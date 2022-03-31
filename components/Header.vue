<template>
  <header class="header">
    <div class="header__inner container">
      <div class="header__left">
        <img alt="my face" width="60px" height="60px" src="~public/img/my-face.jpg" class="header__face">

        <div class="header__text-mobile content-text">G.T</div>
        <div class="header__text-desktop content-text">Georg Tokarev - Software engeneer & ux/ui designer</div>
      </div>
      <div class="header__right">
        <!--        <Button class="header__follow" type="gray">Follow</Button>-->
        <Button>Contact me</Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from "~/components/Button.vue";
</script>

<style scoped lang="scss">
.header {
  background-color: var(--white);
  padding: 8px 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  color: var(--gray-300);

  &__inner {
    display: flex;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__right {
    margin-left: auto;
  }

  &__follow {
    margin-right: 10px;
  }

  &__text-desktop {
    display: none;
    margin-left: 15px;

    @include apply-ps {
      display: block;
    }
  }

  &__text-mobile {
    margin-left: 5px;

    @include apply-ps {
      display: none;
    }
  }
}
</style>
