<template>
  <div class="type">
    <global-header :search="false" :back="true" :border="false"></global-header>
    <div class="typeBox" v-if="!globalLoading">
      <type-left @typeLink='typeLink' />
      <div class="typeRight">
        <type-right />
        <type-page @changTypePage="changTypePage"/>
      </div>
    </div>
    <type-load loadType="list"  v-else/>
  </div>
</template>
<script>
import globalHeader from '@/components/global/header.vue'
import typeRight from '@/components/type/right.vue'
import typeLeft from '@/components/type/left.vue'
import typePage from '@/components/type/rPage.vue'
import typeLoad from '@/components/global/loading.vue'
import { useStore } from 'vuex'
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getForage, setForage } from '@/untils/localforage'
export default defineComponent({
  name: 'type',
  components: {
    globalHeader,
    typeRight,
    typePage,
    typeLeft,
    typeLoad
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const globalLoading = computed(() => { return store.getters.globalLoading })
    const page = computed(() => { return store.getters.typePage })
    const typeid = computed(() => { return store.getters.typeId })
    const initTypeId = typeid.value ? typeid.value : route.params.id
    const init = (index, page) => {
      store.commit('setTypeId', index)
      store.commit('setTypePage', page)
      store.commit('setGlobalLoading', true)
      const key = 'type' + '/' + index + '/' + page
      getForage(key, (err, val) => {
        console.log(err)
        if (val) {
          store.commit('setGlobalLoading', false); store.commit('setType', val)
        } else {
          store.dispatch('actionType').then((res) => {
            setForage(key, res)
          })
        }
      })
    }
    const typeLink = (index) => { init(index, 1) } //导航获取
    const changTypePage = (page) => { init(typeid.value, page) } //页码获取
    watch(route, (e) => {
      e.name === 'ku' && (store.commit('setTypePage', 1), store.commit('setTypeId', '')) //设置路径
    })
    init(initTypeId, page.value) //初始化
    return {
      globalLoading,
      changTypePage,
      typeid,
      typeLink
    }
  }
})
</script>
<style scoped lang="scss">
.typeBox{
  padding-top:px(50);
}
.typeRight{
  box-sizing: border-box;
  @include scroll;
  margin-left: px(70);
  position: absolute;
  height:100%
}
</style>
