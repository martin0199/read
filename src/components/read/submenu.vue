<template>
  <div class="readFooterRender" v-if ="subMenu">
    <read-font-size />
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import readFontSize from '@/components/read/fontsize'
export default defineComponent({
  name: 'readFooter',
  components: {
    readFontSize
  },
  setup () {
    const store = useStore()
    const subMenu = computed(() => { return store.getters.readSubMenu })
    return {
      subMenu
    }
  }
})
</script>

<style scoped lang='scss'>
.readFooterRender{
  padding: px(0) px(20);
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: px(10);
  width:100%;
  position: absolute;
  bottom: px(48);
  left: 0;
  background:$white;
  z-index: 12;
  color:$grey4
}
.mod .readFooterRender{
  @include mod;
}
</style>
