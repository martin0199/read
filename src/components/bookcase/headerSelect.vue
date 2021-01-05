<template>
  <teleport to="#headerSelect">
    <div class="bookcaseSelect">
      <span class="wancheng" @click="handleSuccess">完成</span>
      <span class="title">已选择<b>{{bookcaseArrLength}}</b>本</span>
      <span class="quanxuan" @click="handleSelectAll" v-if="qh">全选</span>
      <span class="quxiao" @click="handleNo" v-else>取消</span>
    </div>
    <div class="bookcaseDelect"  @click="handleBookCaseDelect">
      <span>删除</span>
    </div>
  </teleport>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const qh = ref(true)
    const bookcaseArrLength = computed(() => { return store.getters.bookCaseArr.length })
    const handleSuccess = () => {
      store.commit('setBookCaseChange', 1)
      store.commit('setInitBookcase')
      store.commit('setBookCaseArr', [])
    }
    const handleSelectAll = () => {
      store.commit('setBookCaseArr', [])
      store.commit('setBookCaseChange', 3)
      qh.value = false
    }
    const handleNo = () => {
      store.commit('setBookCaseChange', 1)
      store.commit('setBookCaseArr', [])
      qh.value = true
    }
    const handleBookCaseDelect = () => {
      store.commit('setBookCaseChange', 2)
    }
    return {
      handleSelectAll,
      handleNo,
      handleSuccess,
      bookcaseArrLength,
      handleBookCaseDelect,
      qh
    }
  }
}
</script>

<style scoped lang="scss">
.bookcaseSelect{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background: $white;
  height:px(40);
  width:100%;
  line-height:px(40);
  @include center;
  .wancheng{
    position: absolute;
    left: px(20);
    font-size: px(14);
    top:0;
    width: px(40);
    height:px(40);
    color:$grey6
  }
  .title{
    font-size: px(15);
    color:$grey3;
    text-align: center;
  }
  .quanxuan{
    position: absolute;
    right: px(10);
    font-size: px(14);
    top:0;
    width: px(40);
    height:px(40);
    color:$grey6
  }
  .quxiao{
    position: absolute;
    right: px(10);
    font-size: px(14);
    top:0;
    width: px(40);
    height:px(40);
    color:$grey6
  }
}
.bookcaseDelect{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: px(44);
  height: px(44);
  z-index: 11;
  @include center;
  background: $red;
  span{
    font-size: px(14);
    color:$white
  }
}
</style>
