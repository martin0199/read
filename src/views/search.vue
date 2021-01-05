<template>
  <div id="search">
    <search-header/>
    <search-history />
    <search-content/>
    <template v-if="!no">
      <global-load v-if="globalLoading" loadType="loading"/>
    </template>
    <template v-else>
      <div class="null">没有找到你想要的书</div>
    </template>
  </div>
</template>
<script>
import searchHeader from '@/components/search/header.vue'
import searchContent from '@/components/search/content.vue'
import searchHistory from '@/components/search/history.vue'
import globalLoad from '@/components/global/loading.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    searchHeader,
    searchHistory,
    globalLoad,
    searchContent
  },
  setup () {
    const store = useStore()
    const httpList = computed(() => store.getters.httpList)
    const globalLoading = computed(() => store.getters.globalLoading)
    const no = computed(() => store.getters.searchNo)
    store.commit('initSearch')
    store.commit('setSearchNoData', false)
    return {
      globalLoading,
      httpList,
      no
    }
  }
})
</script>

<style scoped lang="scss">
.null {
    font-size: px(14);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: 50%;
    height: px(200);
    margin: auto;
    text-align: center;
    color: $grey86;
    &::before {
    display: block;
    width: px(50);
    height: px(80);
    margin: 0 auto px(20);
    content: '';
    z-index: 10;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzNiA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R3JvdXAgMzM8L3RpdGxlPjxnIHN0cm9rZT0iI0MwQzVDQyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yIDQ3Yy0uNTUzIDAtMS0uNDU1LTEtMS4wMDRWMi4wMDRDMSAxLjQ0OSAxLjQ0NyAxIDIgMWgyM2wxMCAxMHYzNWMwIC41NTItLjQ1NSAxLTEgMUgyeiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI1IDF2OS4wMDVjMCAuNTUuNDU2Ljk5NS45OTUuOTk1SDM1Ii8+PHBhdGggZD0iTTcgMThoMTJNNyAyNmgyMk03IDM0aDIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9zdmc+) no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
