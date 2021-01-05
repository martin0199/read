<template>
  <div id="login">
    <template v-if="load">
      <global-header :back = true></global-header>
      <div class="login" v-if="mod">
        <div class="box">
          <i class="iconfont icon-shoujihaoma"></i>
          <input type="text"  placeholder="手机号" v-model="login.name"/>
        </div>
        <div class="box">
          <i class="iconfont icon-mima"></i>
          <input type="password"  placeholder="密码" v-model="login.pwd"/>
        </div>
        <span :class="'btnLogin '+login.add" @click="handleLogin" disabled="disabled">立即登录</span>
        <div class="tip" @click="handleToReg">去注册 》</div>
      </div>
      <div class="login" v-else>
        <div class="box">
          <i class="iconfont icon-shoujihaoma"></i>
          <input type="text"  placeholder="请输入手机号" v-model="reg.name"/>
        </div>
        <div class="box">
          <i class="iconfont icon-mima"></i>
          <input type="password"  placeholder="请输入6位数以上的密码" v-model="reg.pwd"/>
        </div>
        <div class="box">
          <i class="iconfont icon-mima"></i>
          <input type="password"  placeholder="请重复输入密码" v-model="reg.passpwd"/>
        </div>
        <span class="btnReg" @click="handleReg">立即注册</span>
        <div class="tip" @click ="handleToLogin">去登录 》</div>
      </div>
    </template>
    <global-loading v-else loadType="load"/>
  </div>
</template>
<script>
import globalHeader from '@/components/global/header.vue'
import globalLoading from '@/components/global/loading.vue'
import { defineComponent, reactive, watch, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { setStorage, delectStorage } from '@/untils/localStorage'
import axios from '@/untils/http'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'login',
  components: {
    globalHeader,
    globalLoading
  },
  setup () {
    const router = useRouter()
    const mod = ref(true)
    const load = ref(true)
    const login = reactive({
      btn: false,
      name: ref(''),
      pwd: ref(''),
      add: ref('')
    })
    const reg = reactive({
      name: ref(''),
      pwd: ref(''),
      passpwd: ref('')
    })
    const handleToReg = () => { mod.value = false }
    const handleToLogin = () => { mod.value = true }
    const handleLogin = () => {
      if (login.btn) {
        if (!(/^1[3456789]\d{9}$/.test(login.name))) {
          ElMessage.error('手机号码有误，请重填')
          return false
        }
        if (login.pwd.length < 6) {
          ElMessage.error('密码不能小于6位数')
          return false
        }
        load.value = ref(false)
        axios({
          params: {
            pwd: login.pwd,
            name: login.name
          },
          url: '/http/book/login.php'
        }).then((res) => {
          load.value = true
          if (res.data.code === '200') {
            delectStorage('bookcase')
            setStorage('userid', res.data.userid, '')
            ElMessage.success({
              message: '登录成功',
              type: 'success'
            })
            router.push('/bookcase')
          } else if (res.data.code === '301') {
            ElMessage.error('密码错误')
          } else if (res.data.code === '302') {
            ElMessage.error('用户不存在')
          }
        })
      } else {
        ElMessage('手机号位数不对')
      }
    }
    const handleReg = () => {
      if (!(/^1[3456789]\d{9}$/.test(reg.name))) {
        ElMessage.error('手机号码有误，请重填')
        return false
      }
      if (reg.pwd.length < 6) {
        ElMessage.error('密码不能小于6位数')
        return false
      }
      if (reg.passpwd.length < 6) {
        ElMessage.error('请输入确定密码')
        return false
      }
      if (reg.passpwd !== reg.pwd) {
        ElMessage.error('密码不一致')
        return false
      }
      load.value = ref(false)
      axios({
        params: {
          regpwd: reg.pwd,
          regname: reg.name
        },
        url: '/http/book/login.php'
      }).then((res) => {
        load.value = true
        if (res.data.code === '200') {
          setStorage('userid', res.data.userid)
          ElMessage.success({
            message: '注册成功，登陆中',
            type: 'success'
          })
          setTimeout(() => {
            delectStorage('bookcase')
            router.push('/bookcase')
            ElMessage.success({
              message: '登录成功',
              type: 'success'
            })
          }, 1000)
        } else if (res.data.code === '500') {
          ElMessage.error('注册失败')
        } else if (res.data.code === '404') {
          ElMessage.error('已注册过了')
        }
      })
    }
    watch(() => login.name, () => {
      if (login.name.length === 11) {
        login.btn = true
        login.add = 'add'
      } else {
        login.btn = false
        login.add = ''
      }
    })
    return {
      handleLogin,
      handleReg,
      login,
      handleToReg,
      handleToLogin,
      mod,
      load,
      reg
    }
  }
})
</script>
<style scoped lang="scss">
.login{
  padding-top: px(60);
  .box{
    position: relative;
    width:80%;
    height: px(40);
    line-height: px(40);
    color:$grey6;
    font-size:px(14);
    margin: auto;
    margin-bottom: px(20);
    background: $greyf8;
    box-sizing: border-box;
    i{
     position:absolute;
     left:px(10);
     top:px(10);
     z-index:2;
     display: block;
     height:px(20);
     line-height: px(20);
     padding-right:px(7);
     border-right:px(1) solid $greyc
    }
    input{
      width:100%;
      display:block;
      height:100%;
      background:#f7f7f7;
      border:0;
      box-sizing: border-box;
      margin:0;
      text-indent: px(40);
      padding:0;
    }
  }
  .btnLogin{
    display:block;
    font-size:px(12);
    line-height:px(40);
    height: px(40);
    background:$greyf8;
    text-align: center;
    color:$grey6;
    width: 80%;
    margin: auto;
    &.add{
      background: $blue;
      color:$white;
    }
  }
  .btnReg{
    display:block;
    font-size:px(12);
    line-height:px(40);
    height: px(40);
    text-align: center;
    background: $blue;
    color:$white;
    width: 80%;
    margin: auto;
  }
  .tip{
    position: absolute;
    bottom: 20%;
    width:100%;
    text-align: center;
    color:$blue;
    font-size:px(13);
    margin-top:px(20);
    margin-right:px(15);

  }
}

</style>
