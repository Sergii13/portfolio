<script setup>
import {RouterView} from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'
</script>

<template>
  <div class="wrapper__row">
    <TheSidebar />
    <div class="wrapper__content">
      <TheHeader> </TheHeader>
      <main class="page">
        <RouterView />
      </main>
    </div>
  </div>
  <TheFooter> </TheFooter>
</template>

<style lang="scss"></style>
