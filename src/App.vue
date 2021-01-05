<template>
{{appError}}
  <div class="appbox" :class="transitionName">
    <router-view v-slot="{ Component }" class="wrapper">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <app-error v-if="appError" />

</template>
<script>
import appError from '@/components/global/error.vue'
import { defineComponent } from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  const fontSize = window.innerWidth / 10 > 50 ? 50 : window.innerWidth / 10
  html.style.fontSize = fontSize + 'px'
})

export default defineComponent({
  components: {
    appError
  },
  computed: {
    appError () {
      return this.$store.getters.error
    }
  },
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.name !== 'jingxuan' && this.$route.name !== 'bookcase' && this.$route.name !== 'ku') {
        if (to.meta.key > from.meta.key) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      } else {
        this.transitionName = ''
      }
    }
  }
})
</script>
<style scoped lang="scss">
.appbox{
  width: 100%;
  height: 100%;
  z-index: 0;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $white;
  .wrapper{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    min-width: 200px;
    max-width: 640px;
    position: relative;
    opacity: 1;
    &.slide-left-enter-to{
      opacity: 0;
    }
    &.slide-left-leave-to{
      transform: translateX(-100%);
    }
    &.slide-left-enter-active,&.slide-left-leave-active{
      transition: transform .2s linear;
    }
    &.slide-right-enter-to{
      opacity: 0;
    }
    &.slide-right-leave-to{
      transform: translateX(100%);
    }
    &.slide-right-enter-active,&.slide-right-leave-active{
      transition: transform .2s linear;
    }
  }
}

</style>
