<template>
  <div class="readFooterRender">
    <span class="pre" @click="handlePrev">上一章</span>
    <div class="render">
      <p ref="render"></p>
      <i
      @touchstart='touchStart'
      @touchmove='touchMove'
      @touchend='touchEnd'
      ref="renderI"
      :style="'left:' + left + 'px'"
      ></i>
    </div>
    <span class="next" @click="handleNext">下一章</span>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getStorage } from '@/untils/localStorage'
export default defineComponent({
  name: 'readFooter',
  setup () {
    const store = useStore()
    const render = ref(null)
    const renderI = ref(null)
    const left = ref(store.getters.readOrder)
    const arag = reactive({
      x: 0,
      y: 0,
      mx: 0,
      my: 0,
      move: ref(0)
    })
    const countChapter = computed(() => store.getters.readData.chapter_num)
    const preid = computed(() => store.getters.readData.preid)
    const nextid = computed(() => store.getters.readData.nextid)
    const order = computed(() => store.getters.readOrder)
    const orderpx = (e) => {
      arag.orders = order.value
      e === '+' ? arag.orders++ : arag.orders--
      store.commit('setReadOrder', arag.orders)
    }
    const handleNext = () => {
      nextid.value ? (
        store.commit('setReadIndex'),
        store.commit('setReadCid', nextid.value),
        store.dispatch('actionRead', 1),
        orderpx('+')
      ) : ElMessage.error('已经是最后一页了')
    }
    const handlePrev = () => {
      preid.value ? (
        store.commit('setReadIndex'),
        store.commit('setReadCid', preid.value),
        store.dispatch('actionRead', 1),
        orderpx('-')
      ) : ElMessage.error('已经是第一页了')
    }
    const touchStart = (e) => {
      e.touches.length === 1 && (arag.x = e.touches[0].pageX)
    }
    const touchMove = (e) => {
      e.preventDefault()
      arag.mx = e.touches[0].pageX - arag.x
      const w = arag.move + arag.mx
      if (w < 0) {
        left.value = 0
      } else if (w > render.value.scrollWidth - renderI.value.scrollWidth) {
        left.value = render.value.scrollWidth - renderI.value.scrollWidth
      } else {
        left.value = w
      }
    }
    onMounted(() => {
      left.value = Math.ceil(order.value * (render.value.scrollWidth - renderI.value.scrollWidth) / countChapter.value)
    })
    const touchEnd = () => {
      arag.move = left.value
      const bf = Math.ceil(left.value / (render.value.scrollWidth - renderI.value.scrollWidth) * (countChapter.value - 1))
      store.commit('setReadIndex')
      getStorage('mulu') ? (
        store.commit('setReadOrder', bf),
        store.commit('setReadCid', getStorage('mulu')[bf].chapterid),
        store.dispatch('actionRead', 1)
      ) : store.dispatch('actionReadMulu', bf)
    }
    return {
      touchStart,
      touchMove,
      touchEnd,
      render,
      renderI,
      left,
      handlePrev,
      handleNext
    }
  }
})
</script>

<style scoped lang='scss'>
.readFooterRender{
  padding:px(30) px(20);
  box-sizing: border-box;
  display: flex;
  @include center;
  overflow: hidden;
  width:100%;
  line-height: px(30);
  height: px(50);
  position: absolute;
  bottom: px(48);
  left: 0;
  background:$white;
  z-index: 12;
  color:$grey4;
  .pre{
    float: left;
    margin-right: px(20);
  }
  .next{
    float: right;
    margin-left: px(20);
  }
  span{
    font-size:px(12);
  }
  .render{
    position: relative;
    flex:1;
    p{
      height: px(2);
      background: $greyf0;
      width:100%;
    }
    i{
      width: px(16);
      height:px(16);
      position: absolute;
      left:0;
      top:px(-8);
      background: $greyc;
      border-radius: 50%;
    }
  }
}
.mod .readFooterRender{
  @include mod;
}
</style>
