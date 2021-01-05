import { asyncAndCommit } from '@/untils/fun'
interface Arag {
  page: number;
  typeid: number;
  data: object;
  num: number;
}
export default {
  state: {
    page: 1,
    typeid: '',
    data: '',
    num: ''
  },
  mutations: {
    setType (state: Arag, value: object) {
      state.data = value
    },
    setTypePage (state: Arag, value: number) {
      state.page = value
    },
    setTypeId (state: Arag, value: number) {
      state.typeid = value
    },
    setTypeNum (state: Arag, value: number) {
      state.num = value
    }
  },
  actions: {
    actionType (context: any, onProgress: any) {
      const config = {
        params: {
          page: context.state.page,
          pages: 20,
          type: context.state.typeid
        },
        method: 'get',
        url: '/http/book/screen.php',
        onDownloadProgress: (process: any) => {
          if (onProgress) onProgress(process)
        }
      }
      return asyncAndCommit('setType', context, config)
    }
  },
  getters: {
    typeId: (state: Arag) => state.typeid,
    typePage: (state: Arag) => state.page,
    typeNum: (state: Arag) => state.num,
    typeData: (state: Arag) => state.data
  }
}
