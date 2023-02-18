<template>
  <sidebar class="wrapper__sidebar sidebar">
    <ul class="sidebar__list sidebar__list_nav">
      <li class="sidebar__item">
        <RouterLink
          :to="{name: 'main'}"
          :class="{active: route.name === 'main'}"
          class="sidebar__link"
        >
          <SidebarIcon :path="pathHome" />
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink
          :to="{name: 'portfolio'}"
          class="sidebar__link"
          :class="{active: route.name === 'portfolio'}"
        >
          <SidebarIcon :path="pathPortfolio" />
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink
          :to="{name: 'feedback'}"
          class="sidebar__link"
          :class="{active: route.name === 'feedback'}"
        >
          <SidebarIcon :path="pathFeedback" />
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink
          :to="{name: 'contacts'}"
          class="sidebar__link"
          :class="{active: route.name === 'contacts'}"
        >
          <SidebarIcon :path="pathContacts" />
        </RouterLink>
      </li>
    </ul>
    <div class="sidebar__line"></div>
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <a href="" class="sidebar__link">
          <img :src="ContactIcon" alt="" />
        </a>
      </li>
      <li class="sidebar__item">
        <a href="" class="sidebar__link">
          <img :src="ContactIcon" alt="" />
        </a>
      </li>
      <li class="sidebar__item">
        <a href="" class="sidebar__link">
          <img :src="ContactIcon" alt="" />
        </a>
      </li>
      <li class="sidebar__item">
        <a href="" class="sidebar__link">
          <img :src="ContactIcon" alt="" />
        </a>
      </li>
    </ul>
  </sidebar>
</template>
<script setup>
import {useRoute} from 'vue-router'
import ContactIcon from '@/assets/images/icons/iconContact.png'
import SidebarIcon from '@/components/iconsComponent/SidebarIcon.vue'
import {
  pathContacts,
  pathFeedback,
  pathHome,
  pathPortfolio,
} from '@/helpers/pathsIcon'

const route = useRoute()
</script>
<style lang="scss">
.sidebar {
  flex: 0 0 60px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  @media (max-width: em(1600)) {
    flex: 0 0 rem(40);
  }
  @media (max-width: $tablet) {
    display: none;
  }
  // .sidebar__list

  &__list {
    backdrop-filter: blur(2px);
    width: 100%;
  }
  &__item {
    &:first-child {
      .sidebar__link {
        border-top: 1px solid var(--border-color);
        border-radius: 5px 5px 0 0;
      }
    }
    &:last-child {
      .sidebar__link {
        border-radius: 0 0 5px 5px;
      }
    }
  }

  // .sidebar__link

  &__link {
    height: 75px;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
    background: transparent;
    border: 1px solid var(--border-color);
    border-top: none;
    @media (max-width: em(1600)) {
      height: rem(55);
    }
    &:hover {
      svg {
        transform: translateY(-3px);
      }
      img {
        transform: translateY(-3px);
      }
    }

    svg {
      width: 20px;
      height: 20px;
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      @media (max-width: em(1600)) {
        width: 15px;
        height: 15px;
      }
    }
    img {
      transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
      filter: invert(1);
      @media (max-width: em(1600)) {
        width: 15px;
        height: 15px;
      }
    }
    .dark-theme & img {
      filter: invert(0);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      height: 0;
      top: 0;
      z-index: 2;
      width: 1px;
      background: linear-gradient(263.18deg, #005bbb 16.86%, #6db4ff 104.2%);
    }
    &.active {
      border-left: none;
      &::after {
        height: 100%;
      }
    }
  }

  // .sidebar__line

  &__line {
    width: 1px;
    display: flex;
    justify-content: center;
    background-color: var(--border-color);
    flex: 1 1 auto;
  }
}
</style>
