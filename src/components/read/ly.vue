<template>
  <div class="readLy" v-if="ly">
    <div class="lyPop"  @click="handleReadPopClose"></div>
    <div class="lyBox">
      <h2>{{ data.name }}</h2>
      <ul class="odr">
        <li
          v-for="(item, index) in data.ly"
          :key="index"
          @click="handlely(item.lycid, item.lykey)"
          ref="expandly"
        >
          <div class="imgTitle">
            <p>{{ item.lyname }}</p>
            <span>{{ item.lynum }}章</span>
          </div>
          <div class="imgBox">
            <div class="img">
              <el-image :src="item.lyimg" :key="item.lyimg" ></el-image>
            </div>
            <div class="imgList">
              <p class="title">{{ item.lychapter }}</p>
              <p class="subTitle"> 》</p>
            </div>
          </div>
          <i class="iconfont check icon-check1" v-if ="item.lykey == siteid"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const btn = ref(null)
    const data = computed(() => store.getters.readData)
    const siteid = computed(() => store.getters.readSiteId)
    const ly = computed(() => store.getters.readLy)
    const handleReadPopClose = () => {
      store.commit('setReadLy', false)
    }
    const handlely = (cid, siteid) => {
      store.commit('setReadCid', cid)
      store.commit('setReadSiteId', siteid)
      store.commit('setReadBookCase', false)
      store.commit('setReadInit')
      store.commit('setReadIndex')
      store.dispatch('actionRead', 3)
    }
    return {
      data,
      handleReadPopClose,
      ly,
      btn,
      siteid,
      handlely
    }
  }
})
</script>
<style scoped lang="scss">
.lyPop{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,0.5);
  z-index: 12;
}
.lyBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height:100%;
  background: $white;
  z-index: 12;
  padding:px(20);
  box-sizing: border-box;
  color: $grey6;
  @include scroll;
  h2{
    font-size: px(14);
    margin-bottom: px(10);
    border-bottom: px(1) solid $greyf8;
    padding-bottom: px(10);
  }
  .odr{
    overflow: hidden;
    li{
      overflow: hidden;
      margin-bottom: px(10);
      position: relative;
      .imgTitle{
        overflow: hidden;
        line-height: px(26);
        margin-bottom: px(10);
        font-size: px(12);
        p{
         @include text-overflow;
         width: 75%;
         float: left;
        }
        span{
          float: right;
        }
      }
      .imgBox{
        overflow: hidden;
        .img{
          width: px(35);
          height:px(44);
          background: $img;
          margin-right: px(10);
          float: left;
        }
        .el-image{
          width: 100%;
          height:100%;
        }
        .imgList{
          display: flex;
          .title{
            font-size:px(12);
            line-height:px(44);
            display: flex;
            margin-right: px(10);
            @include text-overflow;
            width: 100%;
          }
          .subTitle{
            font-size: px(12);
            float:right;
            line-height:px(44);
          }
        }
      }
      .check{
        font-size: px(18);
        color:$blue;
        position: absolute;
        top:50%;
        right:0;
        margin-top: px(9);
      }
    }
  }
}
.mod .lyBox{
  @include mod;
  h2{
    border-bottom: px(1) solid $grey6;
  }
  .imgTitle{
    border-bottom: px(1) solid $grey6;
  }
}

</style>
