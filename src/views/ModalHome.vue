<template>
  <ModalApp
    v-if="props.data"
    :image="`url(${props.data.image})`"
    :other-class="'portfolio'"
  >
    <template #popup-head>
      <div class="popup__head-row">
        <div class="popup__left">
          <ul class="popup__breadcrumbs">
            <li>
              <router-link :to="{name: 'portfolio'}" class="popup__type">
                {{ props.data.type }}
              </router-link>
            </li>
            <li>
              <span>{{ props.data.name }}</span>
            </li>
          </ul>
        </div>
        <div class="popup__right">
          <div class="popup__links">
            <router-link :to="{name: 'contacts'}" class="popup__create-site">
              Request to create a website
              <img src="@/assets/images/icons/create-sitesvg.svg" alt="" />
            </router-link>
            <a :href="props.data.link" class="popup__open-site">
              Open Link
              <img src="@/assets/images/icons/link.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </template>
    <template #popup-body>
      <div class="popup__image-ibg">
        <img :src="props.data.image" alt="" />
      </div>
      <div class="popup__descr">
        <p>
          {{ props.data.text }}
        </p>
      </div>
      <div class="popup__links-mob">
        <a href="" class="popup__create-site">
          Request to create a website
          <img src="@/assets/images/icons/create-sitesvg.svg" alt="" />
        </a>
        <a :href="props.data.link" class="popup__open-site">
          Open Link
          <img src="@/assets/images/icons/link.svg" alt="" />
        </a>
      </div>
    </template>
  </ModalApp>
</template>

<script setup>
import ModalApp from '@/components/ModalApp.vue'
import {useRouter} from 'vue-router'
import {useModal} from '@/stores/modal.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const storeModal = useModal()
const router = useRouter()
router.beforeEach(() => {
  storeModal.closeModal()
})
</script>

<style lang="scss" scoped>
.popup__type {
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
  &:hover {
    text-decoration: underline;
  }
}
</style>
