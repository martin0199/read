<template>
  <div id="load-wrapper" v-if="loadType=='loading'">
    <ul class="loading">
      <li class="one"></li>
      <li class="two"></li>
      <li class="three"></li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    loadType: {
      type: String,
      require: true
    }
  }
})
</script>

<style scoped lang="scss">
#load-wrapper{
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: px(50);
  .loading{
    height:px(17);
    width:px(51);
    li{
      display:inline-block;
      width:px(17);
      height:px(17);
      border-radius:100%;
      background-color:#3e83f4;
      -webkit-animation:bouncedelay 1.4s infinite ease-in-out both;
      animation:bouncedelay 1.4s infinite ease-in-out both
    }
    .one{
      -webkit-animation-delay:-0.32s;animation-delay:-0.32s
    }
    .two{
      -webkit-animation-delay:-0.16s;animation-delay:-0.16s
    }
  }
}
</style>
