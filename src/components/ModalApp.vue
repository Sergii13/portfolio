<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="isOpen"
        id="popup"
        aria-hidden="true"
        class="popup popup_show"
        :class="['popup_' + props.otherClass]"
      >
        <div
          v-if="props.image"
          @click.self="handleClose"
          class="popup__overlay"
          :style="{
            'background-image': props.image,
          }"
        ></div>
        <div @click.self="handleClose" class="popup__wrapper">
          <div class="popup__content">
            <div class="popup__head">
              <slot name="popup-head" />
              <button
                @click.prevent="handleClose"
                data-close
                type="button"
                class="popup__close"
              >
                <img
                  v-if="props.otherClass || currentTheme === 'dark-theme'"
                  src="@/assets/images/icons/close2.svg"
                  alt=""
                />
                <img v-else src="@/assets/images/icons/close.svg" alt="" />
              </button>
            </div>
            <div class="popup__main popup-main">
              <slot name="popup-body" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {useModal} from '@/stores/modal'
import {storeToRefs} from 'pinia'
import {useTheme} from '@/composables/useTheme.js'

const {currentTheme} = useTheme()

const props = defineProps({
  otherClass: {
    type: String,
    default: '',
    required: false,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
})
const store = useModal()
const {isOpen} = storeToRefs(store)
const handleClose = () => {
  store.closeModal()
}
</script>

<style lang="scss">
.popup-enter-from .popup__content,
.popup-leave-to .popup__content {
  visibility: hidden;
  transform: scale(0);
}
.popup-enter-to .popup__content,
.popup-leave-from .popup__content {
  visibility: visible;
  transform: scale(1);
}
.popup-leave-active .popup__content,
.popup-enter-active .popup__content {
  transition: transform 0.6s ease 0s;
}
body::after {
  content: '';
  background: rgba(20, 20, 20, 0.01);
  mix-blend-mode: normal;
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.8s ease 0s;
  pointer-events: none;
  z-index: 149;
}
.popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: soft-light;
  filter: blur(50px);
  border-radius: 30px;
  z-index: 150;
  opacity: 0;
  transition: opacity 0.8s ease 0s;
  pointer-events: none;
}
.popup-show body::after {
  opacity: 1;
}
.popup-show {
  .popup__overlay {
    opacity: 0.5;
  }
}
.portfolio .popup__head {
  background: rgba(0, 0, 0, 0.5);
  background-blend-mode: color-burn;
}
.portfolio body.dark-theme {
  .popup__head {
    background: rgba(0, 0, 0, 0.5);
  }
}
.portfolio.popup-show body {
  &::after {
    opacity: 1;
    background: linear-gradient(
      242.91deg,
      rgba(52, 57, 60, 0.9) -21.16%,
      rgba(38, 19, 15, 0.9) 99.17%
    );

    mix-blend-mode: normal;
    backdrop-filter: blur(15px);
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  transition: visibility 0.8s ease 0s;
  visibility: hidden;
  pointer-events: none;
}
.popup_show {
  z-index: 150;
  visibility: visible;
  overflow: auto;
  pointer-events: auto;
}

.popup__wrapper {
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__content {
  width: 100%;
  max-width: 1447px;
  display: flex;
  flex-direction: column;
  gap: rem(35);
  @media (max-width: $tablet) {
    gap: rem(20);
  }
  @media (max-width: $mobile) {
    gap: rem(0);
  }
  .lock & {
    visibility: visible;
  }
}
.popup {
  &_portfolio {
    .popup-main {
      padding: 0;
      @media (max-width: $mobile) {
        padding: rem(20);
      }
    }
    .popup__content {
      @media (max-width: $mobile) {
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0) 106.24%
        );
        backdrop-filter: blur(12.5px);
        border-radius: 20px;
      }
    }
    .popup__head {
      @media (max-width: $mobile) {
        margin-bottom: rem(20);
      }
    }
  }
  // .popup_show
  &_show {
  }
  // .popup__wrapper
  &__wrapper {
  }
  // .popup__content
  &__content {
  }
  &__head-row {
    display: flex;
    align-items: center;

    justify-content: space-between;
    gap: rem(20);
  }
  // .popup__head
  &__head {
    border-radius: 30px;
    background: rgba(219, 226, 255, 0.3);
    padding: rem(20) rem(60);
    backdrop-filter: blur(25px);
    position: relative;
    @media (max-width: $tablet) {
      padding: rem(15) rem(40);
    }
    @media (max-width: $mobile) {
      background: rgba(255, 255, 255, 0.5);
      background-blend-mode: soft-light;
      backdrop-filter: blur(35px);
      border-radius: 30px;
      padding: rem(9) rem(10) rem(7);
      margin-bottom: rem(-30);
      z-index: 2;
    }
    .dark-theme & {
      background: rgba(217, 217, 217, 0.1);
    }
  }
  // .popup__left
  &__left {
    @media (max-width: $mobile) {
      justify-content: center;
      flex: 1 1 auto;
    }
  }
  // .popup__title
  &__title {
    font-weight: 700;
    line-height: 17px;
    @media (max-width: $mobile) {
      text-align: center;
      font-size: 12px;
      line-height: 14px;
      font-weight: 400;
    }
  }
  // .popup__right
  &__right {
  }
  // .popup__socials
  &__socials {
  }
  // .popup__link
  &__link {
  }
  // .popup__close
  &__close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 60px;
    @media (max-width: $tablet) {
      right: 20px;
    }
  }
  // .popup__main
  &__main {
  }
  // .popup__form
  &__form {
  }
  &__breadcrumbs {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      font-size: 15px;
      line-height: 17px;
      color: #e4e4e4;
      &:not(:last-child) {
        position: relative;
        &::after {
          content: '/';
          font-size: 15px;
          line-height: 17px;
          position: relative;
          display: inline-block;
          margin: 0 rem(10);
        }
      }
      a {
        font-weight: 700;
        transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  &__links {
    display: inline-flex;
    align-items: center;
    gap: rem(50);
    padding-right: rem(67);
    font-weight: 500;
    font-size: 15px;
    line-height: 113.333333%; /* 17/15 */
    letter-spacing: 0.03em;
    @media (max-width: $tablet) {
      display: none;
    }
  }
  &__links-mob {
    margin-top: rem(46);
    display: flex;
    flex-direction: column-reverse;
    gap: rem(20);
    align-items: center;
    padding-bottom: 20px;
    @media (min-width: $tablet) {
      display: none;
    }
  }
  &__descr {
    margin-top: rem(40);
    font-size: 16px;
    line-height: 20px;
    padding: 0 20px;
    @media (max-width: $mobile) {
      font-size: 12px;
      line-height: 14px;
    }
    @media (min-width: $tablet) {
      display: none;
    }
  }
  &__create-site {
    display: inline-flex;
    background: rgba(217, 217, 217, 0.3);
    backdrop-filter: blur(40px);
    padding: rem(10) rem(23) rem(8) rem(12);
    gap: rem(13);
    color: #e4e4e4;
    border-radius: 40px;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    @media (max-width: $tablet) {
      background: transparent;
      backdrop-filter: blur(0px);
    }
    &:hover {
      background: rgba(217, 217, 217, 0.3);
      @media (max-width: $tablet) {
        background: transparent;
        text-decoration: underline;
      }
    }
  }
  &__open-site {
    display: inline-flex;
    align-items: center;
    gap: rem(15);
    letter-spacing: 0.03em;
    color: #6db4ff;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    @media (max-width: $tablet) {
      padding: 7px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  &__image-ibg {
    border-radius: 30px;
    overflow: hidden;
    padding-bottom: 56.66897%; /* 820/1447 */
    @media (max-width: em(1600)) {
      padding-bottom: 40%;
    }
    @media (max-width: $tablet) {
      padding-bottom: 57.227139%; /* 194/339 */
    }
    img {
      max-width: 100%;
    }
  }
}
.socials-popup {
  display: flex;
  align-items: center;
  gap: rem(50);
  padding-right: rem(120);
  @media (max-width: $tablet) {
    padding-right: rem(40);
    gap: rem(20);
  }
  @media (max-width: $mobile) {
    display: none;
  }
  // .socials-popup__title
  &__title {
    line-height: 17px;
  }
  // .socials-popup__items
  &__items {
    display: flex;
    align-items: center;
    gap: rem(20);
    a {
      width: 32px;
      height: 32px;
      background: #f1f6fe;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      .dark-theme & {
        background: #333e58;
      }
      &:hover {
        box-shadow: 0 0 15px var(--main-color);
      }
    }
  }
}
.popup-main {
  background: rgba(219, 226, 255, 0.3);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 30px;
  padding: rem(48) rem(62) rem(32);
  .dark-theme & {
    background: rgba(217, 217, 217, 0.1);
  }
  @media (max-width: $pc) {
    padding: rem(30);
  }
  @media (max-width: $mobile) {
    padding: rem(50) rem(18);
  }
  // .popup-main__row
  &__row {
    display: flex;
    gap: rem(20);
    @media (max-width: $mobile) {
      flex-direction: column-reverse;
      gap: rem(0);
    }
  }
  // .popup-main__contacts
  &__contacts {
    flex: 1 1 auto;
    font-size: rem(20);
    line-height: 115%; /* 23/20 */
    color: rgba(33, 33, 33, 0.75);
    .dark-theme & {
      color: rgba(228, 228, 228, 0.75);
    }
    @media (max-width: $tablet) {
      font-size: rem(16);
    }
    @media (max-width: $mobile) {
      text-align: center;
      padding-top: rem(28);
      font-size: rem(12);
      line-height: 116.666667%; /* 14/12 */
    }
    h4 {
      font-weight: 700;
      &:not(:last-child) {
        margin-bottom: rem(40);
        @media (max-width: $mobile) {
          margin-bottom: rem(25);
        }
      }
    }
    ul li {
      a {
        transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
        &:hover {
          color: #5081ff;
        }
      }
      &:not(:last-child) {
        margin-bottom: rem(20);
        @media (max-width: $mobile) {
          margin-bottom: rem(15);
        }
      }
    }
  }
  // .popup-main__bottom
  &__bottom {
    padding-top: rem(41);
    display: flex;
    color: rgba(33, 33, 33, 0.75);
    line-height: 115%; /* 23/20 */
    font-size: rem(20);
    gap: rem(20);
    justify-content: space-between;
    .dark-theme & {
      color: rgba(228, 228, 228, 0.75);
    }
    @media (max-width: $pc) {
      font-size: rem(16);
    }
    @media (max-width: $mobile) {
      display: none;
    }
  }
  // .popup-main__bottom-title
  &__bottom-title {
    font-weight: 700;
    flex-shrink: 0;
  }
  // .popup-main__bottom-items
  &__bottom-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: rem(10) rem(0);
  }
  // .popup-main__bottom-item
  &__bottom-item {
    position: relative;
    a {
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      &:hover {
        color: #5081ff;
      }
    }
    &:not(:last-child) {
      &::after {
        content: '/';
        margin: rem(0) rem(20) 0 rem(10);
        font-weight: 700;
        color: #5081ff;
        @media (max-width: $pc) {
          margin: 0 rem(10);
        }
      }
    }
  }
}
.form {
  background: rgba(219, 226, 255, 0.6);
  border-radius: 30px;
  width: 63.794407%; /* 844/1323 */
  padding: rem(42) rem(48);
  .dark-theme & {
    background: rgba(217, 217, 217, 0.1);
  }
  @media (max-width: $tablet) {
    padding: rem(20);
  }
  @media (max-width: $mobile) {
    width: 100%;
    background: transparent;
    padding: 0;
  }
  // .form__item
  &__item {
    &:not(:last-child) {
      margin-bottom: rem(40);
      @media (max-width: $pc) {
        margin-bottom: rem(20);
      }
    }
  }
  // .form__input
  &__input {
  }
  // .form__button
  &__button {
    height: 69px;
    width: 172px;
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
    background: #5081ff;
    line-height: 17px;
    color: #e4e4e4;
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    @media (max-width: $mobile) {
      margin: 0 auto;
      height: 30px;
      font-size: rem(12);
      display: flex;
    }
    &:hover {
      background: #4277fc;
    }
  }
}
</style>
