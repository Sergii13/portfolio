import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import getMainApi from '@/api/getData'

export const useMainPage = defineStore('main', () => {
  const isLoading = ref(false)
  const data = ref(null)
  const errors = ref(null)

  function getMain() {
    return new Promise((resolve, reject) => {
      data.value = null
      isLoading.value = true
      errors.value = null
      getMainApi
        .getMain()
        .then((response) => {
          isLoading.value = false
          data.value = response
          resolve(data)
        })
        .catch((data) => {
          isLoading.value = false
          errors.value = data.response.statusText
          reject()
        })
    })
  }

  return {isLoading, data, errors, getMain}
})
