<template>
  <router-view/>
</template>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  const fontSize = window.innerWidth / 10 > 50 ? 50 : window.innerWidth / 10
  html.style.fontSize = fontSize + 'px'
})
export default {
}
</script>
<style>
</style>
