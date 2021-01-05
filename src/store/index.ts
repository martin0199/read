import { createStore } from 'vuex'
import bookcase from './bookcase/module'
import jingxuan from './jingxuan/module'
import guess from './guess/module'
import ku from './ku/module'
import wanben from './wanben/module'
import search from './search/module'
import detail from './detail/module'
import read from './read/module'
import type from './type/module'
interface Arag {
  globalLoading: boolean;
}
export default createStore({
  state: {
    globalLoading: false
  },
  mutations: {
    setGlobalLoading: (state: Arag, value: boolean) => { state.globalLoading = value }
  },
  getters: {
    globalLoading: (state: Arag) => state.globalLoading
  },
  modules: {
    bookcase,
    jingxuan,
    guess,
    ku,
    wanben,
    search,
    detail,
    read,
    type
  }
})
