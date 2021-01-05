<template>
  <div class="page-bar">
    <ul class="top">
      <li v-if="currentPageV>1"><a @click="handlePageClick(1)">首页</a></li>
      <li v-if="currentPageV>1"><a @click="handlePageClick(currentPageV - 1)">上页</a></li>
      <li v-if="currentPageV!=pagecounts"><a @click="handlePageClick(currentPageV + 1)">下页</a></li>
      <li v-if="currentPageV!=pagecounts"><a @click="handlePageClick(pagecounts)">末页</a></li>
    </ul>
    <ul class="nav">
      <li v-for="index in handlePageNav" :key="index" :class="{ 'active': currentPageV ==index}">
        <a @click="handlePageClick(index)">{{index}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'typePage',
  setup () {
    const store = useStore()
    const current = getCurrentInstance()
    const currentPageV = computed(() => { return store.getters.typePage })
    const pagecounts = computed(() => { return store.getters.typeData.pagecounts })
    const handlePageClick = (currentPage) => {
      if (currentPage !== currentPageV.value) {
        current.emit('changTypePage', currentPage)
      }
    }
    const handlePageNav = computed(() => {
      let cur = 1
      let all = pagecounts.value
      const current = currentPageV.value
      const a = []
      if (all >= 9) {
        if (current > 5 && current < all - 4) {
          cur = currentPageV.value - 4
          all = currentPageV.value + 4
        } else {
          if (current <= 5) {
            cur = 1
            all = 9
          } else {
            cur = all - 5
          }
        }
      }
      while (cur <= all) {
        a.push(cur)
        cur = cur + 1
      }
      return a
    })
    return {
      pagecounts,
      currentPageV,
      handlePageClick,
      handlePageNav
    }
  }
})
</script>
<style scoped lang="scss">
.page-bar{
  margin:px(25) 0 px(25) px(12);
  ul{
    margin-bottom:px(15);
    overflow: hidden;
    li{
      margin-bottom:px(4);
      overflow: hidden;
      float: left;
      a{
        float:left;
        padding:px(10) px(30);
        color:$grey62;
        font-size:px(13);
        background:$greyf8;
        margin-right: px(5);
      }
    }
    .active a{
      color:$white;
      background-color:$blue;
      border-color:$blue;
    }
  }
}

</style>
