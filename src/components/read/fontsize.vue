<template>
  <div class="readRenderBox">
    <div class="f">{{fontSize-1}}</div>
    <span class="pre" @click="handleFontSizePrev">-</span>
    <div class="render">
      <p class="n1" ref="render1"></p>
      <p class="n2" :style="'width:' + width"></p>
    </div>
    <span class="next" @click="handleFontSizeNext">+</span>
    <div class="z">{{fontSize+1}}</div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { setStorage, getStorage } from '@/untils/localStorage'
export default defineComponent({
  name: 'readFooter',
  setup () {
    const store = useStore()
    const render1 = ref(null)
    const width = ref('40%')
    const maxFontSize = ref(30)
    const minFontSize = ref(12)
    const fontSize = computed({
      get: () => Math.ceil(store.getters.readFontSize),
      set: (val) => {
        store.commit('setReadFontSize', val)
        setStorage('fontSize', val, '')
      }
    })
    getStorage('fontSize') && (fontSize.value = getStorage('fontSize'))
    const handleFontSizeNext = () => {
      fontSize.value >= maxFontSize.value ? (
        fontSize.value = maxFontSize.value
      ) : fontSize.value++
      width.value = Math.ceil(fontSize.value / maxFontSize.value * render1.value.scrollWidth) + 'px'
    }
    const handleFontSizePrev = () => {
      fontSize.value < minFontSize.value ? (
        fontSize.value = minFontSize.value - 1
      ) : fontSize.value--
      width.value = Math.ceil(fontSize.value / maxFontSize.value * render1.value.scrollWidth) + 'px'
    }
    return {
      handleFontSizeNext,
      handleFontSizePrev,
      render1,
      width,
      fontSize
    }
  }
})
</script>

<style scoped lang='scss'>
.readRenderBox{
  overflow: hidden;
  padding: px(10) 0;
  .f{
    margin-right: px(20);
    font-size:px(14);
    float: left;
    margin-top: px(7);
  }
  .z{
    font-size:px(14);
    float: right;
    margin-top: px(7);
  }
  .pre{
    margin-right: px(20);
  }
  .next{
    margin-left: px(20);
  }
  span{
    font-size:px(20);
    background: rgba(0,0,0,0.1);
    line-height: px(28);
    width:px(36);
    height:px(28);
    text-align: center;
    float: left;
  }
  .render{
    height: px(2);
    width:47%;
    float: left;
    position: relative;
    margin-top: px(12);
    .n1{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: $greyf0;
      height: px(2);
    }
    .n2{
      position: absolute;
      left: 0;
      top: 0;
      width: px(10);
      background: $z;
      height: px(2);
    }
  }
}
</style>
