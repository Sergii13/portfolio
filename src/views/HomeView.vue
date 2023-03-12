<template>
  <SpinnerApp v-if="isLoading" />
  <section v-if="data" class="main-block">
    <div class="main-block__row">
      <div class="main-block__left">
        <div class="main-block__top-left">
          <div class="main-block__slider-wrap">
            <swiper
              class="main-block__slider"
              :modules="[EffectCoverflow, Navigation]"
              effect="coverflow"
              :coverflowEffect="{
                rotate: -40,
                stretch: 200,
                depth: 400,
                modifier: 1,
                slideShadows: false,
              }"
              :navigation="{
                nextEl: '.arrow.next',
                prevEl: '.arrow.prev',
              }"
              :slides-per-view="'auto'"
              :speed="1200"
              :centered-slides="true"
              :loop="true"
              :breakpoints="breakpointsSwiper"
              @slideChange="changeSwiperIndex"
              @swiper="onSwiper"
            >
              <swiper-slide
                v-for="project of data.projects"
                :key="project.link"
                class="main-block__slide"
              >
                <div
                  @click="handleOpenModal"
                  class="main-block__image-slide-ibg"
                >
                  <img :src="project.image" alt="" />
                </div>
              </swiper-slide>
            </swiper>
            <div class="main-block__arrows">
              <button class="arrow prev">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.460789 7.53856L7.12145 14.1992L8.49902 12.8216L3.11064 7.43326L8.39917 2.14474L7.02277 0.768333L0.362109 7.42899L0.466233 7.53312L0.460789 7.53856Z"
                  />
                </svg>
              </button>
              <button class="arrow next">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.460789 7.53856L7.12145 14.1992L8.49902 12.8216L3.11064 7.43326L8.39917 2.14474L7.02277 0.768333L0.362109 7.42899L0.466233 7.53312L0.460789 7.53856Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="main-block__button-wrap">
            <a
              href=""
              @click.prevent="handleOpenModal"
              class="button main-block__button _fw"
            >
              <span> Press to watch </span>
            </a>
          </div>
        </div>
        <h2 class="main-block__title-big">
          Daniel Sonis
          <span>@denielsonis</span>
        </h2>
      </div>

      <div class="main-block__content">
        <div class="main-block__title">Hey, I am {{ data.name }}</div>
        <div class="main-block__avatar-block">
          <div class="main-block__smile main-block__smile_1">
            <img src="@/assets/images/icons/smile01.svg" alt="" />
          </div>
          <div class="main-block__smile main-block__smile_2">
            <img src="@/assets/images/icons/smile02.svg" alt="" />
          </div>
          <div class="main-block__avatar-ibg">
            <img :src="data.avatar" alt="" />
          </div>
        </div>
        <div class="main-block__text">
          {{ data.text }}
        </div>
        <div class="main-block__tags">
          <span v-for="tag of data.tags" :key="tag" class="main-block__tag"
            >#{{ tag }}
          </span>
        </div>
        <div class="main-block__links">
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
          <a href="" class="main-block__link">
            <img src="@/assets/images/icons/iconContact.png" alt="" />
          </a>
        </div>
      </div>
    </div>
    <ModalHome :data="dataToPopup" />
  </section>
</template>
<script setup>
import {onMounted, ref, computed, onUnmounted, watch} from 'vue'
import {EffectCoverflow, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {useMainPage} from '@/stores/mainPage'
import {useModal} from '@/stores/modal'
import {storeToRefs} from 'pinia'
import SpinnerApp from '@/components/SpinnerApp.vue'
import ModalHome from '@/views/ModalHome.vue'
import {useTheme} from '@/composables/useTheme.js'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const breakpointsSwiper = {
  320: {
    coverflowEffect: {
      rotate: 0,
      stretch: 60,
      depth: 400,
      modifier: 1,
      slideShadows: false,
    },
  },

  992: {
    coverflowEffect: {
      rotate: -40,
      stretch: 200,
      depth: 400,
      modifier: 1,
      slideShadows: false,
    },
  },
}

const storeModal = useModal()
const handleOpenModal = () => {
  document.documentElement.classList.add('portfolio')
  storeModal.openModal()
}

const storeMain = useMainPage()
const {data, isLoading} = storeToRefs(storeMain)

onMounted(() => {
  storeMain.getMain()
  resetColor()
})

const mainSwiper = ref(null)
const realIndex = ref(null)
const onSwiper = (swiper) => {
  mainSwiper.value = swiper
  realIndex.value = mainSwiper.value.realIndex
}
const changeSwiperIndex = () => {
  if (mainSwiper.value) {
    realIndex.value = mainSwiper.value.realIndex
    setColorWithData()
  }
}
const dataToPopup = computed(() => {
  if (data.value) {
    return data.value.projects[realIndex.value]
  }
})
const {currentTheme} = useTheme()
const resetColor = () => {
  setTimeout(() => {
    const root = document.documentElement
    root.style.removeProperty('--colorSwiper')
    root.style.removeProperty('--iconColor')
    document.documentElement.classList.remove('color')
  }, 1000)
}
const setColorWithData = () => {
  if (dataToPopup.value && currentTheme.value == 'dark-theme') {
    const root = document.documentElement
    document.documentElement.classList.add('animate')
    document.documentElement.classList.add('color')
    root.style.setProperty('--colorSwiper', `${dataToPopup.value.color}`)
    root.style.setProperty('--iconColor', `${dataToPopup.value.iconColor}`)
    setTimeout(() => {
      document.documentElement.classList.remove('animate')
    }, 1000)
  } else {
    resetColor()
  }
}
watch(currentTheme, (newValue, oldValue) => {
  if (oldValue === 'dark-theme') {
    resetColor()
  }
})
onUnmounted(() => {
  resetColor()
})
</script>
<style lang="scss" scoped>
.main-block {
  width: 100%;
  height: 100%;

  // .main-block__row
  &__row {
    display: flex;
    gap: 60px;
    padding-left: rem(35);
    height: 100%;
    @media (max-width: $pc) {
      padding-left: 0;
      gap: rem(20);
    }

    @media (max-width: $tablet) {
      flex-direction: column-reverse;
      justify-content: flex-end;
      gap: 0;
    }
  }

  // .main-block__left
  &__left {
    gap: rem(110);
    width: 50%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    @media (max-width: em(1600)) {
      gap: 60px;
    }
    @media (max-height: em(1050)) {
      gap: 60px;
    }
    @media (max-width: $pc) {
      gap: 30px;
    }
    @media (max-width: $tablet) {
      width: 100%;
      gap: 0;
    }
  }

  // .main-block__slider-wrap
  &__slider-wrap {
    min-width: 0;
    position: relative;
    max-width: rem(800);
    width: 100%;
    margin: 0 auto;
    @media (max-width: em(1850)) {
      padding: 0 30px;
    }
    @media (max-width: $pc) {
      padding: 0 50px;
    }
    @media (max-width: $tablet) {
      overflow: unset;
      max-width: 100%;
      padding: 0;
    }

    margin-bottom: rem(50);
    @media (max-width: $tablet) {
      margin-bottom: rem(25);
    }
  }

  // .main-block__arrows
  &__arrows {
    position: absolute;
    width: calc(90% + 30px);
    display: flex;
    z-index: 10;
    justify-content: space-between;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: em(1850)) {
      width: calc(100% + 30px);
    }
    @media (max-width: em(1400)) {
      width: 100%;
    }

    @media (max-width: $tablet) {
      display: none;
    }

    .arrow {
      background: #eef3ff;
      mix-blend-mode: soft-light;
      backdrop-filter: blur(5px);
      width: 30px;
      pointer-events: all;
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      height: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      .dark-theme & {
        background: rgba(255, 255, 255, 0.12);
      }
      svg {
        transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
        fill: var(--iconColor, #539fef);
      }

      @media (any-hover: hover) {
        &:hover {
          box-shadow: 0 0 15px var(--main-color);
        }
      }

      &.next {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  // .main-block__slider
  &__slider {
    min-width: 0;
    margin: 0 auto;
    max-width: rem(525);
    overflow: visible !important;

    @media (max-width: em(1600)) {
      max-width: 450px;
    }

    @media (max-width: $tablet) {
      max-width: 100%;
    }
  }

  // .main-block__wrapper
  &__wrapper {
  }

  // .main-block__slide
  &__slide {
    width: 100% !important;
    position: relative;
    z-index: 2;
    visibility: hidden;
    opacity: 0;
    &.swiper-slide-prev,
    &.swiper-slide-next {
      visibility: visible;
      opacity: 0.45;
    }

    &.swiper-slide-active {
      opacity: 1;
      visibility: visible;

      .main-block__image-slide-ibg {
        border-radius: 30px;
      }

      .main-block__image-slide-ibg::after {
        display: none;
      }

      &.swiper-slide-visible {
        z-index: 10;
      }
    }
  }

  // .main-block__image-slide-ibg
  &__image-slide-ibg {
    width: 100%;
    padding-bottom: 52.380952%;
    /* 275/525 */

    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(38, 38, 38, 0) -36.84%,
        rgba(101, 101, 101, 0.5) 219.08%
      );
    }
  }

  // .main-block__button-wrap
  &__button-wrap {
    display: flex;
    justify-content: center;
  }

  // .main-block__button
  &__button {
    max-width: rem(422);

    @media (max-width: $mobile) {
      max-width: rem(252);
      &::after {
        content: '';
        border: 1px solid #ffffff;
      }
    }
  }

  // .main-block__title-big
  &__title-big {
    font-weight: 600;
    @include adaptiveValue('font-size', 120, 50, 0, 1920, 768);
    line-height: 115%;
    margin-top: 7vh;

    @media (max-height: em(1080)) {
      margin-top: rem(30);
    }

    @media (max-width: em(1600)) {
      margin-top: rem(30);
      font-size: rem(90);
    }

    @media (max-width: $pc) {
      font-size: rem(72);
    }

    @media (max-width: $tablet) {
      display: none;
    }

    span {
      --bg-size: 100%;
      display: block;
      font-weight: 600;
      @include adaptiveValue('font-size', 96, 50, 0, 1920, 768);
      line-height: 104.166667%;
      background: var(
        --colorSwiper,
        linear-gradient(263.18deg, #005bbb 16.86%, #6db4ff 104.2%)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      transition: all 0.8s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      .animate & {
        opacity: 0.6;
        animation: gradient-text-animation 1s linear;
      }

      @media (max-width: em(1600)) {
        font-size: rem(70);
      }

      @media (max-width: $pc) {
        font-size: rem(50);
      }

      // animation: move-bg 0.3s ease-in-out infinite;
    }
    /* 100/96 */
  }

  // .main-block__content
  &__content {
    width: 51.823529%;
    overflow: hidden;
    backdrop-filter: blur(12.5px);
    border-radius: 60px;
    padding: 40px 40px 55px;
    text-align: center;
    position: relative;

    @media (max-width: em(1600)) {
      padding: 30px 20px;
    }

    @media (max-width: $tablet) {
      width: 100%;
      overflow: unset;
      background: none;
      border-radius: 0px;
      backdrop-filter: blur(0px);
      padding: rem(22) rem(15) rem(34);
    }

    .dark-theme & {
      background: transparent;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 60px;
      width: 100%;
      z-index: -1;
      height: 100%;
      transition: all 1s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      background: #eef3ff;
      background-position: 0 0;
      backdrop-filter: blur(12.5px);
      opacity: 0.82;
      .dark-theme & {
        background: linear-gradient(180.15deg, #c4c4c4 0.13%, #6db4ff 99.87%);
        opacity: 0.02;
        @media (max-width: $tablet) {
          display: none;
        }
      }
      @media (max-width: $tablet) {
        background: none;
        border-radius: 0px;
      }
    }
  }

  // .main-block__title
  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 115%;
    /* 23/20 */
    text-align: center;
    text-transform: uppercase;
    mix-blend-mode: normal;

    @media (max-width: $pc) {
      font-size: rem(16);
    }

    @media (max-width: $mobileSmall) {
      font-size: rem(12);
    }

    &:not(:last-child) {
      margin-bottom: rem(30);
    }
  }

  // .main-block__avatar-block
  &__avatar-block {
    margin: 0 auto;
    max-width: 200px;
    position: relative;

    &:not(:last-child) {
      margin-bottom: rem(27);
    }
  }

  // .main-block__smile
  &__smile {
    background: #d9d9d9;
    border: 5px solid #ffffff;
    backdrop-filter: blur(5px);
    transform: matrix(0.99, -0.13, 0.13, 0.99, 0, 0);
    width: 85px;
    height: 85px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    .dark-theme & {
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(217, 217, 217, 0) 100%
      );
      border: 5px solid #5e626d;
      background-blend-mode: soft-light;
      backdrop-filter: blur(5px);
    }

    // .main-block__smile_1
    &_1 {
      bottom: 12px;
      left: 0;
      transform: translateX(-80%);
    }

    // .main-block__smile_2
    &_2 {
      top: 20px;
      right: 0;
      transform: translateX(80%);
    }
  }

  // .main-block__avatar-ibg
  &__avatar-ibg {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 5px solid #30313d;
    border-radius: 50%;
    z-index: 2;
  }

  // .main-block__text
  &__text {
    max-width: rem(607);
    margin: 0 auto;

    @media (max-width: $tablet) {
      display: none;
    }

    &:not(:last-child) {
      margin-bottom: rem(40);
    }
  }

  // .main-block__tags
  &__tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 600px;
    margin: 0 auto;
    gap: 50px 18px;
    @media (max-width: em(1600)) {
      gap: rem(20) rem(10);
    }

    &:not(:last-child) {
      margin-bottom: 5vh;

      @media (max-width: $tablet) {
        margin-bottom: rem(20);
      }
    }
  }

  // .main-block__tag
  &__tag {
    min-height: rem(30);
    display: inline-flex;
    line-height: 1;
    align-items: center;
    color: #e4e4e4;
    border-radius: 10px;
    background: var(--main-color);
    padding: 0 rem(10);
    &::after {
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    }
    .color & {
      background: transparent;
      &::after {
        content: '';
        opacity: 0.1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: linear-gradient(
          263.18deg,
          rgba(12, 17, 20, 1) 16.86%,
          var(--iconColor) 104.2%
        );
      }
    }
    @media (max-width: $mobile) {
      font-weight: 700;
      font-size: 7px;
      line-height: 8px;
      min-height: rem(20);
      padding: 0 rem(6.5);
    }

    .dark-theme & {
      background: linear-gradient(
        264.73deg,
        rgba(109, 180, 255, 0.1) 30.18%,
        rgba(80, 129, 255, 0.1) 78.31%
      );
    }
  }

  // .main-block__links
  &__links {
    max-width: rem(591);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: rem(20) rem(50);
    flex-wrap: wrap;

    @media (max-width: em(1600)) {
      gap: rem(20);
    }
  }

  // .main-block__link
  &__link {
    position: relative;
    .dark-theme & {
      background: #0c1325;
    }

    background: rgba(228, 228, 228, 0.5);
    .color & {
      background: transparent;
      &::after {
        content: '';
        opacity: 0.1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
        background: linear-gradient(
          263.18deg,
          rgba(12, 17, 20, 1) 16.86%,
          var(--iconColor) 104.2%
        );
      }
    }
    backdrop-filter: blur(10px);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);

    @media (max-width: $pc) {
      width: 40px;
      height: 40px;
    }

    @media (max-width: $mobile) {
      width: 23px;
      height: 23px;
    }

    img {
      @media (max-width: $pc) {
        width: 20px;
      }

      @media (max-width: $mobile) {
        width: 10px;
      }

      .dark-theme & {
        filter: invert(0);
      }

      filter: invert(1);
    }

    &:hover {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }
  }
}
@keyframes move-bg {
  to {
    background-position: 400% 0;
  }
}
@keyframes second_heading_gradient {
  0%,
  50% {
    opacity: 1;
  }

  66.667%,
  83.333% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
@keyframes gradient-text-animation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
