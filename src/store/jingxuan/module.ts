import { asyncAndCommit } from '@/untils/fun'
interface Arag {
  data: object;
  jxT: object;
  jxB: object;
  nanT: object;
  nanB: object;
  nvT: object;
  nvB: object;
  tj: object;
}
export default {
  state: {
    data: [],
    jxT: [],
    jxB: [],
    nanT: [],
    nanB: [],
    nvT: [],
    nvB: [],
    tj: []
  },
  mutations: {
    setJingXuan (state: Arag, value: any) {
      if (value) {
        state.data = value
        state.jxT = value.jx[0]
        state.jxB = value.jx.slice(1)
        state.nanT = value.nan[0]
        state.nanB = value.nan.slice(1)
        state.nvT = value.nv[0]
        state.nvB = value.nv.slice(1)
        state.tj = value.tj
      }
    }
  },
  actions: {
    actionJingXuan (context: any) {
      return asyncAndCommit('setJingXuan', context, { method: 'get', url: '/http/book/index.php' })
    }
  },
  getters: {
    jingXuanData: (state: Arag) => state.data,
    jingXuanJxT: (state: Arag) => state.jxT,
    jingXuanJxB: (state: Arag) => state.jxB,
    jingXuanNanT: (state: Arag) => state.nanT,
    jingXuanNanB: (state: Arag) => state.nanB,
    jingXuanNvT: (state: Arag) => state.nvT,
    jingXuanNvB: (state: Arag) => state.nvB,
    jingXuanTj: (state: Arag) => state.tj
  }
}
