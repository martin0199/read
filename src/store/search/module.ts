import { asyncAndCommit } from '@/untils/fun'
interface Arag {
  type: string;
  data: any;
  kw: any;
  no: boolean;
  page: number;
  pop: boolean;
}
export default {
  state: {
    type: 'book',
    data: [],
    kw: '',
    no: false,
    page: 2,
    pop: true
  },
  mutations: {
    setSearch (state: Arag, value: any) {
      state.data.push(...value)
    },
    setSearchType (state: Arag, value: string) {
      state.type = value
    },
    setSearchKw (state: Arag, value: any) {
      state.kw = value
    },
    setSearchNoData (state: Arag, value: boolean) {
      state.no = value
    },
    initSearch (state: Arag) {
      state.data = []
    },
    setSearchPage (state: Arag, value: number) {
      state.page = value
    },
    setSearchPop (state: Arag, value: boolean) {
      state.pop = value
    }
  },
  actions: {
    actionSearch (context: any, pages: any) {
      const config = {
        params: {
          kw: context.state.kw,
          type: context.state.type,
          page: pages
        },
        method: 'get',
        url: '/http/book/search.php'
      }
      return asyncAndCommit('setSearch', context, config)
    }
  },
  getters: {
    searchData: (state: Arag) => state.data,
    searchType: (state: Arag) => state.type,
    searchKw: (state: Arag) => state.kw,
    searchNo: (state: Arag) => state.no,
    searchPage: (state: Arag) => state.page,
    searchPop: (state: Arag) => state.pop
  }
}
