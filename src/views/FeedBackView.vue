<template>
  <AppSlider :isLoading="isLoading" :data="feedbacks">
    <template #card="{data}">
      <CardFeedback :feedback="data" />
    </template>
  </AppSlider>
</template>

<script setup>
import {onMounted} from 'vue'
import {useFeedbackStore} from '@/stores/feedbacks'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import AppSlider from '@/components/layout/AppSlider.vue'
import CardFeedback from '@/components/cards/CardFeedback.vue'

const store = useFeedbackStore()
const {feedbacks, isLoading} = storeToRefs(store)
const router = useRouter()

onMounted(() => {
  store.getFeedbacks('feedback/').catch(() => {
    router.push({name: '404'})
  })
})
</script>

<style lang="scss">
.feedback {
  position: relative;
  width: 100%;
  height: 100%;

  // .feedback__button-more
  &__button-more {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #dbe2ff;
    backdrop-filter: blur(35px);
    height: 41px;
    z-index: 3;
    border-radius: 30px;
    width: 183px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #212121;
    padding: rem(5) rem(15);
    gap: rem(10);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    @media (max-width: $tablet) {
      bottom: 00px;
    }
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
    img {
      width: 17px;
      flex-shrink: 0;
    }
  }

  &__slider-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh - 140px);
    @media (max-width: em(1600)) {
      height: calc(100vh - 95px);
    }
    overflow: hidden;
    padding-left: rem(25);
    &.portfolio-block {
      overflow: visible;
      width: 100%;
    }
    @media (max-width: $tablet) {
      padding: 0 rem(25);
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      height: 300px;
      display: none;
    }
  }
  &__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 rem(160);
    @media (max-width: em(1500)) {
      gap: rem(50);
    }
    @media (max-width: em(1200)) {
      gap: rem(32);
    }
  }
  &__slider-wrap2 {
    overflow: hidden;
    height: calc(100% - 107px);
  }
  // .feedback__slider
  &__slider {
    height: 100% !important;
  }
  // .feedback__wrapper

  // .feedback__slide
  &__slide {
    opacity: 0.5;
    height: auto !important;
    @media (max-width: $tablet) {
      opacity: 0.2;
      &.swiper-slide-visible {
        opacity: 0.5;
      }
    }
    &.swiper-slide-active {
      opacity: 1;
    }
  }
  // .feedback__card
  &__card {
    height: 100%;
  }
}

.card-feedback {
  display: flex;
  flex-direction: column;
  gap: rem(15);
  // .card-feedback__head
  &__head {
    display: flex;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.7) -5.43%,
      rgba(255, 255, 255, 0) 87.71%
    );
    backdrop-filter: blur(35px);
    border-radius: 30px;
    gap: rem(10);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) -5.43%,
        rgba(255, 255, 255, 0) 87.71%
      );
    }
  }
  // .card-feedback__title
  &__title {
    flex: 1 1 auto;
    font-weight: 500;
    font-size: 20px;
    line-height: 115%; /* 23/20 */
    padding: rem(5) rem(0) rem(5) rem(22);
    max-width: calc(100% - 90px);
    word-break: break-word;
    @media (max-width: $pc) {
      font-size: rem(16);
    }
    @media (max-width: $mobileSmall) {
      font-size: 12px;
      line-height: 14px;
    }
  }
  // .card-feedback__button
  &__button {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) -5.43%,
      rgba(255, 255, 255, 0.5) 87.71%
    );
    backdrop-filter: blur(35px);
    height: 46px;
    border-radius: 30px;
    line-height: 17px;
    padding: rem(5) rem(16);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
    @media (max-width: $mobileSmall) {
      height: 30px;
      min-width: rem(115);
      font-size: rem(12);
    }
    img {
      width: 15px;
      flex-shrink: 0;
    }
  }
  // .card-feedback__body
  &__body {
    flex: 1 1 auto;
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.7) -5.43%,
        rgba(255, 255, 255, 0) 87.71%
      ),
      linear-gradient(
        92.03deg,
        rgba(255, 255, 255, 0.21) -3.15%,
        rgba(255, 255, 255, 0.12) 51.71%
      );
    backdrop-filter: blur(35px);
    border-radius: 30px;
    padding: rem(36) rem(12) rem(36) rem(22);
    font-size: 20px;
    height: rem(215);
    text-overflow: ellipsis;
    line-height: 115%; /* 23/20 */
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    p {
      height: 100%;
      overflow: auto;
      padding-right: rem(10);
    }
    @media (max-width: $pc) {
      font-size: rem(16);
      max-height: rem(204);
      padding: rem(26) rem(12) rem(26) rem(15);
    }
    .dark-theme & {
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.001),
          rgba(255, 255, 255, 0.001)
        ),
        linear-gradient(
          92.03deg,
          rgba(255, 255, 255, 0.21) -3.15%,
          rgba(255, 255, 255, 0.12) 51.71%
        );
      @media (max-width: $tablet) {
        background-image: none;
      }
    }
    @media (max-width: $tablet) {
      background-image: none;
      backdrop-filter: blur(0px);
      padding: rem(0) rem(12) 0 rem(22);
      max-height: rem(95);
      border: none;
    }
    @media (max-width: $mobileSmall) {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
