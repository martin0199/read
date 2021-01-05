import { asyncAndCommit } from '@/untils/fun'
interface Arag {
  data: any;
}
export default {
  state: {
    data: []
  },
  mutations: {
    setWanben (state: Arag, value: any) {
      state.data.push(...value)
    }
  },
  actions: {
    actionWanben (context: any, pages: any) {
      const config = {
        params: {
          page: pages
        },
        method: 'get',
        url: '/http/book/wanben.php'
      }
      return asyncAndCommit('setWanben', context, config)
    }
  },
  getters: {
    wanbenData: (state: Arag) => state.data
  }
}
