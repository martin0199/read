<template>
  <div class="banner">
    <div v-for="(item,index) in banner.data" :key="index" class="bannerImg"
    :class=" index === displayIndex ? 'cur' : ''"
    >
      <router-link :to="item.linkUrl">
        <img :src="item.picUrl" alt="">
      </router-link>
    </div>
    <div class="btn-list">
      <span :key="index" v-for="(item,index) in banner.data"
      :class="{'select':index===displayIndex||(index==0&&displayIndex===banner.data.length)}"
      @click="displayIndex=index"
      ></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
export default defineComponent({
  name: 'banner',
  props: {
    banner: {
      type: Object,
      default: function () {
        return {
          autoDisplayFlag: false, // 是否自动轮播
          itemHeight: 200,
          autoTimer: 1,
          data: [
            {
              picUrl: '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/d17d29a867b126c7ccd2ebbe0865de0f.jpg',
              linkUrl: '/detail/13247'
            },
            {
              picUrl: '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b88301c661e1aed66d0fadd17961e4a4.jpg',
              linkUrl: '/detail/15145'
            },
            {
              picUrl: '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/991154b1fcdb0e197921444e9585c8d7.jpg',
              linkUrl: '/detail/9506'
            },
            {
              picUrl: '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/d52f0a4664d164c30b8d92c44eb81e2f.jpg',
              linkUrl: '/detail/11874'
            }
          ]
        }
      }
    }
  },
  setup (props) {
    const displayIndex = ref(0)
    const autoDisplay = () => {
      const auto = setInterval(() => {
        displayIndex.value++
      }, 4000)
      !props.banner.autoTimer && clearInterval(auto)
    }
    onMounted(() => {
      autoDisplay()
    })
    const touchstart = () => { console.log(1) }
    const touchmove = () => { console.log(1) }
    const touchend = () => { console.log(1) }
    watch(displayIndex, () => {
      if (displayIndex.value < props.banner.data.length && displayIndex.value > 0) {
      } else {
        displayIndex.value = 0
      }
    })
    return {
      autoDisplay,
      touchstart,
      touchmove,
      touchend,
      displayIndex
    }
  }
})
</script>
<style scoped lang='scss'>
.banner {
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: px(130);
  .bannerImg{
    width: 100%;
    position: absolute;
    display: none;
    z-index:1;
    height: px(130);
    img{
      width: 100%;
      height: px(130);
    }
    &.cur{
      display: block;
      z-index:2
    }
  }
  .btn-list {
    position: absolute;
    bottom: px(5);
    z-index: 3;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      margin-right: px(3);
      width: px(5);
      height: px(5);
      border-radius: 50%;
      background: $blue;
      box-sizing: border-box;
      &.select {
        background:$white;
      }
    }
  }
}

</style>
