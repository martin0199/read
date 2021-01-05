<template>
  <div class="readError">
    <div class="readErrorBox">
      <p>{{error}}</p>
      <span @click="reload">
        <i class="iconfont icon-shuaxin"></i>重新刷新
      </span>
      <span @click="reloadsite">
        <i class="iconfont icon-qiehuan-"></i>更新站点
      </span>
      <span @click="reloadhome">
        <i class="iconfont icon-shouye"></i>返回首页
      </span>
      <span @click="reloadMulu">
        <i class="iconfont icon-caidan"></i>返回目录
      </span>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const id = computed(() => store.getters.readId)
    const error = computed(() => store.getters.error)
    const reload = () => {
      store.commit('setReadIndex')
      store.dispatch('actionRead', 1)
    }
    const reloadsite = () => {
      store.commit('setError', '')
      store.commit('setReadSubMenu', false)
      store.commit('setReadMenu', true)
      store.commit('setReadLy', true)
    }
    const reloadhome = () => {
      router.push('/')
    }
    const reloadMulu = () => {
      router.push('/detail/' + id.value)
    }
    return {
      reload,
      reloadsite,
      reloadhome,
      reloadMulu,
      error
    }
  }
})
</script>

<style scoped lang="scss">
.readError{
  position: fixed;
  width: 100%;
  height:100%;
  top:0;
  left:0;
  z-index: 13;
  background: url(/book/read/skin-default-t.ece62.jpg) no-repeat top,url(/book/read/skin-default-b.79f06.jpg) no-repeat bottom,url(/book/read/skin-default-m.35905.jpg) repeat-y center 119px;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:$grey3;
  .readErrorBox{
    box-sizing: border-box;
    padding:px(40) px(20);
    text-align: center;
    p{
      font-size:px(15);
      margin-bottom: px(30);
    }
    span{
      width: 100%;
      display: block;
      border:px(1) solid $z;
      margin-bottom: px(25);
      padding:px(10) px(60);
      font-size: px(14);
      box-sizing: border-box;
      i{
        margin-right: px(10);
        font-size: px(18);
      }
    }
  }
}

img{
  margin-top: px(15);
  width: px(30);
  height: px(30);
}
.mod .readError{
  @include mod
}
</style>
