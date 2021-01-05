<template>
  <div id="header" :class="classArr">
    <div class="title" >{{title}}</div>
    <i class="iconfont icon-search search" v-if="search"></i>
    <i class="iconfont icon-fanhui-xianxing back" v-if="back" @click="handleClickBack"></i>
    <i class="iconfont icon-fanhui-xianxing back" v-if="href" @click="handleClickHref(href)"></i>
    <slot name="bookcase"></slot>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'globalHeader',
  props: {
    title: {
      type: String,
      require: true
    },
    back: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const router = useRouter()
    const handleClickBack = () => router.back()
    const handleClickHref = (href) => { router.push(href) }
    const classArr = {
      border: props.border
    }
    return {
      handleClickBack,
      classArr,
      handleClickHref
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  border-bottom:px(1) solid $greyf4;
}
#header{
  position:absolute;
  z-index: 9;
  background: $white;
  height:px(40);
  width:100%;
  line-height:px(40);
  .title{
    font-size: px(16);
    color:$grey3;
    text-align: center;
  }
  .search{
    position: absolute;
    right: px(10);
    font-size: px(16);
    top:0;
    width: px(30);
    height:px(40);
    color:$grey3
  }
  .back{
    position: absolute;
    left: px(20);
    font-size: px(16);
    top:0;
    width: px(40);
    height:px(40);
    color:$grey3
  }
}
</style>
