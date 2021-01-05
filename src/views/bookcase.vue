<template>
  <div id="bookcase">
    <global-header title="收藏" :border="true">
      <template v-slot:bookcase>
        <i class="iconfont icon-19 more" @click="handleBookCaseTab"></i>
      </template>
    </global-header>
    <global-load v-if="globalLoading" loadType="loading"/>
    <bookcase-header-tab v-if="bookcaseTab" />
    <bookcase-content :class="globalLoading?'Component':''" class="moveTop" />
    <bookcase-select v-if="!bookcseHrefs" />
    <global-footer/>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getStorage } from '@/untils/localStorage'
import globalLoad from '@/components/global/loading.vue'
import bookcaseContent from '@/components/bookcase/content.vue'
import globalHeader from '@/components/global/header.vue'
import bookcaseHeaderTab from '@/components/bookcase/headerTab.vue'
import { bookCaseStorage } from '@/untils/mixin.ts'
import bookcaseSelect from '@/components/bookcase/headerSelect.vue'
import globalFooter from '@/components/global/footer.vue'
export default defineComponent({
  name: 'bookcase',
  components: {
    bookcaseContent,
    globalHeader,
    globalLoad,
    bookcaseHeaderTab,
    bookcaseSelect,
    globalFooter
  },
  setup () {
    const store = useStore()
    const globalLoading = computed(() => { return store.getters.globalLoading })
    const bookcaseTab = computed(() => { return store.getters.bookCaseTab })
    const bookcseHrefs = computed(() => { return store.getters.bookCaseHref })
    store.commit('setBookCaseTab', false)
    const handleBookCaseTab = () => { store.commit('setBookCaseTab', !bookcaseTab.value) }
    getStorage('bookcaseMoudel') && store.commit('setBookCaseModule', getStorage('bookcaseMoudel'))
    if (getStorage('bookcase')) {
      store.commit('setBookCase', getStorage('bookcase'))
    } else {
      bookCaseStorage(store)
    }
    return {
      bookcaseTab,
      globalLoading,
      handleBookCaseTab,
      bookcseHrefs
    }
  }
})
</script>
<style scoped lang="scss">
.more{
  position: absolute;
  right: px(10);
  font-size: px(20);
  top:0;
  width: px(40);
  height:px(40);
  color:$grey3
}
</style>
