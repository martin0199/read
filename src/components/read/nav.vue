<template>
  <div class="readNav">
    <span class="fl">{{order+' / '+data.chapter_num}}</span>
    <span class="fr">{{nav+'/'+countPage}}</span>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
export default defineComponent({
  setup () {
    const store = useStore()
    const order = computed(() => store.getters.readOrder + 1)
    const data = computed(() => store.getters.readData)
    const nav = computed(() => store.getters.readCurPage)
    const countPage = computed(() => store.getters.readCountPage)
    return {
      data,
      nav,
      countPage,
      order
    }
  }
})
</script>

<style scoped lang="scss">
.readNav{
  position: absolute;
  left: 0;
  bottom:px(5);
  line-height: px(40);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  padding:0 px(10);
  line-height: px(30);
  font-size: px(14);
  color:$grey4;
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
}
.mod .readNav{
  @include mod
}
</style>
