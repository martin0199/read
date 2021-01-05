<template>
  <div class="searchContent infinite-list" :infinite-scroll-immediate="false"  v-infinite-scroll="changeWanben" style="overflow:auto">
    <ul v-for="(item, index) in data" :key="index" @click="handleSearch('/detail/'+item.articleid)">
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
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const data = computed(() => store.getters.searchData)
    const page = computed({
      get: () => store.getters.searchPage,
      set: (val) => store.commit('setSearchPage', val)
    })
    const handleSearch = (href) => { router.push(href) }
    const changeWanben = () => {
      store.dispatch('actionSearch', page.value)
      page.value++
    }
    return {
      data,
      changeWanben,
      handleSearch
    }
  }
})
</script>

<style scoped lang="scss">
.searchContent{
  padding: px(64) px(12) px(54) px(12);
  box-sizing: border-box;
  @include scroll;
  position: absolute;
  left: 0;
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
</style>
