import { asyncAndCommit } from '@/untils/fun'
import { bookCaseTpye } from '@/untils/define'
interface Arag {
  index: string;
  data: object;
  type: string[];
}
export default {
  state: {
    index: 'nan',
    data: '',
    type: bookCaseTpye
  },
  mutations: {
    setKu (state: Arag, value: any) {
      state.data = value
    },
    setKuIndex (state: Arag, value: string) {
      state.index = value
    }
  },
  actions: {
    actionKu (context: any) {
      return asyncAndCommit('setKu', context, { method: 'get', url: '/http/book/ku.php' })
    }
  },
  getters: {
    kuData: (state: Arag) => state.data,
    kuType: (state: Arag) => state.type,
    kuIndex: (state: Arag) => state.index
  }
}
