<template>
  <div class="guess">
    <read-load v-if="globalLoading" loadType="reading"/>
    <template v-else>
      <div class="nav">{{data.title}} <span>1 / {{data.chapter_num}}</span></div>
      <div class="guessBox">
        <h3>{{data.chaptername}}</h3>
        <div class="content" v-html="data.content"></div>
        <p class='next' @click="handledetails('/read/'+data.id+'/'+ data.cid +'/'+data.siteid)">去看下一章 >></p>
      </div>
    </template>
    <div class="guessMenu">
      <span class="nan" @click="handleGuessNan">男频</span>
      <b class="off" @click="handleOff">x</b>
      <span class="nv"  @click="handleGuessNv">女频</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import readLoad from '@/components/global/loading.vue'

export default defineComponent({
  components: {
    readLoad
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    store.dispatch('actionGuess')
    const globalLoading = computed(() => store.getters.globalLoading)
    const data = computed(() => store.getters.guessData)
    const handledetails = (e) => {
      router.push(e)
    }
    const handleOff = () => {
      store.commit('setGuess', '')
      router.back()
    }
    const handleGuessNan = () => {
      store.commit('setGlobalLoading', true)
      store.commit('setGuessType', 'nan')
      store.dispatch('actionGuess')
    }
    const handleGuessNv = () => {
      store.commit('setGlobalLoading', true)
      store.commit('setGuessType', 'nv')
      store.dispatch('actionGuess')
    }
    store.commit('setGlobalLoading', true)
    return {
      data,
      handledetails,
      handleOff,
      handleGuessNan,
      handleGuessNv,
      globalLoading
    }
  }
})
</script>

<style scoped lang="scss">
.guess{
  background: url(/book/read/skin-default-t.ece62.jpg) no-repeat top,url(/book/read/skin-default-b.79f06.jpg) no-repeat bottom,url(/book/read/skin-default-m.35905.jpg) repeat-y center 119px;
  background-size: 100%;
  position: relative;
  height: 100%;
  width: 100%;
  .nav{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    text-indent:px(18);
    line-height: px(36);
    font-size: px(12);
    color:$z;
    span{
      float: right;
      margin-right: px(12);
    }
  }
  .guessBox{
    padding:px(50) px(12);
    @include scroll;
    position: absolute;
    top: 0;
    left: 0;
    bottom: px(50);
    width: 100%;
    height: 100%;
    box-sizing:border-box;
    h3{
      margin-bottom:px(20);
      font-size:px(20);
      color:$grey3
    }
    .content{
      line-height: px(34);
      font-size:px(17);
      color:$grey3;
      text-indent:px(34);
    }
    .next{
      border:px(1) solid $z;
      width: 100%;
      height:px(36);
      line-height: px(36);
      box-sizing:border-box;
      text-align: center;
      font-size:px(14);
      margin: px(20) 0;
      color:$grey3;
    }
  }
  .guessMenu{
    position: absolute;
    bottom:px(0);
    left:0%;
    width:100%;
    display: flex;
    padding:px(5) 0;
    background: $white;
    z-index: 13;
    .nan{
      float: left;
      width:px(80);
      height:px(36);
      background: $blue;
      color:$white;
      line-height: px(36);
      font-size:px(13);
      text-align: center;
      margin-left: px(12);
    }
    .nv{
      float: right;
      width:px(80);
      height:px(36);
      background: $red;
      color:$white;
      line-height: px(36);
      font-size:px(13);
      text-align: center;
      margin-right: px(12);
    }
    .off{
      width:px(34);
      height:px(34);
      border:px(2) solid $z;
      text-align: center;
      line-height: px(34);
      margin: auto;
      border-radius:50%;
      background: $white;
      font-size:px(22);
    }
  }
}
</style>
