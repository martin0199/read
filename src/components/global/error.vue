<template>
  <div id="error" @click="handleError">
    <global-header href="/" />
    <img src="/book/error/fail.png">
  </div>
</template>

<script>
import globalHeader from '@/components/global/header.vue'
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    globalHeader
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const error = computed(() => store.getters.error)
    const handleError = () => { error.value ? alert(error.value) : router.go() }
    return {
      handleError,
      error
    }
  }
})
</script>

<style scoped lang="scss">

#error{
 position: fixed;
  width: 100%;
  top:0;
  height:100%;
  left:0;
  z-index: 99;
  background: $white;
  img{
    width: 100%;
    height: 100%;;
  }
}
</style>
