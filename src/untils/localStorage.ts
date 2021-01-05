import Storage from 'web-storage-cache'
const localStorage = new Storage()
export const getStorage = (e: string) => localStorage.get(e)
export const setStorage = (e: string, v: any, time = 10) => localStorage.set(e, v, { exp: time })
export const removeStorage = () => localStorage.clear()
export const delectStorage = (e: string) => localStorage.delete(e)
