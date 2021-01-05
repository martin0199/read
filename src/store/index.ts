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
  error: string;
  httpList: Array<string>;
}
export default createStore({
  state: {
    globalLoading: false,
    error: '',
    httpList: []
  },
  mutations: {
    setGlobalLoading: (state: Arag, value: boolean) => { state.globalLoading = value },
    setError: (state: Arag, value: string) => { state.error = value },
    setHttpList: (state: Arag, value: any) => {
      const rel = state.httpList.findIndex(e => e[1] === value[1])
      rel === -1 ? state.httpList.push(value) : value[1]('error')
    },
    removeHttpList: (state: Arag, value: string) => {
      const rel = state.httpList.findIndex(e => e[1] === value)
      rel !== -1 && state.httpList.splice(rel, 1)
    }
  },
  getters: {
    globalLoading: (state: Arag) => state.globalLoading,
    error: (state: Arag) => state.error,
    httpList: (state: Arag) => state.httpList
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
