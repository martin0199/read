<template>
  <div class="wanben">
    <global-header :search="false" :back="true" :border="false"></global-header>
    <wanben-content @changeWanben="changeWanben"></wanben-content>
  </div>
</template>
<script>
import globalHeader from '@/components/global/header.vue'
import wanbenContent from '@/components/wanben/content.vue'
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'type',
  components: {
    globalHeader,
    wanbenContent
  },
  setup () {
    const store = useStore()
    const page = ref(1)
    const changeWanben = () => {
      store.dispatch('actionWanben', page.value)
      page.value++
    }
    return {
      changeWanben
    }
  }
})
</script>
<style scoped lang="scss">
</style>
