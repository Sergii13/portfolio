<template>
  <SpinnerApp v-if="props.isLoading" />
  <div v-if="props.data" class="feedback">
    <button class="feedback__button-more">
      view more
      <img src="@/assets/images/icons/view.svg" alt="" />
    </button>
    <div
      class="feedback__slider-wrap"
      :class="{'portfolio-block': isPortfolio}"
    >
      <NavSlider
        v-if="isPortfolio"
        :currentType="currentType"
        :data="typesArray"
        @changeFilter="handleChangeFilter"
      />
      <swiper
        :modules="[Navigation, EffectCoverflow, Virtual, FreeMode]"
        :slides-per-view="'auto'"
        :navigation="{
          nextEl: '.feedback__button-more',
        }"
        :grab-cursor="true"
        :watch-slides-progress="true"
        :direction="'vertical'"
        :loop="true"
        :space-between="70"
        :speed="1500"
        effect="coverflow"
        :centered-slides="false"
        :coverflowEffect="{
          rotate: -2,
          stretch: 0,
          depth: 40,
          modifier: 1,
          slideShadows: false,
        }"
        :breakpoints="breakpointsSwiper"
        @swiper="onSwiper"
        @reach-end="reachendSwiper"
        class="feedback__slider"
      >
        <template v-if="isMobile">
          <swiper-slide
            v-for="item of filteredData"
            :key="item.id"
            class="feedback__slide"
          >
            <slot :data="item" name="card"></slot>
          </swiper-slide>
        </template>
        <template v-if="!isMobile">
          <swiper-slide
            v-for="slide of slideArray"
            :key="randomKey"
            class="feedback__slide"
          >
            <div class="feedback__row">
              <slot
                v-for="data in slide"
                :key="data.id"
                :data="data"
                name="card"
              />
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import {EffectCoverflow, FreeMode, Navigation, Virtual} from 'swiper'
import {Swiper, SwiperSlide, useSwiper} from 'swiper/vue'
import {
  onMounted,
  onUnmounted,
  ref,
  computed,
  onUpdated,
  onBeforeUpdate,
} from 'vue'
import SpinnerApp from '@/components/SpinnerApp.vue'
import {chunk} from '@/helpers/methods.js'
import NavSlider from '@/components/layout/NavSlider.vue'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/virtual'

const limit = 3
const breakpointsSwiper = {
  320: {spaceBetween: 32, allowTouchMove: true},

  992: {
    spaceBetween: 40,
    touchRatio: 0,
    simulateTouch: false,
    allowTouchMove: false,
  },
  1600: {
    spaceBetween: 70,
  },
}

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  isPortfolio: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isMobile = ref(false)

const typesArray = computed(() => {
  if (props.isPortfolio) {
    const uniqueArray = new Set()
    uniqueArray.add('all')
    props.data.forEach((item) => uniqueArray.add(item.type))
    return Array.from(uniqueArray)
  } else {
    return null
  }
})

const currentType = ref('all')

const filteredData = computed(() => {
  if (props.isPortfolio) {
    return props.data.filter((item) => {
      return currentType.value === 'all'
        ? item
        : item.type === currentType.value
    })
  } else {
    return props.data
  }
})

const slideArray = computed(() => {
  return chunk(filteredData.value, limit)
})

const swiperMain = ref(null)

const onSwiper = (swiper) => {
  swiperMain.value = swiper
}
const reachendSwiper = () => {
  // swiperMain.value.snapGrid = [swiperMain.value.slidesGrid - 2]
}
const handleChangeFilter = (newType) => {
  currentType.value = newType
}

onBeforeUpdate(() => {
  if (swiperMain.value) {
    swiperMain.value.params.loop = false
  }
})

onUpdated(() => {
  if (swiperMain.value) {
    swiperMain.value.params.loop = true
  }
})
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (window.innerWidth < 991) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
function randomKey() {
  return new Date().getTime() + Math.floor(Math.random() * 10000).toString()
}
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
      height: calc(100vh - 243px);
      overflow: visible;
      width: 100%;

      @media (max-width: em(1600)) {
        height: calc(100vh - 185px);
      }
      @media (max-width: $tablet) {
        height: calc(100vh - 80px);
      }
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
</style>
