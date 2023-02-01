<template>
  <div class="not-found">
    <div class="not-found__content">
      <h2 class="not-found__title">404</h2>
      <div class="not-found__subtitle">seems you've got the wrong place</div>
      <div class="not-found__button-wrap">
        <RouterLink class="button _fw" :to="{name: 'main'}"
          >Open Main Page</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-found {
  // .not-found__content

  &__content {
    text-align: center;
  }

  // .not-found__title

  &__title {
    font-weight: 700;
    font-size: 120px;
    line-height: 115%; /* 138/120 */
  }

  // .not-found__subtitle

  &__subtitle {
    font-size: 48px;
    line-height: 114.583333%; /* 55/48 */
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  // .not-found__butn-wrap

  &__button-wrap {
    display: flex;
    justify-content: center;
    .button {
      max-width: 422px;
    }
  }
}
</style>
