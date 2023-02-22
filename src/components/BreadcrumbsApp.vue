<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li
        v-for="(item, index) of props.items"
        :key="index"
        class="breadcrumbs__item"
      >
        <router-link
          :to="{name: item.nameComponent}"
          class="breadcrumbs__link"
          :class="{current: item.isDisabled}"
          >{{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  // .breadcrumbs__list
  &__list {
    display: flex;
    align-items: center;
    font-size: rem(15);
    line-height: 113.333333%; /* 17/15 */
    color: #e4e4e4;
  }
  // .breadcrumbs__item
  &__item {
    &:not(:last-child) {
      &::after {
        font-size: rem(15);
        line-height: 113.333333%; /* 17/15 */
        color: #e4e4e4;
        display: inline-block;
        position: relative;
        margin: 0 rem(10);
        content: '/';
      }
    }
  }
  // .breadcrumbs__link
  &__link {
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);

    &.current {
      pointer-events: none;
    }
    &:hover {
      text-shadow: 0 0 0.65px #e4e4e4, 0 0 0.65px #e4e4e4;
    }
  }
}
</style>
