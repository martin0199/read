<template>
  <div class="wanben infinite-list"  v-infinite-scroll="changeWanben" style="overflow:auto">
    <div class="wanbenBox">
      <ul v-for="(item, index) in info" :key="index" @click="handleType('/detail/'+item.articleid)">
        <li class="img"><el-image :src="item.img" lazy :key="item.img"></el-image></li>
        <li class="imgList">
          <h3>{{item.articlename}}</h3>
          <p>
            <span class="author">{{item.author}}</span><b v-if="item.author">·</b>
            <span class="zj">{{item.chapters}}</span><b v-if="item.chapters">·</b>
            <span>{{item.fullflag}}</span>
          </p>
          <p>{{item.intro}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'wanbenContent',
  setup () {
    const store = useStore()
    const router = useRouter()
    const current = getCurrentInstance()
    const handleType = (href) => { router.push(href) }
    const info = computed(() => store.getters.wanbenData)
    const changeWanben = () => { current.emit('changeWanben') }
    return {
      info,
      handleType,
      changeWanben
    }
  }
})
</script>
<style scoped lang="scss">
.wanben{
  position: absolute;
  height: 100%;
  width: 100%;
  .wanbenBox{
    padding: px(42) px(12) px(52) px(12);
    box-sizing: border-box;
    ul{
      overflow:hidden;
      margin-bottom:px(10);
      padding-bottom:px(10);
      border-bottom: px(1) solid $greyf8;
      .img{
        float: left;
        margin-right: px(12);
        width: px(58);
        height: px(77);
        background: $img;
      }
      .imgList{
        overflow: hidden;
        h3{
          font-size: px(14.5);
          margin-bottom:px(5);
          margin-top: px(2);
        }
        p{
          font-size: px(13);
          line-height: px(20);
          max-height: px(40);
          overflow: hidden;
          color:$grey74;
          font-weight: lighter;
          span{
            font-size:px(13);
            color:$grey9;
            font-weight: lighter;
          }
          b{
            padding:0 px(5);
            color:$grey9;
            font-weight: lighter;
          }
        }
      }
    }
  }
}
</style>
