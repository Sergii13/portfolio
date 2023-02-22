<template>
  <header class="header">
    <div class="header__row">
      <router-link :to="{name: 'main'}" class="header__logo">
        <img
          v-if="currentTheme === 'light-theme'"
          src="@/assets/images/icons/logo-white.svg"
          alt=""
        />
        <img
          v-if="currentTheme === 'dark-theme'"
          src="@/assets/images/icons/logo.svg"
          alt=""
        />
      </router-link>
      <div class="header__current-page">
        {{ currentPage }}
      </div>
      <div class="header__actions header-actions">
        <span class="header-actions__switch">
          <input
            type="checkbox"
            @input="toggleTheme"
            :checked="currentTheme === 'lightTheme'"
            class="checkbox"
            id="checkbox"
          />
          <label for="checkbox" class="label">
            <i class="fas fa-moon"></i>
            <i class="fa fa-sun"></i>
            <div class="ball"></div>
          </label>
        </span>
        <CustomSelect
          :options="[
            {label: 'ua', icon: UkraineIcon},
            {label: 'rus', icon: UkraineIcon},
            {label: 'en', icon: EnglishIcon},
          ]"
          :defaultValue="0"
          class="select"
        />
        <button
          @click="toggleMobileMenu"
          type="button"
          :class="{'open-menu': openMenu}"
          class="menu__icon icon-menu"
        >
          <span></span>
        </button>
        <a href="" class="header-actions__button">
          login
          <img
            v-if="currentTheme === 'light-theme'"
            src="@/assets/images/icons/logout.svg"
            alt=""
          />
          <img
            v-if="currentTheme === 'dark-theme'"
            src="@/assets/images/icons/logout-dark.svg"
            alt=""
          />
        </a>
      </div>
    </div>
    <Transition>
      <div class="header__menu menu" v-if="openMenu">
        <nav class="menu__body">
          <ul class="menu__list">
            <li class="menu__item">
              <router-link
                @click="openMenu = false"
                :to="{name: 'main'}"
                class="menu__link"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5065 9.86329L10.4528 1.82423C10.3948 1.76619 10.3259 1.72015 10.2501 1.68873C10.1743 1.65732 10.093 1.64114 10.0109 1.64114C9.92881 1.64114 9.84752 1.65732 9.7717 1.68873C9.69587 1.72015 9.627 1.76619 9.56901 1.82423L1.51529 9.86329C1.28066 10.0977 1.14771 10.416 1.14771 10.7481C1.14771 11.4375 1.70886 11.9981 2.39907 11.9981H3.24765V17.7344C3.24765 18.0801 3.52726 18.3594 3.87334 18.3594H8.75953V13.9844H10.9494V18.3594H16.1485C16.4945 18.3594 16.7741 18.0801 16.7741 17.7344V11.9981H17.6227C17.9551 11.9981 18.2738 11.8672 18.5085 11.6309C18.9953 11.1426 18.9953 10.3516 18.5065 9.86329Z"
                    fill="#212121"
                  />
                </svg>

                Main</router-link
              >
            </li>
            <li class="menu__item">
              <router-link
                @click="openMenu = false"
                :to="{name: 'portfolio'}"
                class="menu__link"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.56216 3.05998C9.57326 3.39998 6.61002 5.06998 8.46205 6.18998C9.50318 6.81998 11.7757 3.96998 12.9169 3.32998C13.888 2.78998 15.5898 2.67998 16.4508 4.55998C17.542 6.93998 16.5909 13.13 12.6566 15.62C8.68229 18.12 3.67682 16.85 1.94493 12.96C-0.0672653 8.42998 5.06834 1.86998 8.56216 3.05998ZM9.77348 9.50998C10.5043 11.15 14.4786 9.00998 13.5676 6.70998C12.977 5.21998 9.08272 7.95998 9.77348 9.50998Z"
                    fill="#212121"
                  />
                </svg>

                Portfolio</router-link
              >
            </li>
            <li class="menu__item">
              <router-link
                @click="openMenu = false"
                :to="{name: 'feedback'}"
                class="menu__link"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.17117 17.5C3.71234 17.5 3.31941 17.3369 2.99239 17.0108C2.66592 16.6841 2.50269 16.2916 2.50269 15.8333C2.50269 15.375 2.66592 14.9825 2.99239 14.6558C3.31941 14.3297 3.71234 14.1666 4.17117 14.1666C4.63001 14.1666 5.02266 14.3297 5.34913 14.6558C5.67615 14.9825 5.83966 15.375 5.83966 15.8333C5.83966 16.2916 5.67615 16.6841 5.34913 17.0108C5.02266 17.3369 4.63001 17.5 4.17117 17.5ZM14.1821 17.5C14.1821 15.8889 13.8762 14.3783 13.2644 12.9683C12.6527 11.5589 11.8151 10.3228 10.7517 9.25998C9.68775 8.19776 8.45029 7.36109 7.03931 6.74998C5.62776 6.13887 4.11556 5.83331 2.50269 5.83331V3.33331C4.46316 3.33331 6.30545 3.70498 8.02955 4.44831C9.75366 5.19109 11.2553 6.20137 12.5345 7.47915C13.8136 8.75692 14.8253 10.2569 15.5695 11.9791C16.313 13.7014 16.6848 15.5416 16.6848 17.5H14.1821ZM9.17664 17.5C9.17664 15.6528 8.52648 14.08 7.22618 12.7816C5.92642 11.4828 4.35193 10.8333 2.50269 10.8333V8.33331C3.78186 8.33331 4.97761 8.57304 6.08994 9.05248C7.20226 9.53137 8.17221 10.1839 8.99978 11.01C9.82679 11.8366 10.48 12.8055 10.9594 13.9166C11.4394 15.0278 11.6794 16.2222 11.6794 17.5H9.17664Z"
                    fill="#212121"
                  />
                </svg>

                Feedback</router-link
              >
            </li>
            <li class="menu__item">
              <router-link
                @click="openMenu = false"
                :to="{name: 'contacts'}"
                class="menu__link"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6443 17.5C16.7833 17.5 16.9293 17.4967 17.0823 17.49C17.2352 17.4828 17.3812 17.4722 17.5203 17.4583V12.5833L13.349 11.75L10.9297 14.1667C9.87303 13.5278 8.90308 12.7708 8.01989 11.8958C7.13726 11.0208 6.40396 10.0833 5.81999 9.08333L8.19759 6.6875L7.42591 2.5H2.54558C2.51777 2.63889 2.50387 2.78472 2.50387 2.9375V3.375C2.50387 5.16667 2.90375 6.91306 3.70351 8.61417C4.50272 10.3158 5.55943 11.8264 6.87364 13.1458C8.1873 14.4653 9.69561 15.5208 11.3986 16.3125C13.1021 17.1042 14.8507 17.5 16.6443 17.5Z"
                    fill="#212121"
                  />
                </svg>

                Contacts</router-link
              >
            </li>
            <li class="menu__item">
              <a href="" class="menu__link">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.31778 8.88889L4.5 6.07111L6.07111 4.5L11.5711 10L6.07111 15.5L4.5 13.9289L7.31778 11.1111H0V8.88889H7.31778ZM8.88889 0H17.7778C19 0 20 1 20 2.22222V17.7778C20 19 19 20 17.7778 20H8.88889V17.7778H17.7778V2.22222H8.88889V0Z"
                    fill="#212121"
                  />
                </svg>

                Login</a
              >
            </li>
            <li class="menu__item">
              <div class="menu__languages">
                <a href="">
                  ua <img src="@/assets/images/icons/ukraine.png" alt="" />
                </a>
                <a href="">
                  rus<img src="@/assets/images/icons/ukraine.png" alt="" />
                </a>
                <a href=""
                  >eng <img src="@/assets/images/icons/english.png" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import {onMounted, computed, ref} from 'vue'
import {useTheme} from '@/composables/useTheme.js'
import {useRoute} from 'vue-router'
import {uppercaseFirstSymbol} from '@/helpers/methods.js'
import CustomSelect from '@/components/CustomSelect.vue'
import UkraineIcon from '@/assets/images/icons/ukraine.png'
import EnglishIcon from '@/assets/images/icons/english.png'

const route = useRoute()
const {toggleTheme, currentTheme} = useTheme()

const openMenu = ref(false)

const currentPage = computed(() => {
  if (route.name) {
    return uppercaseFirstSymbol(route.name)
  }
  return ''
})

const toggleMobileMenu = () => {
  if (openMenu.value) {
    document.documentElement.classList.remove('lock')
  } else {
    document.documentElement.classList.add('lock')
  }
  return (openMenu.value = !openMenu.value)
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
}

.v-enter-from {
  left: -100%;
}
.v-enter-to {
  left: 0;
}
.v-enter-active {
  animation: blur-in 0.5s ease-in-out forwards;
}
.v-leave-from {
  left: 0;
}
.v-leave-to {
  left: -100%;
}
.v-leave-active {
  animation: blur-out 0.5s ease-in-out forwards;
}
.custom-select {
  @media (max-width: $tablet) {
    display: none;
  }
}
//====================================================================================================
.dark-theme {
  .header {
    --border-header: #373b3f;
  }
}
.header {
  --border-header: #858894;
  // .header__row
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--border-header);
    border-bottom: 1px solid var(--border-header);
    border-right: 1px solid var(--border-header);
    @media (max-width: $tablet) {
      padding: rem(10) 0 rem(10) rem(15);
      position: relative;
      border: none;
      z-index: 6;
      &::after,
      &::before {
        content: '';
        height: 1px;
        width: 100vw;
        left: 0;
        position: absolute;
        bottom: 0;
        background: var(--border-header);
      }
      &::after {
        top: 0;
        bottom: auto;
      }
      z-index: 5;
    }
  }

  // .header__logo
  &__logo {
    img {
      max-width: 100%;
    }
    @media (max-width: $mobile) {
      max-width: rem(125);
    }
  }

  // .header__current-page
  &__current-page {
    font-size: 15px;
    line-height: 17px;
    position: relative;
    @media (max-width: $tablet) {
      display: none;
    }
    &::after,
    &::before {
      content: '';
      position: absolute;
      background: var(--border-header);
      height: 1px;
      width: 58px;
      top: 50%;
      right: calc(100% + 40px);
      transform: translateY(-50%);
    }
    &::after {
      right: auto;
      left: calc(100% + 40px);
    }
  }

  // .header__actions
  &__actions {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.header-actions {
  @media (max-width: $tablet) {
    gap: rem(20);
    padding-right: rem(20);
  }
  &__switch {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid var(--border-header);
    height: 73px;
    @media (max-width: em(1600)) {
      height: rem(55);
    }
    @media (max-width: $pc) {
      width: 90px;
    }
    @media (max-width: $tablet) {
      height: auto;
      border: none;
      width: auto;
    }
  }
  // .header-actions__button
  &__button {
    padding: 10px;
    width: 129px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 13px;
    font-size: 15px;
    line-height: 17px;
    @media (max-width: $pc) {
      width: 90px;
    }
    @media (max-width: $tablet) {
      display: none;
    }
    @media (any-hover: hover) {
      &:hover {
        img {
          transform: translateX(5px);
        }
      }
    }
    img {
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }
  }
}
.checkbox {
  opacity: 0;
  position: absolute;
}

.label {
  cursor: pointer;
  width: 50px;
  height: 25px;
  background-color: var(--border-header);
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  @media (max-width: $tablet) {
    height: 20px;
    width: 40px;
  }
}

.ball {
  width: 20px;
  height: 20px;
  background-color: white;
  position: absolute;
  top: 2.5px;
  left: 4px;
  border-radius: 50%;
  transition: transform 0.2s linear;
  @media (max-width: $tablet) {
    width: 15px;
    height: 15px;
  }
}

/*  target the elemenent after the label*/
.checkbox:checked + .label .ball {
  transform: translateX(22px);
  @media (max-width: $tablet) {
    transform: translateX(17px);
  }
}

.fa-moon {
  color: yellow;
  font-size: 14px;
  @media (max-width: $tablet) {
    font-size: rem(10);
  }
}

.fa-sun {
  color: yellow;
  font-size: 14px;
  @media (max-width: $tablet) {
    font-size: rem(10);
  }
}

.menu {
  @media (min-width: $tablet) {
    display: none;
  }
  @media (max-width: $tablet) {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    background: rgba(217, 217, 217, 0.25);
    backdrop-filter: blur(10px);
    padding: rem(82) rem(30) 0;
  }
  // .menu__body
  &__body {
  }
  // .menu__list
  &__list {
    display: grid;
    gap: 8px;
  }
  // .menu__item
  &__item {
    background: rgba(228, 228, 228, 0.5);
    background-blend-mode: soft-light;
    backdrop-filter: blur(12.5px);
    min-height: rem(60);
    display: flex;
    align-items: center;
    .dark-theme & {
      background: rgba(228, 228, 228, 0.03);
    }
  }
  // .menu__link
  &__link {
    display: inline-flex;
    align-items: center;
    gap: rem(20);
    padding: rem(10) rem(32);
    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      fill: var(--main-color);
    }
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: var(--main-color);
  }
  // .menu__languages
  &__languages {
    padding: rem(0) rem(32);
    display: flex;
    gap: rem(50);
    @media (max-width: $mobileSmall) {
      gap: rem(10);
      justify-content: space-between;
      width: 100%;
    }
    a {
      display: inline-flex;
      align-items: center;
      gap: rem(15);
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}

//====================================================================================================
@keyframes blur-in {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(50px);
  }
}
@keyframes blur-out {
  from {
    backdrop-filter: blur(50px);
  }
  to {
    backdrop-filter: blur(0px);
  }
}
//Burger

.icon-menu {
  display: none;
  @media (max-width: $tablet) {
    &.open-menu {
      span {
        width: 0;
      }
      &::before,
      &::after {
      }
      &::before {
        top: calc(50% - rem(1));
        transform: rotate(-45deg);
      }
      &::after {
        bottom: calc(50% - rem(1));
        transform: rotate(45deg);
      }
    }
    display: block;
    position: relative;
    width: rem(20);
    height: rem(17);
    z-index: 5;
    @media (any-hover: none) {
      cursor: default;
    }
    span,
    &::before,
    &::after {
      content: '';
      transition: all 0.3s ease 0s;
      right: 0;
      position: absolute;
      width: 100%;
      height: rem(3);
      background-color: var(--border-header);
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    span {
      top: calc(50% - rem(1.5));
    }
  }
}
</style>
