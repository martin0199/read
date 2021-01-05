import { createStore } from 'vuex'
import bookcase from './bookcase/module'
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
    bookcase
  }
})
