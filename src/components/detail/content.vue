<template>
  <div class="detailBox">
    <div class="mainImg">
      <img :src="data.img">
      <p class="title">{{data.articlename}}</p>
      <p class="author">{{data.author}}</p>
    </div>
    <div class="mainList">
      <p class="fullflag" v-if="data.stauts==0">{{data.lastupdate}}更新过</p>
      <p class="fullflag" v-else>已完结</p>
      <p class="type">{{data.sortid}}</p>
    </div>
    <div class="intro">{{data.intro}}</div>
    <add-bookcase />
  </div>
</template>

<script>
import addBookcase from '@/components/detail/addBookCase.vue'
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'detail',
  components: {
    addBookcase
  },
  setup () {
    const store = useStore()
    const data = computed(() => { return store.getters.detailData })
    return {
      data
    }
  }
})
</script>
<style scoped lang="scss">
.detailBox{
  padding:px(15);
  box-sizing: border-box;
  position: relative;
  height: 100%;
  .mainImg{
    margin-top: px(50);
    overflow: hidden;
    text-align: center;
    img{
      width:px(80);
      height:px(100);
      margin-bottom: px(5);
      background: $img;
    }
    .title{
      font-weight: bold;
      color:$grey3;
      font-size: px(14);
      margin-bottom: px(5);
    }
    .author{
      color:$grey6;
      font-size: px(13);
    }
  }
  .mainList{
    overflow: hidden;
    margin-top: px(20);
    p{
      margin-bottom: px(10);
      font-size: px(13);
      color:$grey6;
      width: 50%;
      float: left;
      text-align: center;
      border:px(1) solid $greyf8;
      box-sizing: border-box;
      padding:px(5) px(5);
    }
  }
  .intro{
    font-size: px(13);
    margin-top: px(10);
    line-height: px(20);
    color:$grey6;
    text-indent: px(26);
  }
  .chapter{
    overflow: hidden;
    display: flex;
    font-size: px(14);
    color:$grey6;
    line-height: px(40);
    height: px(40);
    .name{
      width: 100%;
    }

  }
}
</style>
