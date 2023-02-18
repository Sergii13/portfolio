<template>
  <AppSlider :isLoading="isLoading" :data="projects" :isPortfolio="true">
    <template #card="{data}">
      <CardPortfolio :project="data" />
    </template>
  </AppSlider>
</template>

<script setup>
import {onMounted} from 'vue'
import {useProjectsStore} from '@/stores/projects'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import AppSlider from '@/components/layout/AppSlider.vue'
import CardPortfolio from '@/components/cards/CardPortfolio.vue'
import NavSlider from '@/components/layout/NavSlider.vue'

const store = useProjectsStore()
const {projects, isLoading} = storeToRefs(store)
const router = useRouter()

onMounted(() => {
  store.getProjects('portfolio/').catch(() => {
    router.push({name: '404'})
  })
})
</script>

<style lang="scss" scoped></style>
