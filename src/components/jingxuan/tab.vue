<template>
  <div class="tab">
    <router-link :to="item.url" v-for="(item,index) in tagArr" :key="index">
      <img :src="item.img">
      <p>{{item.name}}</p>
    </router-link>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    const tagArr = [
      { url: '/ku', img: '/book/index/xsfl.png', name: '分类' },
      { url: '', img: '/book/index/xsph.png', name: '排行' },
      { url: '/wanben', img: '/book/index/shujia.png', name: '完本' },
      { url: '/guess', img: '/book/index/suiji.png', name: '随机看书' }
    ]
    return {
      tagArr
    }
  }
})
</script>
<style scoped lang="scss">
.tab{
  overflow:hidden;
  padding:px(15) 0 0 0 ;
  background:$white;
  display:block;
  margin-bottom: px(10);
  a{
    float:left;
    margin-right:12%;
    width:16%;
    text-align:center;
    margin-bottom:px(10);
    &:nth-child(4){
      margin-right: 0;
    }
    img{
      width:90%;
      display:block;
      margin: auto;
    }
    p{
      font-size:px(13);
      margin-top: -px(5);
    }
  }
}
</style>
