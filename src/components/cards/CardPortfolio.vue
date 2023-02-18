<template>
  <div class="portfolio-card">
    <div class="portfolio-card__top">
      <a href="" class="portfolio-card__name"> {{ project.name }}</a>
      {{ project.type }}
      <a href="" class="portfolio-card__image-ibg">
        <img :src="project.image" alt="" />
      </a>
      <div class="portfolio-card__text">
        <p>
          {{ project.text }}
        </p>
      </div>
    </div>
    <a :href="project.link" class="portfolio-card__link">
      view
      <img src="@/assets/images/icons/view.svg" alt="" />
    </a>
  </div>
</template>

<script setup>
import {toRefs} from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})
const {project} = toRefs(props)
</script>

<style lang="scss" scoped>
.portfolio-card {
  display: flex;
  flex-direction: column;
  @media (max-width: $tablet) {
    padding: rem(0) rem(20) 0;
  }
  // .portfolio-card__top
  &__top {
    flex: 1 1 auto;
    @media (max-width: $tablet) {
      display: flex;
      flex-direction: column;
    }
  }
  // .portfolio-card__name
  &__name {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) -5.43%,
      rgba(255, 255, 255, 0) 87.71%
    );
    background-blend-mode: soft-light;
    backdrop-filter: blur(35px);
    border-radius: 30px;
    padding: rem(5) rem(22);
    display: inline-flex;
    align-items: center;
    min-height: rem(46);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) -5.43%,
        rgba(255, 255, 255, 0) 87.71%
      );
      @media (max-width: $tablet) {
        background: transparent;
      }
    }
    @media (max-width: $tablet) {
      min-height: none;
      font-weight: 500;
      font-size: 24px;
      line-height: 116.666667%; /* 28/24 */
      padding: 0;
      background: transparent;
    }
    &:not(:last-child) {
      margin-bottom: rem(25);
      @media (max-width: $tablet) {
        margin-bottom: rem(20);
      }
    }
  }
  // .portfolio-card__image-ibg
  &__image-ibg {
    border-radius: 30px;
    height: 275px;
    display: block;
    width: 100%;
    overflow: hidden;
    @media (max-width: em(1600)) {
      height: rem(200);
    }
    @media (max-width: $tablet) {
      margin: 0 rem(-20);
      width: calc(100% + 40px);
      height: 194px;
      order: -1;
    }
    img {
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    }
    &:not(:last-child) {
      margin-bottom: rem(25);
    }
  }
  // .portfolio-card__text
  &__text {
    font-size: 20px;
    line-height: 115%; /* 23/20 */
    max-height: rem(133);
    overflow-y: auto;
    padding-right: 10px;
    @media (max-width: em(1600)) {
      font-size: rem(16);
      max-height: rem(124);
    }
    @media (max-width: $mobileSmall) {
      font-size: 12px;

      line-height: 14px;
    }
  }
  // .portfolio-card__link
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(5) rem(20);
    margin-top: rem(35);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) -5.43%,
      rgba(255, 255, 255, 0.5) 87.71%
    );
    background-blend-mode: soft-light;
    backdrop-filter: blur(35px);
    height: rem(46);
    border-radius: 30px;
    gap: rem(10);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) -5.43%,
        rgba(255, 255, 255, 0.05) 87.71%
      );
    }
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
    @media (max-width: em(1600)) {
      margin-top: rem(20);
    }
    @media (max-width: $mobile) {
      height: 30px;
      font-size: rem(12);
    }
    img {
      width: 15px;
      flex-shrink: 0;
      .dark-theme & {
        filter: invert(1);
      }
    }
  }
}
</style>
