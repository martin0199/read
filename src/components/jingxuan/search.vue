<template>
  <div class="jxHeader">
    <span class="jxSearch" @click="handleSearch">
      <i class="iconfont icon-search"></i>
    </span>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const router = useRouter()
    const tagArr = [
      { url: '/ku', img: '/book/index/xsfl.png', name: '分类' },
      { url: '/screen/0', img: '/book/index/xsph.png', name: '排行' },
      { url: '/wanben', img: '/book/index/shujia.png', name: '完本' }
    ]
    const handleSearch = () => { router.push('/search') }
    return {
      tagArr,
      handleSearch
    }
  }
})
</script>
<style scoped lang="scss">
.jxHeader{
  position:absolute;
  z-index: 9;
  background: $white;
  height:px(36);
  width:100%;
  line-height:px(40);
  padding-top: px(8);
  .jxSearch{
    width: 94%;
    height: px(34);
    line-height: px(34);
    background:$greyf8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    i{
      font-size: px(20);
      color:$grey3;

    }
  }
}
</style>
