<template>
  <div class="globalFloor">
    <div class="globalTitle">最新更新</div>
    <ul v-for="(list, index) in tj" :key="index">
      <router-link :to="'/detail/' + list.articleid">
        <li class="img"><img :src="list.poster"></li>
        <li class="imgList">
          <p class="title">{{list.articlename}}</p>
          <p class="intro">{{list.intro}}</p>
          <p class="author">{{list.author}}</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const tj = computed(() => store.getters.jingXuanTj)
    return {
      tj
    }
  }
})
</script>

<style scoped lang="scss">
 .globalFloor{
  overflow: hidden;
  margin-bottom: px(20);
    ul{
    overflow: hidden;
    display: flex;
    margin-bottom: px(15);
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
          padding-top: px(2);
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
}
</style>
