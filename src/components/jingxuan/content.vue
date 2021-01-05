<template>
  <div class="jingxuanScroll">
    <jx-banner />
    <jx-tab />
    <jx-jx />
    <jx-type  />
    <jx-rm />
  </div>
</template>

<script>
import jxJx from '@/components/jingxuan/jx.vue'
import jxType from '@/components/jingxuan/type.vue'
import jxRm from '@/components/jingxuan/rm.vue'
import jxTab from '@/components/jingxuan/tab.vue'
import jxBanner from '@/components/plugin/banner.vue'
export default {
  components: {
    jxJx,
    jxType,
    jxTab,
    jxRm,
    jxBanner
  }
}
</script>

<style scoped lang="scss">
.jingxuanScroll{
  @include scroll;
  padding:px(56) px(10);
  box-sizing: border-box;
}
</style>
