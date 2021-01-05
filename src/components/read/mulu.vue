<template>
  <div class="readMulu" >
    <div class="readMuluPop"  @click="handleReadPopClose"></div>
    <div class="readMuluBox">
      <h2>{{name}}<i class="iconfont icon-paixu more" @click="handleMuluOrder"></i></h2>
      <div class="mulu" ref="muluDom">
        <span @click="handleReadMulu(list.chapterid, index)" :name="list.chapterid" v-for="(list, index) in data " :key="index">{{list.chaptername}}</span>
      </div>
    </div>
  </div>
</template>
<script>
/*
, (res) => {
      const perfen = Math.floor((res.loaded / res.total) * 100)
      process.value = perfen + '%'
    }
*/
import { useStore } from 'vuex'
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'readMulu',
  setup () {
    const store = useStore()
    const muluDom = ref(null)
    const dx = ref(false)
    const name = computed(() => store.getters.readData.name)
    const countChapter = computed(() => store.getters.readData.chapter_num - 1)
    const data = computed(() => store.getters.readMuluList)
    const cid = computed(() => store.getters.readCid)
    const handleMuluOrder = () => {
      data.value.reverse()
      dx.value = !dx.value
    }
    onMounted(() => {
      nextTick(() => {
        const index = data.value.findIndex(item => item.chapterid === cid.value)
        muluDom.value.scrollTop = muluDom.value.children[index].clientHeight * index
        muluDom.value.children[index].style.background = '#f0f0f0'
      })
    })
    const handleReadPopClose = () => {
      store.commit('setReadMulu', false)
      store.commit('setReadMuluList', '')
    }
    const handleReadMulu = (cid, index) => {
      store.commit('setReadCid', cid)
      store.commit('setReadInit')
      store.commit('setReadIndex')
      dx.value ? store.commit('setReadOrder', countChapter.value - index) : store.commit('setReadOrder', index)
      store.dispatch('actionRead', 1)
    }
    return {
      handleMuluOrder,
      handleReadPopClose,
      handleReadMulu,
      data,
      muluDom,
      name
    }
  }
})
</script>

<style scoped lang="scss">
.readMuluPop{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background: rgba(0,0,0,0.5);
  z-index: 12;
}
.readMuluBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height:100%;
  background: $white;
  z-index: 12;
  color: $grey6;
  transition: all 2s;
  .mulu{
    @include scroll;
    padding-top:px(50);
    box-sizing: border-box;
  }
  h2{
    height:px(40);
    line-height: px(40);
    font-size: px(14);
    margin-bottom: px(5);
    border-bottom: px(1) solid $greyf8;
    padding: 0 px(20);
    overflow: hidden;
    position: fixed;
    top:0;
    left:0;
    width: 80%;
    box-sizing: border-box;
    background: $white;
    z-index: 13;
    .more{
      float: right;
      font-size: px(20);
      color:$grey3
    }
  }
  span{
    display:block;
    line-height:px(40);
    height:px(40);
    font-size:px(14);
    color:$grey6;
    padding-left: px(20);
    @include text-overflow
  }
}
.mod .readMuluBox{
  @include mod;
  h2{
    background: $grey3;
    border-bottom: px(1) solid $grey9;
    .more{
      color:$grey9
    }
  }
  span{
    color:$grey9
  }
}
</style>
