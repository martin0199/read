<template>
  <div class="detail">
    <global-header :back="true" :border="true"></global-header>
    <global-load v-if="globalLoading" loadType="loading"/>
    <detail-content />
  </div>
</template>
<script>
import globalHeader from '@/components/global/header.vue'
import detailContent from '@/components/detail/content.vue'
import globalLoad from '@/components/global/loading.vue'
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'detail',
  components: {
    globalHeader,
    detailContent,
    globalLoad
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const articleid = computed(() => { return route.params.id })
    const globalLoading = computed(() => store.getters.globalLoading)
    store.commit('setDetailId', articleid.value)
    store.commit('setDetail', '')
    store.dispatch('actionDetail')
    /*watch(route, (e) => {
      e.name === 'read' && store.commit('setDetailHref', 1)
    })*/
    return {
      globalLoading
    }
  }
})
</script>
<style scoped lang="scss">
.detail{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  background: $white;
  width: 100%;
  height: 100%;
}
</style>
