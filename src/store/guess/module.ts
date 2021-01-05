import { asyncAndCommit } from '@/untils/fun'
interface Arag {
  type: string;
  data: object;
}
export default {
  state: {
    type: 'nan',
    data: []
  },
  mutations: {
    setGuessType (state: Arag, value: any) {
      state.type = value
    },
    setGuess (state: Arag, value: any) {
      state.data = value
    }
  },
  actions: {
    actionGuess (context: any) {
      const config = {
        params: {
          type: context.state.type
        },
        method: 'get',
        url: '/http/book/guess.php'
      }
      return asyncAndCommit('setGuess', context, config)
    }
  },
  getters: {
    guessData: (state: Arag) => state.data
  }
}
