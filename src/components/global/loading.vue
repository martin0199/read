<template>
  <div id="load-wrapper" v-if="loadType=='loading'">
    <ul class="loading">
      <li class="one"></li>
      <li class="two"></li>
      <li class="three"></li>
    </ul>
  </div>
  <div id="readLoad" v-if="loadType=='reading'">
    <div class="box">
      <h3></h3>
      <p v-for="(list, index) in [1,2]" :key ="index" :class="index === 0 ? 'cur' : ''"></p>
      <p v-for="(list, index) in [1,2]" :key ="index" :class="index === 0 ? 'cur' : ''"></p>
      <p v-for="(list, index) in [1,2]" :key ="index" :class="index === 0 ? 'cur' : ''"></p>
      <p v-for="(list, index) in [1,2]" :key ="index" :class="index === 0 ? 'cur' : ''"></p>
      <div class="d">
        <b></b>
        <i></i>
      </div>
    </div>
    <div class="loading">
      <img src="/book/images/indicator_verybig.gif">
    </div>
  </div>
  <div id="zhanWei">
    <div class="zhanWeiList" v-if="loadType=='list'">
      <div class="r">
        <ul v-for="(item, index) in arr" :key="index">
          <li class="img"></li>
          <li class="imgList">
            <p class="once"></p>
            <p class="two"></p>
            <p></p>
            <p></p>
          </li>
        </ul>
      </div>
      <div class="l">
        <span v-for="(item, index) in arr" :key="index"></span>
      </div>
    </div>
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
#readLoad{
 position: fixed;
  width: 100%;
  top:0;
  height:100%;
  left:0;
  z-index: 11;
  background: url(/book/read/skin-default-t.ece62.jpg) no-repeat top,url(/book/read/skin-default-b.79f06.jpg) no-repeat bottom,url(/book/read/skin-default-m.35905.jpg) repeat-y center 119px;
  background-size: 100%;
  .box{
    padding:px(20);
    h3{
      background: $z;
      width: 70%;
      height:px(30);
      margin-bottom: px(30);
      margin-top:px(60);
      opacity: 0.1;
    }
    p{
      background: $z;
      width: 100%;
      height:px(20);
      margin-bottom:px(20);
      opacity: 0.1;
      &.cur{
        width: 90%;
        margin-left: 10%;
      }
    }
    .d{
      overflow: hidden;
      position: fixed;
      top: px(10);
      left:0;
      width: 100%;
      height: px(20);
      b{
        background: $z;
        width: 30%;
        height:px(20);
        opacity: 0.1;
        float: left;
      }
      i{
        background: $z;
        width: 30%;
        height:px(20);
        opacity: 0.1;
        float: right;
      }
    }
  }
  .loading{
    position: fixed;
    width: px(60);
    height: px(65);
    line-height: px(65);
    top:50%;
    background: $greyf8;
    border-radius: px(5);
    text-align: center;
    left:50%;
    margin-left: px(-30);
    margin-top: px(-30);
    z-index: 999999;
    font-size: px(22);
    color:$grey6;
    img{
      margin-top: px(15);
      width: px(30);
      height: px(30);
    }
  }
}
.mod #readLoad{
  @include mod
  .loading{
    @include mod
  }
}
.zhanWeiList{
  padding: px(52) px(12) px(42) px(12);
  .l{
    width:px(64);
    border-right: px(1) solid $greyf2;
    position: absolute;
    z-index: 2;
    height: 100%;
    span{
      height: px(12);
      background:$greyf8;
      margin-bottom: px(10);
      display: block;
      width: 70%;
      margin-left: 15%;
    }
  }
  .r{
    box-sizing: border-box;
    padding-left: px(70);
    position: absolute;
    height:100%;
    width: 100%;
    ul{
      overflow:hidden;
      margin-bottom:px(8);
      padding-bottom:px(13);
      border-bottom: px(1) solid $greyf8;
      .img{
        float: left;
        margin-right: px(10);
        width: px(50);
        height: px(62);
        background: $img;
      }
      .imgList{
        overflow: hidden;
        p{
          height: px(12);
          background:$greyf8;
          margin-bottom: px(10);
        }
        .once{
          width: 60%;
        }
        .two{
          width: 70%;
        }
      }
    }
  }
}
</style>
