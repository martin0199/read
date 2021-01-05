<template>
  <div class="read" :class="[readMod]">
    <div class="readBox">
      <read-touch />
      <read-content/>
      <read-nav />
      <read-top v-if="menu"/>
      <read-footer v-if="menu"/>
      <read-sfooter v-if="menu"/>
      <read-smenu v-if="menu"/>
      <read-mulu v-if="mulu"/>
      <read-ly v-if="menu"/>
    </div>
    <read-error v-if="readError" />
    <read-load v-if="globalLoading" loadType="reading"/>
  </div>
</template>
<script>
import readContent from '@/components/read/content.vue'
import readTouch from '@/components/read/touch.vue'
import readNav from '@/components/read/nav.vue'
import readLoad from '@/components/global/loading.vue'
import readError from '@/components/read/error.vue'
import readTop from '@/components/read/top'
import readFooter from '@/components/read/footer'
import readLy from '@/components/read/ly'
import readSfooter from '@/components/read/subfooter'
import readSmenu from '@/components/read/submenu'
import readMulu from '@/components/read/mulu'
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getStorage } from '@/untils/localStorage'
export default defineComponent({
  name: 'read',
  components: {
    readContent,
    readNav,
    readTouch,
    readLoad,
    readError,
    readTop,
    readFooter,
    readLy,
    readSfooter,
    readSmenu,
    readMulu
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const menu = computed(() => store.getters.readMenu)
    const readError = computed(() => store.getters.readError)
    const globalLoading = computed(() => store.getters.globalLoading)
    const readMod = computed(() => store.getters.readMod)
    const mulu = computed(() => store.getters.readMulu)
    getStorage('mod') && store.commit('setReadMod', getStorage('mod'))
    getStorage('fontSize') && (store.commit('setReadFontSize', getStorage('fontSize')))
    store.commit('setReadId', route.params.id)
    store.commit('setReadCid', route.params.cid)
    store.commit('setReadSiteId', route.params.siteid)
    store.commit('setReadInit')
    store.commit('setReadIndex')
    store.commit('setReadBookCase', false)
    store.dispatch('actionRead', 3)
    return {
      menu,
      globalLoading,
      readError,
      readMod,
      mulu
    }
  }
})
</script>
<style scoped lang="scss">
.read{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(/book/read/skin-default-t.ece62.jpg) no-repeat top,url(/book/read/skin-default-b.79f06.jpg) no-repeat bottom,url(/book/read/skin-default-m.35905.jpg) repeat-y center 119px;
  background-size: 100%;
  &.mod{
    @include mod
  }
}
</style>
