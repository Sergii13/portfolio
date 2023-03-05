<template>
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
    <div class="project__image-ibg">
      <img :src="data.images[0]" alt="" />
      <router-link
        :to="{
          name: 'project',
          params: {slug: data.nextSlug, id: data.next},
        }"
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
</template>

<script setup>
import {toRefs} from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  linksArray: {
    type: Array,
    required: true,
  },
})
const {data, linksArray} = toRefs(props)
</script>
