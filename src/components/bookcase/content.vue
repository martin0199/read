<template>
  <div class="bookcaseScroll" >
    <div class="bookcase" :class="{select: !bookcseHrefs, line: bookcaseMoudel === 'line'}" ref="box" >
      <div class="bookcaseBox" v-for="(item,index) in bookcase.book" :key="index" @click="handlebookcasediv(index,item.id)" :name="item.id" >
        <div class="imgBox"  @click="bookcseHref('/read/'+item.articleid+'/'+item.chapterid+'/'+item.siteid)">
          <i class="iconfont icon-check1"></i>
          <el-image :src="item.poster" lazy :key="item.poster"></el-image>
        </div>
        <div class="imgList" @click="bookcseHref('/read/'+item.articleid+'/'+item.chapterid+'/'+item.siteid)">
          <h3>{{item.articlename}}</h3>
          <span class="chapter ">
            <b class="b1">{{item.author}}</b>
            <b class="b1" v-if="item.chapterorder"><i>  ·  </i>{{item.chapterorder}}章未读</b>
          </span>
          <span class="chapter" >
            {{item.lastupdate}}
            <b class="b2"> · {{item.lastchapter}}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { removeClassIndex, addClassIndex, hasClassIndex, getAttrAll, addClassAll, removeClassAll } from '@/untils/fun'
import { ElMessage } from 'element-plus'
import { bookCaseStorage } from '@/untils/mixin.ts'
export default {
  setup () {
    const box = ref(null)
    const store = useStore()
    const router = useRouter()
    const bookcaseMoudel = computed(() => { return store.getters.bookCaseModule })
    const bookcase = computed(() => { return store.getters.bookCaseData })
    const bookcaseTv = computed(() => { return store.getters.bookCaseTv })
    const bookcseHrefs = computed(() => { return store.getters.bookCaseHref })
    const bookcaseArr = computed(() => { return store.getters.bookCaseArr })
    const change = computed(() => { return store.getters.bookCaseChange })
    const bookcseHref = (href) => { bookcseHrefs.value && router.push(href) }
    const handlebookcasediv = (index, id) => {
      if (!bookcseHrefs.value) {
        if (bookcaseArr.value.indexOf(id) === -1) {
          bookcaseArr.value.push(id)
        } else {
          bookcaseArr.value.splice(bookcaseArr.value.indexOf(id), 1)
        }
        if (hasClassIndex(box.value, index, 'cur')) {
          removeClassIndex(box.value, index, 'cur')
        } else {
          addClassIndex(box.value, index, 'cur')
        }
      }
    }
    watch(change, () => {
      if (change.value === 3) {
        bookcaseArr.value.push(...getAttrAll(box.value, 'name'))
        addClassAll(box.value, 'cur')
      } else if (change.value === 2) {
        if (confirm(`是否要删除这${bookcaseArr.value.length}本小说`)) {
          if (bookcaseArr.value.length) {
            store.dispatch('actionBookCaseDelect', bookcaseArr.value.join(',')).then(() => {
              ElMessage.success({
                message: '删除成功',
                type: 'success'
              })
              setTimeout(() => {
                store.commit('setInitBookcase')
                bookCaseStorage(store)
              }, 1000)
            })
          } else {
            store.commit('setBookcaseChange', 1)
            ElMessage.error('还没选中')
          }
        } else {
          store.commit('setInitBookcase')
        }
      } else if (change.value === 1) {
        removeClassAll(box.value, 'cur')
      }
    })
    return {
      bookcase,
      bookcaseTv,
      bookcseHref,
      handlebookcasediv,
      bookcseHrefs,
      box,
      bookcaseMoudel
    }
  }
}
</script>

<style scoped lang="scss">
.bookcaseScroll{
 @include scroll;
  .bookcase{
    box-sizing: border-box;
    padding:px(15);
    padding-top:px(54);
    padding-bottom:px(54);
    overflow: hidden;
    .bookcaseBox{
      overflow: hidden;
      width: 100%;
      padding: px(6) 0;
      display: flex;
      .imgBox{
        margin-right: px(12);
        display: flex;
        width: px(50);
        height: px(65);
        background: $img;
        .el-image{
          width: px(50);
          height: px(65);
        }
        i{
          display: none;
          font-size: px(12);
          color:$greyc
        }
      }
      .imgList{
        h3{
          font-size: px(14);
          font-weight: bold;
          color:$grey62;
          padding-top: px(7);
          @include text-overflow;
        }
        span{
          margin-top: px(7);
          display: block;
          color:$grey86;
          font-size: px(12);
          @include text-overflow;
          b{
            @include text-overflow;
          }
        }
      }
      &.cur{
        background: $greyf0;
        padding: px(6) 0;
        i{
          color:$blue
        }
      }
    }
    &.select{
      .imgBox{
        position: relative;
        margin-left: px(30);
        i{
          display: block;
          position: absolute;
          left: px(-30);
          top:40%
        }
      }
    }
    &.line{
      .bookcaseBox{
        float: left;
        width: 33.33%;
        @include center;
        flex-wrap: wrap;
        margin-bottom: px(8);
        .imgBox{
          display: block;
          width: 100%;
          margin-right: px(0);
          margin-left: px(0);
          @include center;
          background: $white;
          width: px(90);
          height: px(120);
          .el-image{
            width: px(90);
            height: px(120);
          }
          i{
            left: px(18);
            top:85%;
            font-size:px(16)
          }
        }
        .imgList{
          width: px(90);
          display: block;
          @include center;
          h3{
            font-size: px(13);
            white-space: initial;
            height: px(32);
            line-height: px(16);
            text-align: left;
          }
          .chapter{
            display: none;
          }
        }
      }
    }
  }
}

</style>
