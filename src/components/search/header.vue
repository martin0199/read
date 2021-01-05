<template>
  <div class="searchBox">
    <i class="iconfont icon-fanhui-xianxing back " @click="handleback"></i>
    <input type="text" placeholder="请输入搜索关键词"  v-model="kw" ref="inputs">
    <i class="icon iconfont icon-guanbifuzhi delete" @click="handledelete" v-if="kw">x</i>
  </div>
</template>
<script>
import { computed, defineComponent, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const inputs = ref(null)
    const kw = ref(null)
    const store = useStore()
    const router = useRouter()
    const data = computed(() => store.getters.searchData)
    const pop = computed(() => store.getters.searchPop)
    const page = computed({
      get: () => store.getters.searchPage,
      set: (val) => store.commit('setSearchPage', val)
    })
    const handleback = () => { router.back() }
    const handledelete = () => { kw.value = null; inputs.value.focus() }
    const searchChooseTv = () => {
      store.commit('setSearchType', 'tv')
      inputs.value.focus()
    }
    const searchChooseBook = () => {
      store.commit('setSearchType', 'book')
      inputs.value.focus()
    }
    watch(kw, () => {
      page.value = 2
      kw.value ? (
        store.commit('setSearchKw', kw),
        store.commit('initSearch'),
        store.commit('setGlobalLoading', true),
        store.dispatch('actionSearch', 1).then((err) => {
          err !== '' ? (
            store.commit('setSearchNoData', false)
          ) : (
            store.commit('setSearchNoData', true)
          )
        })
      ) : (
        store.commit('initSearch'),
        store.commit('setSearchNoData', false)
      )
    })
    return {
      kw,
      handledelete,
      handleback,
      data,
      inputs,
      searchChooseTv,
      searchChooseBook,
      pop
    }
  }
})
</script>

<style scoped lang="scss">
.searchBox{
  position:absolute;
  z-index: 9;
  background: $white;
  height:px(40);
  width:100%;
  line-height:px(40);
  display: flex;
  padding-top: px(10);
  .back{
    position: absolute;
    left: px(20);
    font-size: px(16);
    top:px(8);
    width: px(40);
    height:px(40);
    color:$grey3
  }
  .delete{
    position: absolute;
    right: px(20);
    font-size: px(15);
    top:px(8);
    width: px(40);
    height:px(40);
    color:$grey9
  }
  input{
    color:#999;
    flex:1;
    background:#f2f2f2;
    height:px(30);
    line-height:px(30);
    text-indent:px(10);
    font-size:px(14);
    border:0;
    margin-right: px(25);
    margin-left: px(55);
  }
}
</style>
