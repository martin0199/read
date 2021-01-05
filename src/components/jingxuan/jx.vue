<template>
  <div class="jxFloor">
    <div class="globalTitle">为你精挑细选</div>
    <ul class="top">
      <router-link :to="'/detail/' + jxT.articleid">
        <li class="img"><img :src="jxT.poster"></li>
        <li class="imgList">
          <p class="title">{{jxT.articlename}}</p>
          <p class="intro">{{jxT.intro}}</p>
          <p class="author">{{jxT.author}}</p>
        </li>
      </router-link>
    </ul>
    <ul class="bottom">
      <li v-for="(list, index) in jxB" :key="index">
        <router-link :to="'/detail/' + list.articleid">
          <div class="title">{{list.articlename}}</div>
          <div class="imgBox">
            <div class="imgList">
              <p class="intro">{{list.intro}}</p>
              <p class="author">{{list.author}}</p>
            </div>
            <div class="img">
              <img :src="list.poster">
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const jxB = computed(() => store.getters.jingXuanJxB)
    const jxT = computed(() => store.getters.jingXuanJxT)
    return {
      jxB,
      jxT
    }
  }
})
</script>

<style scoped lang="scss">
.jxFloor{
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
    li{
      width:50%;
      float: left;
      overflow: hidden;
      margin-bottom: px(10);
      .title{
          font-size: px(13);
          margin: px(5) 0;
          color:$grey62;
          font-weight: bold;
        }
      .imgBox{
        margin-top: px(5);
        overflow: hidden;
        .img{
          img{
            width: px(50);
            height: px(65);
          }
        }
        .imgList{
          float: left;
          width: 55%;
          margin-right: px(10);
          .intro{
            padding-top:px(5);
            height:px(31);
            line-height: px(16);
            overflow: hidden;
            width: 100%;
            font-size: px(12);
            color:$grey62;
            margin-bottom: px(8);
          }
          .author{
            font-size: px(12);
            color:$grey62
          }
        }
      }
    }
  }
}
</style>
