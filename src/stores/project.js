import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import getProjectApi from '@/api/getData'

export const useProjectStore = defineStore('project', () => {
  const isLoading = ref(false)
  const data = ref(null)
  const errors = ref(null)

  function getProject(id) {
    return new Promise((resolve, reject) => {
      data.value = null
      isLoading.value = true
      errors.value = null
      getProjectApi
        .getProject(id)
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

  return {isLoading, data, errors, getProject}
})
