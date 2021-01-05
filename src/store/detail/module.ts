import { asyncAndCommit } from '@/untils/fun'
import { getStorage } from '@/untils/localStorage'
interface Arag {
  id: number;
  data: object;
  bookcase: boolean;
  href: string;
}
export default {
  state: {
    id: '',
    data: '',
    bookcase: false,
    href: ''
  },
  mutations: {
    setDetail (state: Arag, value: object) {
      state.data = value
    },
    setDetailId (state: Arag, value: number) {
      state.id = value
    },
    setBookCase (state: Arag, value: boolean) {
      state.bookcase = value
    },
    setDetailBookCase (state: Arag, value: any) {
      state.bookcase = value
    },
    setDetailHref (state: Arag, value: string) {
      state.href = value
    }
  },
  actions: {
    actionDetail (context: any) {
      const config = {
        params: {
          articleid: context.state.id,
          bookcase: 'visit'
        },
        method: 'get',
        url: '/http/book/detail.php'
      }
      return asyncAndCommit('setDetail', context, config)
    },
    actionDetailBookCase (context: any) {
      const config = {
        params: {
          chapterid: -1,
          chapterorder: 1,
          aid: context.state.id,
          chaptername: '',
          articlename: context.state.data.articlename,
          c: 'xz',
          userid: getStorage('userid') || '',
          siteid: context.state.data.siteid,
          poster: context.state.data.img,
          typeid: 1,
          author: context.state.data.author,
          year: 0,
          area: 0
        },
        method: 'get',
        url: '/http/book/bookcase.php'
      }
      return asyncAndCommit('setDetailBookCase', context, config)
    }
  },
  getters: {
    detailData: (state: Arag) => state.data,
    detailBookCase: (state: Arag) => state.bookcase,
    detailHref: (state: Arag) => state.href
  }
}
