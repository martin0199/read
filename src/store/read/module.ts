import { getStorage, setStorage } from '@/untils/localStorage'
import axios from '@/untils/http'
interface Arag {
  id: number;
  data: any;
  lsdata: any;
  siteid: number;
  cid: number;
  bookcase: boolean;
  menu: boolean;
  mulu: boolean;
  muluList: any;
  order: number;
  subMenu: boolean;
  ly: boolean;
  curPage: number;
  countPage: number;
  //pageChange: boolean;
  move: number;
  bg: string;
  fontSize: number;
  font: string;
  mod: string;
  error: boolean;
}

export default {
  state: {
    id: '',
    siteid: '',
    cid: '',
    data: '', //真实数据
    lsdata: '', //临时数据
    bookcase: false, //书架标识
    menu: false, //主菜单
    mulu: false,
    muluList: '',
    order: '',
    subMenu: false, //子菜单
    ly: false, //来源
    curPage: 1, //当前页数
    countPage: 1, //总页数
    //pageChange: false,
    move: 0, //位移
    bg: '', //背景
    fontSize: 19, //字号
    font: '', //字体
    mod: '', // 1》亮 2》暗
    process: '',
    error: false
  },
  mutations: {
    setRead (state: Arag, value: object) {
      if (value) {
        state.data = value
      } else {
        state.data = {
          chaptername: '',
          content: ''
        }
      }
    },
    setReadLsData (state: Arag, value: object) {
      state.lsdata = value
    },
    setReadId (state: Arag, value: number) {
      state.id = value
    },
    setReadCid (state: Arag, value: number) {
      state.cid = value
    },
    setReadSiteId (state: Arag, value: number) {
      state.siteid = value
    },
    setReadBookCase (state: Arag, value: boolean) {
      state.bookcase = value
    },
    setReadMenu (state: Arag, value: boolean) {
      state.menu = value
    },
    setReadMulu (state: Arag, value: boolean) {
      state.mulu = value
    },
    setReadMuluList (state: Arag, value: boolean) {
      state.muluList = value
    },
    setReadOrder (state: Arag, value: number) {
      state.order = value
    },
    setReadSubMenu (state: Arag, value: boolean) {
      state.subMenu = value
    },
    setReadCurPage (state: Arag, value: number) {
      state.curPage = value
    },
    setReadCountPage (state: Arag, value: number) {
      state.countPage = value
    },
    setReadMove (state: Arag, value: number) {
      state.move = value
    },
    /*setReadPageChange (state: Arag, value: boolean) {
      state.pageChange = value
    },*/
    setReadLy (state: Arag, value: boolean) {
      state.ly = value
    },
    setReadError (state: Arag, value: boolean) {
      state.error = value
    },
    setReadInit (state: Arag) {
      state.mulu = false
      state.menu = false
      state.subMenu = false
      state.ly = false
    },
    setReadTouth (state: Arag) {
      state.mulu = false
      state.subMenu = false
      state.ly = false
    },
    setReadMod (state: Arag, value: string) {
      state.mod = value
    },
    setReadBg (state: Arag, value: string) {
      state.bg = value
    },
    setReadFont (state: Arag, value: string) {
      state.font = value
    },
    setReadFontSize (state: Arag, value: number) {
      state.fontSize = value
    },
    setReadIndex (state: Arag) {
      state.curPage = 1
      state.move = 0
    }
  },
  actions: {
    actionRead (context: any, e: number) {
      context.commit('setGlobalLoading', true)
      axios({
        params: {
          id: context.state.id,
          siteid: context.state.siteid,
          cid: context.state.cid,
          bookcase: context.state.bookcase,
          userid: getStorage('userid') || '',
          frist: e,
          title: context.state.data.chaptername,
          order: context.state.order
        },
        method: 'get',
        url: '/http/book/read.php'
      }).then((data) => {
        //e-1 是正常加载    e==3 首次加载
        if (e === 3) {
          context.commit('setReadMuluList', data.data.chapter)
          context.commit('setReadCid', data.data.dqid)
          context.commit('setReadOrder', data.data.order)
          setStorage('mulu', data.data.chapter, 1000 * 60 * 24 * 360 * 10)
        }
        context.commit('setRead', data.data)
        !data.data.content && context.commit('setReadError', 'content is null')
        context.commit('setReadBookCase', data.data.bookcase)
        context.commit('setGlobalLoading', false)
      }).catch(() => {
        context.commit('setGlobalLoading', false)
      })
    },
    actionLsRead (context: any, cid: number) {
      axios({
        params: {
          id: context.state.id,
          siteid: context.state.siteid,
          cid: cid
        },
        method: 'get',
        url: '/http/book/read.php'
      }).then((data) => {
        !data.data.content ? context.commit('setReadError', 'lscontent is null') : context.commit('setReadLsData', data.data)
      })
    },
    actionReadBookCase (context: any) {
      return axios({
        params: {
          chapterid: context.state.cid,
          chapterorder: context.state.order,
          aid: context.state.id,
          chaptername: '',
          articlename: context.state.data.name,
          c: 'xz',
          userid: getStorage('userid') || '',
          siteid: context.state.siteid,
          poster: context.state.data.img,
          typeid: 1,
          author: context.state.data.author,
          year: 0,
          area: 0,
          frist: true
        },
        method: 'get',
        url: '/http/book/bookcase.php'
      })
    }
  },
  getters: {
    readData: (state: Arag) => state.data,
    readLsData: (state: Arag) => state.lsdata,
    readId: (state: Arag) => state.id,
    readCid: (state: Arag) => state.cid,
    readSiteId: (state: Arag) => state.siteid,
    readBookCase: (state: Arag) => state.bookcase,
    readMenu: (state: Arag) => state.menu,
    readSubMenu: (state: Arag) => state.subMenu,
    readCountPage: (state: Arag) => state.countPage,
    readCurPage: (state: Arag) => state.curPage,
    readMove: (state: Arag) => state.move,
    readLy: (state: Arag) => state.ly,
    readMod: (state: Arag) => state.mod,
    readFont: (state: Arag) => state.font,
    readFontSize: (state: Arag) => state.fontSize,
    readBg: (state: Arag) => state.bg,
    readMulu: (state: Arag) => state.mulu,
    readMuluList: (state: Arag) => state.muluList,
    readOrder: (state: Arag) => state.order,
    readError: (state: Arag) => state.error
  }
}
