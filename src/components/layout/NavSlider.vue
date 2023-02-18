<template>
  <div class="feedback__nav nav-feedback">
    <div class="nav-feedback__arrows">
      <button class="nav-feedback__arrow prev">
        <img src="@/assets/images/icons/arrow-slide.svg" alt="" />
      </button>
      <button class="nav-feedback__arrow next">
        <img src="@/assets/images/icons/arrow-slide.svg" alt="" />
      </button>
    </div>
    <swiper
      :modules="[Navigation, FreeMode]"
      :observer="true"
      :observeParents="true"
      :slidesPerView="'auto'"
      :spaceBetween="70"
      :speed="800"
      :loop="true"
      :breakpoints="breakpointsSwiper"
      :navigation="{
        prevEl: '.nav-feedback__arrow.prev',
        nextEl: '.nav-feedback__arrow.next',
      }"
      class="nav-feedback__slider swiper"
    >
      <swiper-slide
        :key="item.id"
        v-for="item of normalizeData"
        class="nav-feedback__slide swiper-slide"
      >
        <a
          href=""
          @click.prevent="handleClick(item)"
          class="nav-feedback__link"
          :class="{active: normalizeCurrent === item}"
        >
          {{ item }}
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import {FreeMode, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {uppercaseFirstSymbol, lowercaseFirstSymbol} from '@/helpers/methods'
import {computed} from 'vue'

const breakpointsSwiper = {
  992: {
    spaceBetween: 20,
  },
  1600: {
    spaceBetween: 70,
  },
}
const emit = defineEmits(['changeFilter'])

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  currentType: {
    type: String,
    required: true,
  },
})
const normalizeCurrent = computed(() => {
  return uppercaseFirstSymbol(props.currentType)
})

const normalizeData = computed(() => {
  return props.data.map((item) => {
    return uppercaseFirstSymbol(item)
  })
})

const handleClick = (item) => {
  emit('changeFilter', lowercaseFirstSymbol(item))
}
</script>

<style lang="scss" scoped>
.nav-feedback {
  max-width: rem(1146);
  margin: 0 auto;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: clamp(10px, 5.5vh, 60px);
    @media (max-width: em(1600)) {
      margin-bottom: rem(20);
    }
  }

  @media (max-width: em(1450)) {
    padding: 0 rem(40);
    max-width: 100%;
  }
  @media (max-width: $tablet) {
    display: none;
  }
  // .nav-feedback__arrows
  &__arrows {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 50%;
    width: calc(100% + 100px);
    pointer-events: none;
    transform: translate(-50%, 50%);
    @media (max-width: em(1450)) {
      width: 100%;
    }
  }
  // .nav-feedback__arrow
  &__arrow {
    pointer-events: all;
    background: #d7e5fc;
    backdrop-filter: blur(5px);
    width: 25px;
    height: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
    &.next img {
      transform: rotate(180deg);
    }
  }
  // .nav-feedback__slider
  &__slider {
  }
  // .nav-feedback__wrapper
  &__wrapper {
  }
  // .nav-feedback__slide
  &__slide {
    width: auto !important;
  }
  // .nav-feedback__link
  &__link {
    font-weight: 500;
    font-size: rem(20);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    line-height: 115%; /* 23/20 */
    padding: rem(0) rem(35) rem(24);
    position: relative;
    display: inline-block;
    @media (max-width: em(1600)) {
      font-size: rem(16);
    }
    &:hover {
      color: #5081ff;
    }
    &.active {
      &::after {
        background: #5081ff;
      }
    }
    &::after {
      content: '';
      bottom: 0;
      height: 5px;
      width: 100%;
      position: absolute;
      left: 0;
      background: #d7e5fc;
      mix-blend-mode: overlay;
    }
  }
}
</style>
