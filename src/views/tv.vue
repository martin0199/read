<template>
  <div class="tv">
    <tv-bar/>
    <tv-content/>
  </div>
</template>

<script>
import tvBar from '@/components/tv/bar.vue'
import tvContent from '@/components/tv/content/vue'
import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    tvBar,
    tvContent
  },
  setup () {
    return 
  }
})
</script>

<style>

</style>