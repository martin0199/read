<template>
  <ul class="l">
    <li v-for="(item,index) in type" :key="index" :class="item[0]==indexs?'cur':''" @click="handleFl(item[0])">
      <span>{{item[1]}}</span>
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'kuLeft',
  setup () {
    const store = useStore()
    const indexs = computed(() => { return store.getters.kuIndex })
    const type = computed(() => { return store.getters.kuType })
    const handleFl = (index) => {
      store.commit('setKuIndex', index)
    }
    return {
      handleFl,
      indexs,
      type
    }
  }
})
</script>
<style scoped lang="scss">
.l{
  float:left;
  width:px(64);
  text-align:center;
  @include scroll;
  color:$grey3;
  border-right: px(1) solid $greyf2;
  position: fixed;
  z-index: 2;
  height: 100%;
  li{
    height:px(40);
    font-size:px(13);
    span{
      display: inline-block;
      border-left:px(2) solid $white;
      width: 100%;
      height: px(14);
    }
  }
  .cur{
    span{
      border-left:px(2) solid red;
    }
  }
}
</style>
