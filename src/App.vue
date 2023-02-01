<script setup>
import {RouterView} from 'vue-router'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import SidebarComponent from '@/components/layout/SidebarComponent.vue'
</script>

<template>
  <div class="wrapper__row">
    <SidebarComponent />
    <div class="wrapper__content">
      <HeaderComponent> </HeaderComponent>
      <main class="page">
        <RouterView />
      </main>
    </div>
  </div>
  <FooterComponent> </FooterComponent>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 30px;
  &__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
}
.wrapper__row {
  flex: 1 1 auto;
  display: flex;
  gap: 26px;
  padding-top: 30px;
}
.page {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: rem(35);
}
</style>
