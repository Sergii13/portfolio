import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useModal = defineStore('modal', () => {
  const isOpen = ref(false)

  function openModal() {
    isOpen.value = true
    document.documentElement.classList.add('popup-show')
  }
  function closeModal() {
    isOpen.value = false
    document.documentElement.classList.remove('popup-show')
    document.documentElement.classList.remove('portfolio')
  }

  return {isOpen, closeModal, openModal}
})
