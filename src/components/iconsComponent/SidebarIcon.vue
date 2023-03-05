<template>
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="path" />
    <defs>
      <linearGradient
        id="gradient"
        x1="10.0318"
        y1="1.64111"
        x2="10.0318"
        y2="18.3594"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#005BBB" />
        <stop offset="1" stop-color="#6DB4FF" />
      </linearGradient>
    </defs>
  </svg>
</template>
<script setup>
import {onMounted, ref} from 'vue'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
})
const primaryColor = ref(null)

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)
  primaryColor.value = styles.getPropertyValue('--colorSwiper')
})
</script>
<style lang="scss" scoped>
svg {
  fill: var(--colorSwiper, url(#gradient));
  transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
}
</style>
