<template>
  <div class="readTop">
    <i class="iconfont icon-fanhui-xianxing back" @click="handleClickBack"></i>
  </div>
</template>
<script>
import { getStorage, delectStorage } from '@/untils/localStorage'
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()
    const data = computed(() => { return store.getters.readData })
    const bookcase = computed(() => { return store.getters.readBookCase })
    const handleBookCase = () => {
      store.dispatch('actionReadBookCase').then((res) => {
        if (res.data.code === '200') {
          ElMessage.success({
            message: '成功加入书架',
            type: 'success'
          })
          store.commit('setReadBookCase', true)
          delectStorage('bookcase')
          setTimeout(() => { router.push('/bookcase') }, 500)
        } else if (res.data.code === '500') {
          ElMessage.error('加入异常')
        }
      }).catch(() => {
        ElMessage.error('网络异常')
      })
    }
    const handleClickBack = () => {
      if (!bookcase.value && getStorage('userid')) {
        confirm('加入书架 是否加入书架') ? handleBookCase() : router.push('/bookcase')
      } else {
        router.push('/bookcase')
      }
    }
    return {
      handleClickBack,
      data,
      bookcase
    }
  }
})
</script>

<style scoped lang="scss">
.readTop{
  position:absolute;
  z-index: 12;
  background: $white;
  height:px(40);
  width:100%;
  line-height:px(40);
  top:0;
  left:0;
  border-bottom:px(1) solid $z;
  background:$white;
  color:$grey3;
  .title{
    font-size: px(16);
    text-align: center;
  }
  .back{
    position: absolute;
    left: px(20);
    font-size: px(16);
    top:0;
    width: px(40);
    height:px(40);
  }
}
.mod .readTop{
  @include mod;
  border-bottom:px(1) solid $grey6;
}
</style>
