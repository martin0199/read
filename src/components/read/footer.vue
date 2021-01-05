<template>
  <ul class="readFooter">
    <li @click="handleReadPopOpen">
      <i class="iconfont icon-qiehuan-"></i>
      <span>换源</span>
    </li>
    <li @click="handleMulu">
      <i class="iconfont icon-caidan"></i>
      <span>目录</span>
    </li>
    <li @click="handleHei" v-if="!readMod">
      <i class="iconfont icon-yejianmoshishenyemoshiyueliang"></i>
      <span>夜晚</span>
    </li>
    <li @click="handleLiang" v-else>
      <i class="iconfont icon-taiyang"></i>
      <span>太阳</span>
    </li>
    <li @click="handleSetting">
      <i class="iconfont icon-shezhi"></i>
      <span>设置</span>
    </li>
    <!--<li @click="handleSetting">
      <i class="el-icon-download"></i>
      <span>缓存</span>
    </li>-->
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { setStorage, getStorage } from '@/untils/localStorage'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'readFooter',
  setup () {
    const store = useStore()
    const readMod = computed(() => store.getters.readMod)
    const readSubMenu = computed(() => store.getters.readSubMenu)
    const handleMulu = () => {
      store.commit('setReadSubMenu', false)
      getStorage('mulu') ? (
        store.commit('setReadMuluList', getStorage('mulu')),
        store.commit('setReadMulu', true)
      ) : (
        ElMessage.error('目录加载失败，请切换来源'),
        store.commit('setReadLy', true)
      )
    }
    const handleHei = () => {
      store.commit('setReadMod', 'mod')
      setStorage('mod', 'mod', '')
    }
    const handleLiang = () => {
      store.commit('setReadMod', '')
      setStorage('mod', '', '')
    }
    const handleSetting = () => { store.commit('setReadSubMenu', !readSubMenu.value) }
    const handleReadPopOpen = () => {
      store.commit('setReadLy', true)
      store.commit('setReadSubMenu', false)
    }
    return {
      handleSetting,
      handleLiang,
      handleHei,
      handleMulu,
      readMod,
      handleReadPopOpen
    }
  }
})
</script>
<style scoped lang='scss'>
.readFooter{
  overflow: hidden;
  @include center;
  height: px(44);
  padding: px(5) 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $white;
  z-index: 12;
  color:$grey4;
  li{
    flex: 25%;
    text-align: center;
    i{
      font-size: px(24);
      display: block;
      margin-bottom: px(8);
    }
    span{
      font-size: px(11);
      display: block;
    }
  }
}
.mod .readFooter{
  @include mod;
}
</style>
