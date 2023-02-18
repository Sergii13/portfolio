import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import getFeedbacksApi from '@/api/getData'

export const useFeedbackStore = defineStore('feedbacks', () => {
  const isLoading = ref(false)
  const feedbacks = ref(null)
  const errors = ref(null)

  function getFeedbacks(url) {
    return new Promise((resolve, reject) => {
      isLoading.value = true
      errors.value = null
      getFeedbacksApi
        .getData(url)
        .then((data) => {
          isLoading.value = false
          feedbacks.value = data
          resolve(data)
        })
        .catch((data) => {
          isLoading.value = false
          errors.value = data.response.statusText
          reject()
        })
    })
  }

  return {isLoading, feedbacks, errors, getFeedbacks}
})
