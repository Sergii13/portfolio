<template>
  <SpinnerApp v-if="isLoading" />
  <div v-if="data" class="project">
    <div class="project__slider-wrap" id="project">
      <swiper
        :key="route.fullPath"
        :modules="[Navigation, Thumbs]"
        :slidesPerView="1"
        :spaceBetween="30"
        :speed="800"
        :loop="true"
        :thumbs="{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }"
        @swiper="setMainSwiper"
        class="project-main__slider swiper"
      >
        <div class="project__info info-project">
          <div class="info-project__item">
            <BreadcrumbsApp :items="breadcrumbsItems" />
          </div>
          <div class="info-project__item">{{ normalizeDate }}</div>
        </div>
        <swiper-slide
          v-for="(image, index) of data.images"
          :key="index"
          class="project-main__slide-ibg swiper-slide"
        >
          <img :src="image" alt="" />
        </swiper-slide>
      </swiper>
      <swiper
        :modules="[EffectCoverflow, Thumbs]"
        :slidesPerView="'auto'"
        :direction="'vertical'"
        :watchSlidesProgress="true"
        :speed="800"
        :centeredSlides="true"
        :loop="true"
        :effect="'coverflow'"
        :coverflowEffect="{
          rotate: -5,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }"
        :breakpoints="sliderThumbBreakpoints"
        @swiper="setThumbsSwiper"
        class="project-thumb__slider swiper"
      >
        <swiper-slide
          v-for="image of data.images"
          class="project-thumb__slide-ibg swiper-slide"
        >
          <img :src="image" alt="" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="project__content">
      <div class="project__title">{{ data.title }}</div>
      <div v-if="linksArray.length > 0" class="project__buttons">
        <a
          v-for="link of linksArray"
          :key="link.link"
          :href="link.link"
          class="project__button"
        >
          view on
          <img :src="link.img" alt="" />
        </a>
      </div>
      <div class="project__descr">
        <p>
          {{ data.text }}
        </p>
      </div>
      <div class="project__image">
        <img :src="data.images[0]" alt="" />
        <router-link
          :to="{name: 'project', params: {slug: data.nextSlug, id: data.next}}"
          class="project__next"
        >
          <img src="@/assets/images/icons/arrow.svg" alt="" />
        </router-link>
      </div>
      <div class="project__block-back">
        <router-link :to="{name: 'portfolio'}" class="project__back-button">
          back to portfolio page
          <img src="@/assets/images/icons/view.svg" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {EffectCoverflow, Thumbs, Navigation} from 'swiper'
import {SwiperSlide, Swiper} from 'swiper/vue'
import {ref, onMounted, computed, onUnmounted} from 'vue'
import {useProjectStore} from '@/stores/project'
import {storeToRefs} from 'pinia'
import {useRoute, onBeforeRouteUpdate, useRouter} from 'vue-router'
import SpinnerApp from '@/components/SpinnerApp.vue'
import {formatDate} from '@/helpers/methods'
import {images} from '@/helpers/imageServices'
import BreadcrumbsApp from '@/components/BreadcrumbsApp.vue'

const sliderThumbBreakpoints = {
  992: {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 1500,
    effect: 'normal',
    direction: 'horizontal',
    centeredSlides: false,
  },
}

const thumbsSwiper = ref(null)
const mainSwiper = ref(null)
const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper
}
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const store = useProjectStore()
const {data, isLoading} = storeToRefs(store)
const route = useRoute()

const linksArray = computed(() => {
  return data.value.links.map((link) => {
    return {
      link: link.link,
      text: link.text,
      img: images.find((item) => item.type === link.type).img,
      type: link.type,
    }
  })
})

const normalizeDate = computed(() => {
  return formatDate(data.value.date)
})

const isMobile = ref(false)
const handleResize = () => {
  if (window.innerWidth < 991) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
const breadcrumbsItems = computed(() => {
  return [
    {nameComponent: 'main', isDisabled: false, text: 'Main'},
    {nameComponent: 'portfolio', isDisabled: false, text: 'Portfolio'},
    {nameComponent: '', isDisabled: true, text: data.value.title},
  ]
})

onBeforeRouteUpdate((to, from, next) => {
  next()
  store.getProject(to.params.id)
})

onMounted(() => {
  store.getProject(route.params.id)
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.project {
  display: grid;
  grid-template-columns: 1fr 464px;
  width: 100%;
  gap: rem(50);
  flex: 1 1 auto;
  @media (max-width: em(1600,)) {
    grid-template-columns: 1fr 354px;
    gap: rem(20);
  }
  @media (max-width: $tablet) {
    grid-template-columns: repeat(1, 1fr);
    width: auto;
    max-width: 100%;
    min-width: 0;
  }
  // .project__slider-wrap
  &__slider-wrap {
    position: relative;
    min-width: 0;
    flex: 1 1 auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    align-items: stretch;
    @media (max-width: $tablet) {
      display: block;
    }
  }
  // .project__info
  &__info {
  }
  // .project__content
  &__content {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    @media (max-width: $tablet) {
      padding: rem(0) rem(43);
    }
  }
  // .project__title
  &__title {
    font-weight: 500;
    font-size: clamp(40px, 5.92vh, 64px);
    line-height: 115.625%; /* 74/64 */
    @media (max-width: em(1600)) {
      font-size: rem(40);
    }
    @media (max-width: $tablet) {
      font-size: rem(24);
    }
    &:not(:last-child) {
      margin-bottom: rem(6);
      @media (max-width: $tablet) {
        margin-bottom: rem(16);
      }
    }
  }
  // .project__buttons
  &__buttons {
    display: flex;
    gap: rem(15);
    flex-wrap: wrap;
  }
  // .project__button
  &__button {
    height: clamp(30px, 4.62vh, 50px);
    display: inline-flex;
    align-items: center;
    padding: rem(5) rem(23);
    gap: rem(15);
    background: #dbe2ff;
    backdrop-filter: blur(35px);
    border-radius: 30px;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(15, 17, 26, 0.25) -5.43%,
        rgba(22, 25, 36, 0.25) 87.71%
      );
    }
    img {
      border-radius: 50%;
      overflow: hidden;
      max-width: rem(20);
    }
    @media (max-width: em(1600)) {
      padding: rem(5) rem(13);
      gap: rem(10);
      img {
        max-width: rem(17);
      }
    }
    @media (max-width: $mobile) {
      height: 30px;
      font-size: rem(12);
      padding: rem(3) rem(16);
    }
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
    img {
      flex-shrink: 0;
    }
  }
  // .project__descr
  &__descr {
    margin: clamp(10px, 2.7vh, 30px) 0;
    font-size: clamp(12px, 2vh, 20px);
    line-height: 115%; /* 23/20 */
    overflow-y: hidden;
    text-overflow: ellipsis;
    max-height: rem(223);
    @media (max-width: em(1600)) {
      font-size: rem(16);
    }
    @media (max-width: $pc) {
      font-size: rem(12);
      margin: rem(20) 0 rem(25);
    }
    @media (max-width: $tablet) {
      max-height: auto;
    }
  }
  // .project__image
  &__image {
    position: relative;

    img {
      max-width: 100%;
    }
    &:not(:last-child) {
      margin-bottom: rem(24);
    }
    @media (max-width: $tablet) {
      display: none;
    }
  }
  // .project__next
  &__next {
    background: rgba(255, 255, 255, 0.1);
    background-blend-mode: soft-light;
    backdrop-filter: blur(5px);
    width: 75px;
    height: 75px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(20px, -50%);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    @media (max-width: $pc) {
      width: 40px;
      height: 40px;
      transform: translate(5px, -50%);
      img {
        max-width: rem(15);
      }
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  // .project__block-back
  &__block-back {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    flex: 1 1 auto;
    @media (max-width: $tablet) {
      display: none;
    }
    &::after {
      content: '';
      background: radial-gradient(
        103.45% 474.4% at 50% 50%,
        #212121 0%,
        #5081ff 100%
      );
      opacity: 0.1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  // .project__back-button
  &__back-button {
    background: #dbe2ff;
    backdrop-filter: blur(35px);
    border-radius: 30px;
    height: 41px;
    position: relative;
    z-index: 2;
    display: inline-flex;
    color: #212121;
    align-items: center;
    justify-content: center;
    padding: rem(4) rem(40);
    gap: rem(10);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
  }
}
.info-project {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: rem(10);
  justify-content: space-between;
  @media (max-width: $pc) {
    padding: 10px;
  }
  @media (max-width: $tablet) {
    padding: rem(10) 0;
    top: auto;
    min-width: 0;
    bottom: 0;
  }
  // .info-project__item
  &__item {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(40px);
    border-radius: 5px;
    font-size: 15px;
    line-height: 113.333333%; /* 17/15 */
    color: #e4e4e4;
    background-blend-mode: color;
    padding: rem(10) rem(35);
    b {
      font-weight: 700;
    }
    @media (max-width: $pc) {
      padding: rem(10) rem(15);
      font-size: rem(13);
    }
    @media (max-width: $tablet) {
      width: 100%;
      text-align: center;
      &:nth-child(2) {
        display: none;
      }
    }
    @media (max-width: $mobile) {
      padding: rem(6) rem(15);
    }
    @media (max-width: $mobileSmall) {
      font-size: 8px;
      line-height: 9px;
    }
  }
}
.project-main {
  // .project-main__slider
  &__slider {
    min-width: 0;
    width: 100%;
    flex: 1 1 auto;
    @media (max-width: $tablet) {
      flex: 0 0 auto;
      min-width: 0;
    }
    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }
  // .project-main__wrapper
  &__wrapper {
    width: 100%;
  }
  // .project-main__slide-ibg
  &__slide-ibg {
    height: 100%;
    @media (max-width: em(1600)) {
      padding-bottom: 34.31807%;
      height: auto !important;
    }
    @media (max-width: $tablet) {
      padding-bottom: 57.227139%; /* 194/339 */
    }
  }
}

.project-thumb {
  // .project-thumb__slider
  &__slider {
    min-width: 0;
    width: 100%;
    @media (max-width: $tablet) {
      padding: rem(0) rem(40) !important;
      max-width: rem(500);
      margin: 0 auto;
      max-height: 250px;
    }
  }
  // .project-thumb__wrapper
  &__wrapper {
    min-width: 0;
  }
  // .project-thumb__slide-ibg
  &__slide-ibg {
    height: rem(145) !important;
    @media (max-width: $pc) {
      height: rem(100) !important;
    }
    @media (max-width: $tablet) {
      height: auto !important;
      opacity: 0.25;
      padding-bottom: 45.17134%; /* 145/321 */
      &.swiper-slide-prev {
        opacity: 0.7;
      }
      &.swiper-slide-next {
        opacity: 0.7;
      }
      &.swiper-slide-active {
        opacity: 1;
      }
    }
  }
}
</style>
