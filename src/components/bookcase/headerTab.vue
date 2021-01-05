<template>
  <div class="bookcaseHeaderSelect">
    <span class="module" @click="handleBookCaseMoudel"><i class="iconfont icon-qiehuan-"></i><b>切换布局</b></span>
    <span class="exit" @click="handleBookCaseExit" v-if="userid"><i class="iconfont icon-bianji"></i><b>编辑书架</b></span>
    <span class="out" @click="handleBookcaseOut" v-if="userid"><i class="iconfont icon-tuichu"></i><b>退出登录</b></span>
    <span class="out" @click="handleBookcaseLogin" v-if="!userid"><i class="iconfont icon-wo"></i><b>登录/注册</b></span>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { delectStorage, getStorage, setStorage } from '@/untils/localStorage'
import { bookCaseStorage } from '@/untils/mixin.ts'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const bookcaseMoudel = computed(() => { return store.getters.bookCaseModule })
    const handleBookcaseLogin = () => { router.push('/login') }
    const handleBookCaseMoudel = () => {
      const moduel = bookcaseMoudel.value === 'list' ? 'line' : 'list'
      store.commit('setBookCaseModule', moduel)
      store.commit('setBookCaseTab', false)
      setStorage('bookcaseMoudel', moduel, '')
    }
    const handleBookcaseOut = () => {
      ElMessage.success({
        message: '退出成功',
        type: 'success'
      })
      delectStorage('bookcase')
      delectStorage('userid')
      store.commit('setBookCaseTab', false)
      store.commit('setBookCaseHref', true)
      bookCaseStorage(store)
    }
    const userid = computed(() => { return getStorage('userid') })
    const handleBookCaseExit = () => { store.commit('setBookCaseHref', false); store.commit('setBookCaseTab', false) }
    return {
      handleBookCaseMoudel,
      handleBookcaseOut,
      userid,
      handleBookCaseExit,
      handleBookcaseLogin
    }
  }
})
</script>

<style scoped lang="scss">
.bookcaseHeaderSelect{
  position: absolute;
  right: 0;
  top: px(40);
  background: $white;
  z-index: 2;
  overflow: hidden;
  box-shadow: px(4) px(2) px(10) $greyc;
  span{
    display:block;
    padding:0 px(20);
    overflow:hidden;
    border-bottom:px(1) solid $greyf0;
    color:$grey62;
    line-height:px(44);
    height:px(44);
  }
  i{
    font-size:px(15);
    margin-right:px(6);
    float:left
  }
  b{
    font-size:px(13);
    float:left;
  }
}
</style>
