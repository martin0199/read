<template>
  <div class="typeLeft">
    <li v-for="(item,index) in type" :key="index" :class="item[0]==typeid?'cur':''"  >
      <span @click="handleTypeLink(item[0])">{{item[1]}}</span>
    </li>
  </div>
</template>
<script>
import { computed, defineComponent, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'typeLeft',
  setup () {
    const store = useStore()
    const current = getCurrentInstance()
    const type = computed(() => { return store.getters.typeData.type })
    const typeid = computed(() => { return store.getters.typeId })
    const handleTypeLink = (index) => { current.emit('typeLink', index) }
    return {
      handleTypeLink,
      type,
      typeid
    }
  }
})
</script>
<style scoped lang="scss">
.typeLeft{
  position: absolute;
  left:0;
  width:px(64);
  height: 100%;
  text-align: center;
  border-right: px(1) solid $greyf2;
  @include scroll;
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
