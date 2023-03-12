<script setup>
import {RouterView, useRoute} from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'
import {onMounted} from 'vue'

const route = useRoute()
onMounted(() => {
  console.log(route.path)
})
</script>

<template>
  <div class="wrapper" :class="{'home-page': route.path === '/'}">
    <div class="wrapper__row">
      <TheSidebar />
      <div class="wrapper__content" :class="{'not-100': route.path === '/'}">
        <TheHeader> </TheHeader>
        <main class="page">
          <RouterView />
        </main>
      </div>
    </div>
    <TheFooter> </TheFooter>
  </div>
</template>

<style lang="scss"></style>
