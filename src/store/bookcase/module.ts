import { asyncAndCommit } from '@/untils/fun'
import { getStorage } from '@/untils/localStorage'

interface Arags {
  data: object;
  arag: {
    href: boolean;
    arr: number[];
    tab: boolean;
    module: string;
    change: number;
  };
}
export default {
  state: {
    data: '',
    arag: {
      href: true, //编辑模式
      arr: [], //选中个数
      tab: false, //切换
      module: 'list', //书架类型
      change: 0, // 0》默认 1》取消或者完成 2》删除  3》全选
      type: 1 // false》小说 true》视频
    }
  },
  mutations: {
    setBookCaseHref: (state: Arags, value: boolean) => { state.arag.href = value },
    setBookCaseTab: (state: Arags, value: boolean) => { state.arag.tab = value },
    setBookCaseArr: (state: Arags, value: number[]) => { state.arag.arr = value },
    setBookCaseModule: (state: Arags, value: string) => { state.arag.module = value },
    setBookCaseChange: (state: Arags, value: number) => { state.arag.change = value },
    setBookCase: (state: Arags, value: object) => { state.data = value },
    setInitBookcase: (state: Arags) => {
      state.arag.href = true
      state.arag.arr = []
      state.arag.tab = false
      state.arag.change = 1
    }
  },
  actions: {
    actionBookCase: (context: any) => {
      const config = {
        url: '/http/book/bookcase.php',
        params: {
          c: 'xs',
          userid: getStorage('userid') || ''
        },
        method: 'get'
      }
      return asyncAndCommit('setBookCase', context, config)
    },
    actionBookCaseDelect: (context: any, aid: string) => {
      const config = {
        url: '/http/book/bookcase.php',
        params: {
          c: 'sc',
          userid: getStorage('userid'),
          aid: aid
        },
        method: 'get'
      }
      return asyncAndCommit('setBookCase', context, config)
    }
  },
  getters: {
    bookCaseData: (state: Arags) => state.data,
    bookCaseHref: (state: Arags) => state.arag.href,
    bookCaseArr: (state: Arags) => state.arag.arr,
    bookCaseTab: (state: Arags) => state.arag.tab,
    bookCaseModule: (state: Arags) => state.arag.module,
    bookCaseChange: (state: Arags) => state.arag.change
  }
}
