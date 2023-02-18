<template>
  <div class="not-found">
    <div class="not-found__content">
      <h2 class="not-found__title">404</h2>
      <div class="not-found__subtitle">seems you've got the wrong place</div>
      <div class="not-found__image">
        <img src="@/assets/images/main-img/404.png" alt="" />
      </div>
      <div class="not-found__mob-text">
        <p>
          there is nothing interesting here, <br />
          but you can always:
        </p>
      </div>
      <div class="not-found__button-wrap">
        <RouterLink class="button _fw" :to="{name: 'main'}"
          ><span>Open Main Page</span></RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-found {
  @media (max-width: $tablet) {
    height: 100%;
    width: 100%;
    padding: 32px;
  }
  // .not-found__content

  &__content {
    text-align: center;
  }

  // .not-found__title

  &__title {
    font-weight: 700;
    @include adaptiveValue('font-size', 120, 24);
    line-height: 115%; /* 138/120 */
    @media (max-width: $tablet) {
      margin-bottom: rem(8);
    }
    @media (max-width: $mobile) {
      font-size: rem(24);
    }
  }

  // .not-found__subtitle
  &__image {
    display: flex;
    justify-content: center;
    @media (min-width: $tablet) {
      display: none;
    }
    img {
      max-width: 100%;
    }
    &:not(:last-child) {
      margin-bottom: rem(32);
    }
  }
  &__mob-text {
    @media (min-width: $tablet) {
      display: none;
    }
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    @media (max-width: $mobile) {
      font-size: 12px;
      line-height: 14px;
    }
    color: #e4e4e4;
    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }
  &__subtitle {
    @include adaptiveValue('font-size', 48, 12);
    line-height: 114.583333%; /* 55/48 */
    @media (max-width: $mobile) {
      font-size: rem(12);
    }
    &:not(:last-child) {
      margin-bottom: 40px;
      @media (max-width: $tablet) {
        margin-bottom: rem(24);
      }
    }
  }

  // .not-found__butn-wrap

  &__button-wrap {
    display: flex;
    justify-content: center;
    .button {
      max-width: 422px;
      @media (max-width: $mobile) {
        max-width: rem(180);
      }
    }
  }
}
</style>
