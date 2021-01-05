<template>
  <ul class="readTouch"
  @touchstart='touchStart'
  @touchmove='touchMove'
  @touchend='touchEnd'
  >
    <li class="left" @click="handleLeft"></li>
    <li class="center" @click="handleCenter"></li>
    <li class="right" @click="handleRight"></li>
  </ul>
</template>
<script>
/*
核心思想
当前页控制位移
*/
import { useStore } from 'vuex'
import { computed, defineComponent, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'readTouch',
  setup () {
    const store = useStore()
    const curPage = computed({
      get: () => store.getters.readCurPage,
      set: (val) => store.commit('setReadCurPage', val)
    })
    const move = computed({
      get: () => store.getters.readMove,
      set: (val) => {
        store.commit('setReadMove', -document.body.clientWidth * (curPage.value - 1) + val)
      }
    })
    const order = computed({
      get: () => store.getters.readOrder,
      set: (val) => store.commit('setReadOrder', val)
    })
    const countPage = computed(() => store.getters.readCountPage)
    const data = computed(() => store.getters.readData)
    const lsdata = computed(() => store.getters.readLsData)
    const menu = computed(() => store.getters.readMenu)
    const arag = reactive({
      x: 0,
      y: 0,
      mx: 0,
      my: 0,
      ls: false, // 防止多次预加载,
      touch: false
    })
    const init = (m) => {
      curPage.value = 1
      store.commit('setReadCid', m)
      store.commit('setReadLsData', '')
      store.dispatch('actionRead', 1)
    }
    const handleLeft = () => {
      curPage.value === 1 ? (
        data.value.preid ? (
          init(data.value.preid),
          order.value--
        ) : ElMessage.error('已经是第一页了')
      ) : (
        curPage.value--
      )
      move.value = 0
      store.commit('setReadInit')
    }
    const right = () => {
      store.commit('setRead', lsdata.value)
      store.commit('setReadLsData', '')
      order.value++
      curPage.value = 1
    }
    const handleRight = () => {
      if ((curPage.value === 1 && countPage.value === 1) || (curPage.value === 2 && countPage.value === 2)) {
        data.value.nextid ? (
          init(data.value.nextid),
          order.value++
        ) : (
          order.value + 1 < data.value.chapter_num ? (
            ElMessage.error('页码出错')
          ) : (
            ElMessage.error('已经是最后一页了')
          )
        )
      } else {
        let watcher = ''
        let settime = ''
        if (curPage.value === countPage.value) {
          data.value.nextid ? (
            arag.ls = false,
            store.commit('setReadCid', data.value.nextid),
            lsdata.value ? (
              right(),
              watcher(),
              store.commit('setGlobalLoading', false)
            ) : (
              store.commit('setGlobalLoading', true),
              store.commit('removeHttpList', '/http/book/read.php'),
              watcher = watch(lsdata, () => {
                lsdata.value && (
                  right(),
                  watcher(),
                  store.commit('setGlobalLoading', false),
                  clearTimeout(settime),
                  move.value = 0
                )
              }),
              settime = setTimeout(() => {
                lsdata.value ? (clearTimeout(settime), watcher()) : (store.commit('setReadError', '10000 timeOut'), store.commit('setGlobalLoading', false))
              }, 10000)
            )
          ) : (
            order.value + 1 < data.value.chapter_num ? (
              ElMessage.error('页码出错')
            ) : (
              ElMessage.error('已经是最后一页了')
            )
          )
        } else {
          (curPage.value === 2 && !arag.ls && data.value.nextid) && (
            arag.ls = true,
            store.dispatch('actionLsRead', data.value.nextid)
          )
          curPage.value++
        }
      }
      move.value = 0
      store.commit('setReadInit')
    }
    const handleCenter = (e) => {
      e.preventDefault()
      store.commit('setReadMenu', !menu.value)
    }
    /*离开状态下
    arag.mx 决定左右移动
    侧重左滑
    设计思想为当前页为2时预加载 以下有几种情况
    1》总页数不足2
    2》总页数大于2
    */
    //获取初始触摸位置
    const touchStart = (e) => {
      e.touches.length === 1 && (arag.x = e.touches[0].pageX, arag.y = e.touches[0].pageY)
    }
    //获取移动状态触摸位置
    const touchMove = (e) => {
      e.preventDefault()
      arag.mx = e.touches[0].pageX - arag.x
      arag.my = e.touches[0].pageY - arag.y
      arag.touch = true
      move.value = arag.mx
    }
    const touchEnd = () => {
      //后退翻页
      arag.touch && (
        Math.abs(arag.mx) > 20 ? (
          arag.mx > 0 ? handleLeft() : handleRight()
        ) : (
          move.value = 0,
          store.commit('setReadMenu', false)
        )
      )
      arag.touch = false
    }
    return {
      touchStart,
      touchMove,
      touchEnd,
      handleLeft,
      handleCenter,
      handleRight
    }
  }
})
</script>
<style scoped lang="scss">
.readTouch{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  .left{
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 2;
  }
  .right{
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    z-index: 2;
  }
  .center{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50%;
    margin-left:-25%;
    margin-top:-25%;
    height: 50%;
    z-index: 3;
  }
}
</style>
