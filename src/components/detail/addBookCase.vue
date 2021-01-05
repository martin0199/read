<template>
  <div class="tab">
    <span @click="handleBookCase">加入书架<b>{{data.chapter_num}}</b></span>
    <span class="read" @click="handleRead()">免费阅读</span>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { delectStorage, getStorage } from '@/untils/localStorage'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.commit('setBookCase', false)
    const data = computed(() => { return store.getters.detailData })
    const bookcase = computed(() => { return store.getters.detailBookCase })
    const chapterid = computed(() => { return store.getters.detailData.fristchapterid })
    const siteid = computed(() => { return store.getters.detailData.siteid })
    const articleid = computed(() => { return route.params.id })
    const handleRead = () => { router.push('/read/' + articleid.value + '/' + chapterid.value + '/' + siteid.value) }
    const handleMuLu = () => { router.push('/mulu/' + articleid.value + '/' + chapterid.value + '/' + siteid.value) }
    const handleBookCase = () => {
      if (getStorage('userid')) {
        if (!bookcase.value) {
          store.dispatch('actionDetailBookCase').then((res) => {
            if (res.code === '200') {
              ElMessage.success({
                message: '成功加入书架',
                type: 'success'
              })
              store.commit('setBookCase', true)
            } else if (res.code === '303') {
              store.commit('setBookCase', true)
              ElMessage.error('不可重复添加')
            } else if (res.code === '500') {
              ElMessage.error('加入异常')
            }
            delectStorage('bookcase')
          }).catch(() => {
            ElMessage.error('网络异常')
          })
        } else {
          ElMessage.error('不可重复添加')
        }
      } else {
        ElMessage.error('请登陆!')
      }
    }
    return {
      handleBookCase,
      handleRead,
      handleMuLu,
      data
    }
  }
})
</script>
<style scoped lang="scss">
.tab{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px(44);
  line-height: px(44);
  background: $greyf8;
  font-size: px(14);
  overflow: hidden;
  span{
    width: 50%;
    float: left;
    text-align: center;
    position: relative;
    &.read{
      background: $blue;
      color:$white
    }
    b{
      font-size: px(9);
      color:$blue;
      position: absolute;
      top:px(-10);
    }
  }
}
</style>
