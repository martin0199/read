import { setStorage } from '@/untils/localStorage'
export const bookCaseStorage = (store: any, time = 10) => {
  store.commit('setBookCase', '')
  store.commit('setGlobalLoading', true)
  store.dispatch('actionBookCase').then(() => {
    setStorage('bookcase', store.getters.bookCaseData, time)
  })
}
export const jingXuanStorage = (store: any, time = 1000 * 60 * 24 * 30) => {
  store.commit('setJingXuan', '')
  store.commit('setGlobalLoading', true)
  store.dispatch('actionJingXuan').then(() => {
    setStorage('jingxuan', store.getters.jingXuanData, time)
  })
}
export const kuStorage = (store: any, time = 1000 * 60 * 24) => {
  store.commit('setKu', '')
  store.commit('setGlobalLoading', true)
  store.dispatch('actionKu').then(() => {
    setStorage('ku', store.getters.kuData, time)
  })
}
export const px = (e: number) => {
  const realWidth = (window.innerWidth / 10) > 50 ? 50 : (window.innerWidth / 10)
  return realWidth * e / 37.5
}
