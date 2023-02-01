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
  </header>
</template>

<script setup>
import {onMounted, computed} from 'vue'
import {useTheme} from '@/composables/useTheme.js'
import {useRoute} from 'vue-router'
import {uppercaseFirstSymbol} from '@/helpers/methods.js'
import CustomSelect from '@/components/CustomSelect.vue'
import UkraineIcon from '@/assets/images/icons/ukraine.png'
import EnglishIcon from '@/assets/images/icons/english.png'

const route = useRoute()
const {toggleTheme, currentTheme} = useTheme()

const currentPage = computed(() => {
  if (route.name) {
    return uppercaseFirstSymbol(route.name)
  }
  return ''
})

onMounted(() => {})
</script>
<style lang="scss" scoped>
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
  }

  // .header__logo
  &__logo {
  }

  // .header__current-page
  &__current-page {
    font-size: 15px;
    line-height: 17px;
    position: relative;
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
  &__switch {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid var(--border-header);
    height: 73px;
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
}

/*  target the elemenent after the label*/
.checkbox:checked + .label .ball {
  transform: translateX(22px);
}

.fa-moon {
  color: yellow;
  font-size: 14px;
}

.fa-sun {
  color: yellow;
  font-size: 14px;
}
</style>
