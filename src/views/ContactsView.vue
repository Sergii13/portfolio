<template>
  <div class="contacts">
    <div class="contacts__row">
      <div class="contacts__item item-contacts">
        <a href="" class="item-contacts__link">
          <p class="item-contacts__open-text">OPEN</p>
          <span>
            <img
              v-if="currentTheme === 'dark-theme' || isMobile"
              src="@/assets/images/icons/contact01.svg"
              alt=""
            />
            <img
              v-if="currentTheme === 'light-theme' && !isMobile"
              src="@/assets/images/icons/contact-black.svg"
              alt=""
            />
          </span>
          <p class="item-contacts__mob-text">Send Request</p>
        </a>
      </div>
      <div class="contacts__item item-contacts freelancehunt">
        <a href="" class="item-contacts__link">
          <span> <img src="@/assets/images/icons/hunt.svg" alt="" /></span>
          <p class="item-contacts__mob-text">FreelanceHunt.com</p>
        </a>
      </div>
      <div class="contacts__item item-contacts fiverr">
        <a href="" class="item-contacts__link">
          <span>
            <img
              src="@/assets/images/icons/fiverr.svg
            "
              alt=""
          /></span>
          <p class="item-contacts__mob-text">Fiverr Profile</p>
        </a>
      </div>
      <div class="contacts__item item-contacts contact-white">
        <a href="" class="item-contacts__link">
          <span>
            <img
              v-if="currentTheme === 'dark-theme'"
              src="@/assets/images/icons/contact-white.svg"
              alt="" />
            <img
              v-if="currentTheme === 'light-theme'"
              src="@/assets/images/icons/contact-black2.svg"
              alt=""
          /></span>
          <p class="item-contacts__mob-text">Link on Telegram</p>
        </a>
      </div>
      <div @click="newtheme" class="contacts__item item-contacts contact-white">
        <a href="" class="item-contacts__link">
          <span>
            <img
              v-if="currentTheme === 'dark-theme'"
              src="@/assets/images/icons/contact-white.svg"
              alt=""
            />
            <img
              v-if="currentTheme === 'light-theme'"
              src="@/assets/images/icons/contact-black2.svg"
              alt=""
            />
          </span>
          <p class="item-contacts__mob-text">Other Contact</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useTheme} from '@/composables/useTheme.js'
import {onMounted, computed, ref, onUnmounted} from 'vue'

const {currentTheme} = useTheme()
const isMobile = ref(false)

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
</script>

<style lang="scss" scoped>
.contacts {
  height: 100%;
  width: 100%;
  padding-left: rem(100);
  padding-right: rem(50);
  @media (max-width: $pc) {
    padding-left: rem(70);
  }
  @media (max-width: $tablet) {
    padding: 30px;
  }
  // .contacts__row
  &__row {
    display: flex;
    justify-content: space-between;
    gap: rem(20);
    height: 100%;
    width: 100%;
    @media (max-width: $tablet) {
      flex-direction: column;
      justify-content: flex-start;
      padding: 32px;
    }
  }
  &__item {
  }
}

.item-contacts {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 166px;
  height: 100%;
  transform: skewX(-7deg);
  position: relative;
  @media (max-width: $pc) {
    width: 120px;
  }
  @media (max-width: $tablet) {
    width: 100%;
    transform: skewX(0deg);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) -5.43%,
      rgba(255, 255, 255, 0.5) 87.71%
    );
    background-blend-mode: soft-light;
    height: 64px;
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) -5.43%,
        rgba(255, 255, 255, 0.03) 87.71%
      );
    }
  }
  &:nth-child(1) {
    @media (max-width: $tablet) {
      border-radius: 10px 0px 0px 0px;

      .item-contacts__link span {
        border-radius: 10px 0px 0px 0px;
      }
    }
    .item-contacts__link::after {
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 38% 100%);
      width: calc(100% + 120px);
      left: auto;
      background: #5081ff;
      right: 0;
      .dark-theme & {
        background: #005bbb;
      }
      @media (max-width: $tablet) {
        display: none;
      }
    }
  }
  &.fiverr {
    .item-contacts__link {
      &::after {
        background: #12ab3e;
      }
    }
  }
  &.freelancehunt {
    .item-contacts__link {
      &::after {
        background: #eab133;
      }
    }
  }
  &::after {
    content: '';
    background: radial-gradient(
      circle,
      rgba(176, 176, 176, 0.8) 5%,
      rgba(38, 38, 38, 0) 79%
    );
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    opacity: 0.4;
    .dark-theme & {
      background: radial-gradient(
        circle,
        rgba(0, 91, 187, 0.7) 5%,
        rgba(38, 38, 38, 0) 69%
      );
    }
    @media (max-width: $tablet) {
      display: none;
    }
  }
  &::before {
    background: #5081ff;
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(80px);
    left: -4px;
    width: 100%;
    z-index: -2;
    height: 80px;
    opacity: 0.5;
    .dark-theme & {
      opacity: 1;
      background: #212121;
    }
    @media (max-width: $pc) {
      transform: translateY(50px);
    }
    @media (max-width: $tablet) {
      display: none;
    }
  }
  &__open-text {
    font-family: 'Krona One', sans-serif;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
    text-transform: uppercase;
    position: absolute;
    right: calc(100% - 5px);
    height: 100%;
    top: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding: 15px rem(30);
    text-align: right;
    transform: skewX(7deg);
    display: flex;
    letter-spacing: 5px;
    align-items: flex-start;
    @media (max-width: $pc) {
      font-size: rem(10);
      padding: 15px rem(20);
    }
    @media (max-width: $tablet) {
      display: none;
    }
  }
  &__mob-text {
    font-size: 12px;
    line-height: 14px;
    @media (min-width: $tablet) {
      display: none;
    }
  }
  &__link {
    height: 159px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 2;
    position: relative;
    @media (max-width: $pc) {
      height: 120px;
    }
    @media (max-width: $tablet) {
      width: 100%;
      display: flex;
      gap: rem(24);
      justify-content: flex-start;
    }

    &:hover {
      img {
        transform: skewX(7deg) translate(0, -10px);
      }
    }

    span {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #dbe2ff;
      .dark-theme & {
        background: #131313;
      }
      @media (max-width: $tablet) {
        background: #212121;
        width: 64px;
        height: 64px;
      }
    }
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      filter: blur(2px);
      top: 0;
      z-index: -2;
      left: -10px;
      background: #005bbb;
      position: absolute;
      @media (max-width: $tablet) {
        display: none;
      }
    }

    img {
      transform: skewX(7deg);
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      @media (max-width: $pc) {
        max-width: rem(60);
      }
      @media (max-width: $tablet) {
        transform: skewX(0deg);
        max-width: rem(24);
      }
    }
  }
}
</style>
