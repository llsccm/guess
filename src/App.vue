<template>
  <Header />
  <RouterView />
</template>

<script setup lang="ts">
import { useOverlayScrollbars } from 'overlayscrollbars-vue'

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

darkModeMediaQuery.addEventListener('change', () => {
  if (darkModeMediaQuery.matches) {
    document.documentElement.setAttribute('theme-mode', 'dark')
  } else {
    document.documentElement.removeAttribute('theme-mode')
  }
})

if (darkModeMediaQuery.matches) {
  document.documentElement.setAttribute('theme-mode', 'dark')
}

const [initBodyOverlayScrollbars] = useOverlayScrollbars({
  defer: true,
  events: {
    initialized: () => {},
    destroyed: () => {}
  },
  options: {
    scrollbars: {
      clickScroll: true
    }
  }
})

onMounted(() => initBodyOverlayScrollbars(document.body))
</script>
