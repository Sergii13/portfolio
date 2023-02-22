import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import getProjectsApi from '@/api/getData'

export const useProjectsStore = defineStore('projects', () => {
  const isLoading = ref(false)
  const projects = ref(null)
  const errors = ref(null)

  function getProjects() {
    return new Promise((resolve, reject) => {
      projects.value = null
      isLoading.value = true
      errors.value = null
      getProjectsApi
        .getPortfolio()
        .then((data) => {
          isLoading.value = false
          projects.value = data
          resolve(data)
        })
        .catch((data) => {
          isLoading.value = false
          errors.value = data.response.statusText
          reject()
        })
    })
  }

  return {isLoading, projects, errors, getProjects}
})
