<template>
  <div class="r">
     <ul v-for="(items,index) in data.book" :key="index" :class="index==indexs?'cur':''">
      <div class="title">共有{{items.ss.total}}部</div>
      <li v-for="(itemss,index) in items.s" :key="index" @click="handleType('/type/'+itemss.typeid)">
        <el-image :src="'/book/type/'+index+'.png'" lazy :key="'/book/type/'+index+'.png'"></el-image>
        <span>{{itemss.type}}</span><p>{{itemss.num}}部</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'kuRight',
  setup () {
    const store = useStore()
    const router = useRouter()
    const handleType = (href) => { router.push(href) }
    const data = computed(() => { return store.getters.kuData })
    const indexs = computed(() => { return store.getters.kuIndex })
    return {
      data,
      handleType,
      indexs
    }
  }
})
</script>
<style scoped lang="scss">
.r{
  float:right;
  flex:1;
  padding-left: px(64);
  @include scroll;
  .title{
    margin-left:px(20);
    color:$grey3;
    font-size:px(14);
    line-height:px(30)
  }
  ul{
    overflow:hidden;
    display: none;
    margin-top:px(5);
    .title{
      overflow: hidden;
      span{
        float: right;
        color:$grey9;
        margin-right: px(10);
        font-size: px(12);
      }
    }
    li{
      float: left;
      background:$white;
      overflow:hidden;
      padding:px(10) 0;
      width: 50%;
      .el-image{
        width: px(40);
        float: left;
        margin-right: px(10);
        height: px(54);
        margin-left:px(20);
      }
      span{
        margin-left: px(60);
        font-size: px(13);
        display: block;
        text-align: left;
        margin-top: px(10);
        margin-bottom:px(5);
      }
      p{
        margin-left: px(60);
        font-size:px(12);
        display:block;
        text-align:left;
        color:$grey6
      }
    }
  }
  .cur{
    display:block;
  }
}
</style>
