/* eslint-disable no-unused-vars */
import {ref, onMounted, computed} from 'vue'

const getTheme = () => {
  return localStorage.getItem('user-theme')
}
const initUserTheme = ref(getTheme() ? getTheme : 'light-theme')

const currentTheme = computed(() => {
  return initUserTheme.value
})

export const useTheme = () => {
  const setTheme = (theme) => {
    localStorage.setItem('user-theme', theme)
    initUserTheme.value = theme
    document.body.className = theme
  }

  const toggleTheme = () => {
    const activeTheme = localStorage.getItem('user-theme')
    if (activeTheme === 'light-theme') {
      setTheme('dark-theme')
    } else {
      setTheme('light-theme')
    }
  }

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    if (hasDarkPreference) {
      return 'dark-theme'
    } else {
      return 'light-theme'
    }
  }

  onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference()
    setTheme(initUserTheme)
  })

  return {
    toggleTheme,
    setTheme,
    getTheme,
    currentTheme,
  }
}
