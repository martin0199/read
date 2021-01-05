<template>
  <ul id="footer">
    <li v-for="(list,index) in data" :key="index">
      <router-link :to="list.href">
      <i :class="'iconfont icon-'+list.icon"></i>
      <span>{{list.title}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'globalFooter',
  setup () {
    const data = reactive([
      {
        title: '收藏',
        icon: 'wodeshujia',
        href: '/bookcase'
      },
      {
        title: '精选',
        icon: 'jingxuan',
        href: '/jingxuan'
      },
      {
        title: '分类',
        icon: 'caidan',
        href: '/ku'
      }
    ])
    return {
      data
    }
  }
}
</script>

<style scoped lang='scss'>
#footer{
  display: flex;
  align-items: center;
  justify-content: center;
  height: px(40);
  padding: px(2) 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $white;
  z-index: 10;
  border-top: px(1) solid $greyf2;
  overflow: hidden;
  li{
    flex: 33.33%;
    text-align: center;
    color:$grey6;
    i{
      font-size: px(20);
      display: block;
    }
    span{
      font-size: px(10);
      display: block;
      margin-top: px(3);
    }
  }
  .router-link-active{
    color:$blue
  }
}
</style>
