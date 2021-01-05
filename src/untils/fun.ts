import axios from '@/untils/http'
export const asyncAndCommit = async (mutationsNames: string, context: any, config: object) => {
  context.commit('setGlobalLoading', true)
  const { data } = await axios(config)
  context.commit('setGlobalLoading', false)
  context.commit(mutationsNames, data)
  return data
}
export const os = () => {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  // isChrome = /(?:Chrome|CriOS)/.test(ua)
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
}
export const removeClassIndex = (doms: HTMLElement, index: number, key: string) => {
  doms.children[index].classList.remove(key)
}
export const removeClassAll = (doms: HTMLElement, key: string) => {
  for (const item of doms.children) {
    item.classList.remove(key)
  }
}
export const addClassIndex = (doms: HTMLElement, index: number, key: string) => {
  doms.children[index].classList.add(key)
}
export const addClassAll = (doms: HTMLElement, key: string) => {
  for (const item of doms.children) {
    item.classList.add(key)
  }
}
export const hasClassIndex = (doms: HTMLElement, index: number, key: string) => {
  return doms.children[index].className.indexOf(key) !== -1
}
export const getAttrAll = (doms: HTMLElement) => {
  const arr = []
  for (const item of doms.children) {
    arr.push(item.getAttribute('name'))
  }
  return arr
}
