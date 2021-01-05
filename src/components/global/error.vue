<template>
  <div id="error" @click="handleError">
    <global-header href="/" />
    <img src="/book/error/fail.png">
  </div>
</template>

<script>
import globalHeader from '@/components/global/header.vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    globalHeader
  },
  setup () {
    const router = useRouter()
    const handleError = () => {
      router.go(0)
    }
    return {
      handleError
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
