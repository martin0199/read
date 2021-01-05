<template>
  <div id="jingxuan">
    <jx-header />
    <global-load v-if="globalLoading" loadType="load" />
    <jx-content :class="globalLoading?'Component':''" class="moveTop" />
    <global-footer/>
  </div>
</template>
<script>
import globalLoad from '@/components/global/loading.vue'
import jxHeader from '@/components/jingxuan/search.vue'
import jxContent from '@/components/jingxuan/content.vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
import { jingXuanStorage } from '@/untils/mixin.ts'
import { getStorage } from '@/untils/localStorage'
import globalFooter from '@/components/global/footer.vue'
export default defineComponent({
  name: 'jingxuan',
  components: {
    jxHeader,
    jxContent,
    globalLoad,
    globalFooter
  },
  setup () {
    const store = useStore()
    const globalLoading = computed(() => { return store.getters.globalLoading })
    if (getStorage('jingxuan')) {
      store.commit('setJingXuan', getStorage('jingxuan'))
    } else {
      jingXuanStorage(store)
    }
    return {
      globalLoading
    }
  }
})
</script>
<style scoped lang="scss">
</style>
