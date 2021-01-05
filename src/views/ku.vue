<template>
  <div id="ku">
    <global-header title="书城"></global-header>
    <global-load v-if="globalLoading" loadType="load"></global-load>
    <div :class="globalLoading?'Component':''" class="kuBox moveTop">
      <ku-right></ku-right>
      <ku-left></ku-left>
    </div>
    <global-footer></global-footer>
  </div>
</template>
<script>
import globalFooter from '@/components/global/footer.vue'
import globalHeader from '@/components/global/header.vue'
import kuLeft from '@/components/ku/left.vue'
import kuRight from '@/components/ku/right.vue'
import { kuStorage } from '@/untils/mixin.ts'
import globalLoad from '@/components/global/loading.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getStorage } from '@/untils/localStorage'
export default defineComponent({
  name: 'ku',
  components: {
    globalFooter,
    globalHeader,
    kuRight,
    kuLeft,
    globalLoad
  },
  setup () {
    const store = useStore()
    const globalLoading = computed(() => { return store.getters.globalLoading })
    if (getStorage('ku')) {
      store.commit('setKu', getStorage('ku'))
    } else {
      kuStorage(store)
    }
    return {
      globalLoading
    }
  }
})
</script>
<style scoped lang="scss">
.kuBox{
  overflow: hidden;
  padding-top:px(50);
  display: flex;
  position: absolute;
  height: 100%;
}
</style>
