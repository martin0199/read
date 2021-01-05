<template>
  <div class="jxType">
    <div class="jxFloorType">
      <div class="globalTitle">男生爱看</div>
      <div class="top">
        <router-link :to="'/detail/' + nanT.articleid">
          <li class="img"><img :src="nanT.poster"></li>
          <li class="imgList">
            <p class="title">{{nanT.articlename}}</p>
            <p class="intro">{{nanT.intro}}</p>
            <p class="author">{{nanT.author}}</p>
          </li>
        </router-link>
      </div>
      <ul class="bottom">
        <li v-for="(list, index) in nanB" :key="index">
          <router-link :to="'/detail/' + list.articleid">
            <img :src="list.poster">
            <p class="articlename">{{list.articlename}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="jxFloorType">
      <div class="globalTitle">女生爱看</div>
      <div class="top">
        <router-link :to="'/detail/' + nvT.articleid">
          <li class="img"><img :src="nvT.poster"></li>
          <li class="imgList">
            <p class="title">{{nvT.articlename}}</p>
            <p class="intro">{{nvT.intro}}</p>
            <p class="author">{{nvT.author}}</p>
          </li>
        </router-link>
      </div>
      <ul class="bottom">
        <li v-for="(list, index) in nvB" :key="index">
          <router-link :to="'/detail/' + list.articleid">
            <img :src="list.poster">
            <p class="articlename">{{list.articlename}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const nanB = computed(() => store.getters.jingXuanNanB)
    const nanT = computed(() => store.getters.jingXuanNanT)
    const nvB = computed(() => store.getters.jingXuanNvB)
    const nvT = computed(() => store.getters.jingXuanNvT)
    return {
      nanB,
      nanT,
      nvB,
      nvT
    }
  }
})
</script>

<style scoped lang="scss">
.jxFloorType{
  overflow: hidden;
  margin-bottom: px(20);
  .top{
    overflow: hidden;
    display: flex;
    a{
      display: flex;
      .img{
        img{
          width: px(55);
          margin-right: px(10);
        }
      }
      .imgList{
        .title{
          font-size: px(14);
          margin-top: px(2);
          font-weight: bold;
          color:$grey62;
          margin-bottom: px(5);
        }
        .intro{
          height:px(34);
          line-height: px(18);
          overflow: hidden;
          width: 100%;
          font-size: px(12);
          color:$grey62;
          margin-bottom: px(5);
        }
        .author{
          font-size: px(12);
          color:$grey62;
        }
      }
    }
  }
  .bottom{
    margin-top: px(10);
    overflow: hidden;
    width:100%;
    li{
      width:18%;
      margin-bottom: px(10);
      margin-right:9%;
      float: left;
      overflow: hidden;
      .articlename{
          font-size: px(12);
          margin: px(5) 0;
          color:$grey62;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      img{
        width: px(55);
        height: px(75);
      }
      &:nth-child(4){
        margin-right:0
      }
    }
  }
}
</style>
