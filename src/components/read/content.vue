<template>
  <div class="readContent" ref="text" :style="{'font-size': fontSize +'px','line-height': lineHeight +'px' ,transform:'translate3d('+move+'px,0px,0px)'}">
    <div class="readContentWrapper" >
      <section>
        <h3>{{data.chaptername}}</h3>
        <div class="content" v-html="data.content">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent, ref, watch, nextTick } from 'vue'
import { px } from '@/untils/mixin'
export default defineComponent({
  name: 'readContent',
  setup () {
    const store = useStore()
    const data = computed(() => store.getters.readData)
    const move = computed(() => store.getters.readMove)
    const fontSize = computed(() => px(store.getters.readFontSize))
    const lineHeight = computed(() => px(store.getters.readFontSize * 2))
    const text = ref(null)
    watch([data, fontSize], () => {
      if (data.value.content) {
        nextTick(() => {
          text.value.style.height = window.innerHeight + 'px'
          const countPage = Math.ceil(text.value.scrollWidth / document.body.clientWidth)
          store.commit('setReadCountPage', countPage)
        })
      }
    })
    return {
      data,
      text,
      move,
      fontSize,
      lineHeight
    }
  }
})
</script>
<style scoped lang="scss">
.readContent{
  box-sizing: border-box;
  padding:px(20) px(10) px(40) px(10);
  column-width: px(400);
  column-gap: px(20);
  height: 100%;
  text-indent: px(30);
  columns: $grey3;
  color:$grey3;
  /*transition: transform 4000ms ease 0s;*/
  .content{
    overflow: hidden;
  }
  h3{
    margin-bottom: px(30);
    margin-top:px(30);
    text-indent: px(0);
    font-size: px(20);
  }
}
.mod .readContent {
  @include mod
}
</style>
