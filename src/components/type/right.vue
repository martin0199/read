<template>
  <div class="typeRightBox">
    <ul v-for="(item, index) in info" :key="index" @click="handleType('/'+item.module+'/'+item.articleid)">
      <li class="img"><el-image :src="item.img" lazy :key="item.img"></el-image></li>
      <li class="imgList">
        <h3>{{item.articlename}}</h3>
        <p>{{item.intro}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'typeRight',
  setup () {
    const store = useStore()
    const router = useRouter()
    const handleType = (href) => { router.push(href) }
    const info = computed(() => { return store.getters.typeData.info })
    return {
      info,
      handleType
    }
  }
})
</script>
<style scoped lang="scss">
.typeRightBox{
  padding: px(0) px(12) px(12) px(12);
  ul{
    overflow:hidden;
    margin-bottom:px(8);
    padding-bottom:px(13);
    border-bottom: px(1) solid $greyf8;
    .img{
      float: left;
      margin-right: px(10);
      width: px(50);
      height: px(62);
      background: $img;
    }
    .imgList{
      overflow: hidden;
      h3{
        font-size: px(14);
        padding-top: px(4);
        font-weight: bold;
        color:$grey62;
        margin-bottom: px(5);
      }
      p{
        height:px(34);
        line-height: px(18);
        overflow: hidden;
        width: 100%;
        font-size: px(12);
        color:$grey62;
        margin-bottom: px(5);
      }
    }
  }
}
</style>
